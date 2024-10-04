import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  TransactionSignature,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  getAssociatedTokenAddress,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  createCreateMetadataAccountInstruction,
  PROGRAM_ID,
  createCreateMetadataAccountV3Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import useUserSOLBalanceStore from "../../solana/stores/useUserSOLBalanceStore";
import { useNetworkConfiguration } from "../../solana/contexts/NetworkConfigurationProvider";
import UploadICON from "../Ethereum/SVG/UploadICON";
import Input from "../Ethereum/Input";

const SolanaCreateToken = ({
  setOpenSolanaTokenCreator,
  setLoader,
  PINATA_AIP_KEY,
  PINATA_SECRECT_KEY,
  SOLANA_FEE,
  SOLANA_RECEIVER,
  address,
}) => {
  const router = useRouter();
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { networkConfiguration } = useNetworkConfiguration();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const [tokenMintAddress, setTokenMintAddress] = useState("");

  const [token, updateToken] = useState({
    name: "",
    symbol: "",
    decimals: "",
    supply: "",
    image: "",
    description: "",
  });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const createToken = useCallback(
    async (token) => {
      try {
        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const mintKeypair = Keypair.generate();
        const tokenATA = await getAssociatedTokenAddress(
          mintKeypair.publicKey,
          publicKey
        );
        const chargeAmount = await chargeFee();
        if (chargeAmount) {
          const metadataUrl = await uploadMetadata(token);
          console.log(metadataUrl);

          const createMetadataInstruction =
            createCreateMetadataAccountV3Instruction(
              {
                metadata: PublicKey.findProgramAddressSync(
                  [
                    Buffer.from("metadata"),
                    PROGRAM_ID.toBuffer(),
                    mintKeypair.publicKey.toBuffer(),
                  ],
                  PROGRAM_ID
                )[0],
                mint: mintKeypair.publicKey,
                mintAuthority: publicKey,
                payer: publicKey,
                updateAuthority: publicKey,
              },
              {
                createMetadataAccountArgsV3: {
                  data: {
                    name: token.name,
                    symbol: token.symbol,
                    uri: metadataUrl,
                    creators: null,
                    sellerFeeBasisPoints: 0,
                    uses: null,
                    collection: null,
                  },
                  isMutable: false,
                  collectionDetails: null,
                },
              }
            );

          const createNewTokenTransaction = new Transaction().add(
            SystemProgram.createAccount({
              fromPubkey: publicKey,
              newAccountPubkey: mintKeypair.publicKey,
              space: MINT_SIZE,
              lamports: lamports,
              programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMintInstruction(
              mintKeypair.publicKey,
              Number(token.decimals),
              publicKey,
              publicKey,
              TOKEN_PROGRAM_ID
            ),
            createAssociatedTokenAccountInstruction(
              publicKey,
              tokenATA,
              publicKey,
              mintKeypair.publicKey
            ),
            createMintToInstruction(
              mintKeypair.publicKey,
              tokenATA,
              publicKey,
              Number(token.supply) * Math.pow(10, Number(token.decimals))
            ),
            createMetadataInstruction
          );
          const signature = await sendTransaction(
            createNewTokenTransaction,
            connection,
            {
              signers: [mintKeypair],
            }
          );
          //STORE TOKEN
          if (mintKeypair.publicKey.toString()) {
            const today = Date.now();
            let date = new Date(today);
            const _tokenCreatedData = date.toLocaleDateString("en-US");

            const _token = {
              network: "Solana",
              account: publicKey,
              supply: token.supply,
              name: token.name,
              symbol: token.symbol,
              tokenAddress: mintKeypair.publicKey.toString(),
              transactionHash: signature,
              createdAt: _tokenCreatedData,
              logo: token.image,
            };

            let tokenHistory = [];

            const history = localStorage.getItem("TOKEN_HISTORY");
            if (history) {
              tokenHistory = JSON.parse(localStorage.getItem("TOKEN_HISTORY"));
              tokenHistory.push(_token);
              localStorage.setItem(
                "TOKEN_HISTORY",
                JSON.stringify(tokenHistory)
              );
            } else {
              tokenHistory.push(_token);
              localStorage.setItem(
                "TOKEN_HISTORY",
                JSON.stringify(tokenHistory)
              );
            }
          }
          setLoader(false);
          setTokenMintAddress(mintKeypair.publicKey.toString());
          console.log(`Address: ${mintKeypair.publicKey.toString()}`);
          notifySuccess("Token creation successful");
        }
      } catch (error) {
        console.log(error);
        notifyError("Token creation failed");
      }
    },
    [publicKey, connection, sendTransaction]
  );

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const imgUrl = await uploadImagePinata(file);
      updateToken({ ...token, image: imgUrl });
    }
  };

  //---UPLOAD TO IPFS FUNCTION
  const uploadImagePinata = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: PINATA_AIP_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setLoader(false);
        return ImgHash;
      } catch (error) {
        setLoader(false);
        notifyError("Upload image failed");
      }
      setLoader(false);
    }
  };

  const uploadMetadata = async (token) => {
    const { name, symbol, description, image, supply } = token;
    console.log(name, symbol, description, image);

    if (!name || !symbol || !description || !image)
      return console.log("Data Missing");

    const data = JSON.stringify({
      name: name,
      symbol: symbol,
      description: description,
      image: image,
      supply: supply,
    });

    try {
      const response = await axios({
        method: "POST",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: data,
        headers: {
          pinata_api_key: PINATA_AIP_KEY,
          pinata_secret_api_key: PINATA_SECRECT_KEY,
          "Content-Type": "application/json",
        },
      });

      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

      return url;
    } catch (error) {
      setLoader(false);
      notifyError("Upload image failed");
    }
  };

  //FEE
  const chargeFee = useCallback(async () => {
    if (!publicKey) {
      notifyError(`Send Transaction: Wallet not connected!`);
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }
    setLoader(true);
    const creatorAddress = new PublicKey(SOLANA_RECEIVER);
    let signature = "";

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(SOLANA_FEE),
        })
      );

      signature = await sendTransaction(transaction, connection);
      notifySuccess("Transaction successful!");
      return signature;
    } catch (error) {
      setLoader(false);
      notifyError(`Transaction failed! ${error?.message}`);
      return;
    }
  }, [publicKey, SOLANA_FEE, sendTransaction, connection]);

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenSolanaTokenCreator(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Solana Token Creator</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="modal-body">
              <>
                {token.image ? (
                  <div>
                    <img
                      style={{ width: "150px", height: "auto" }}
                      src={token.image}
                      alt=""
                    />
                  </div>
                ) : (
                  <div>
                    <label for="file" class="custum-file-upload">
                      <div class="icon">
                        <UploadICON />
                      </div>
                      <div class="text">
                        <span>Click to upload Logo</span>
                      </div>
                      <input
                        onChange={handleImageChange}
                        id="file"
                        type="file"
                      />
                    </label>
                  </div>
                )}
              </>
              <div>
                <Input
                  icon={<MdOutlineGeneratingTokens />}
                  placeholder={"Name"}
                  handleChange={(e) =>
                    updateToken({ ...token, name: e.target.value })
                  }
                />
                <Input
                  icon={<MdOutlineGeneratingTokens />}
                  placeholder={"Symbol"}
                  handleChange={(e) =>
                    updateToken({ ...token, symbol: e.target.value })
                  }
                />
                <Input
                  icon={<MdOutlineGeneratingTokens />}
                  placeholder={"Supply"}
                  handleChange={(e) =>
                    updateToken({ ...token, supply: e.target.value })
                  }
                />
                <Input
                  icon={<MdOutlineGeneratingTokens />}
                  placeholder={"Decimals"}
                  handleChange={(e) =>
                    updateToken({ ...token, decimals: e.target.value })
                  }
                />
                <Input
                  icon={<MdOutlineGeneratingTokens />}
                  placeholder={"Description"}
                  handleChange={(e) =>
                    updateToken({ ...token, description: e.target.value })
                  }
                />
                {tokenMintAddress ? (
                  <div className="form-group">
                    <a
                      href={`https://solscan.io/account/${tokenMintAddress}?cluster=devnet`}
                      target="_blank"
                      className="btn btn-primary btn-block "
                    >
                      View Explorer
                    </a>
                  </div>
                ) : balance < 2 ? (
                  <div className="form-group">
                    <button className="btn btn-primary btn-block ">
                      Balance {balance} Sol, required minimum 2 Sol
                    </button>
                  </div>
                ) : (
                  <div className="form-group">
                    <button
                      onClick={() => createToken(token)}
                      className="btn btn-primary btn-block "
                    >
                      Create token (Fee {SOLANA_FEE} Sol)
                    </button>
                  </div>
                )}
              </div>
              <div className="text-center notice">
                By creating token you agree to our
                <a href="/pricing" target="_blank">
                  Privacy &amp; Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolanaCreateToken;
