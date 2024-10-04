import { useEffect, useCallback, useState } from "react";
import useUserSOLBalanceStore from "../../solana/stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import toast from "react-hot-toast";
import Input from "../Ethereum/Input";

const SolTransfer = ({ setOpenSolTransfer, setLoader }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState("0.0");
  const [transferAddress, setTransferAddress] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const solInputValidation = async (e) => {
    const monstrosity = /((^\.(\d+)?$)|(^\d+(\.\d*)?$)|(^$))/;
    const res = new RegExp(monstrosity).exec(e.target.value);
    res && setAmount(e.target.value);
  };

  const onClick = useCallback(async () => {
    if (!publicKey) {
      notifyError(`Send Transaction: Wallet not connected!`);
      console.log("error", `Send Transaction: Wallet not connected!`);
      return;
    }
    setLoader(true);
    const creatorAddress = new PublicKey(transferAddress);
    let signature = "";

    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: creatorAddress,
          lamports: LAMPORTS_PER_SOL * Number(amount),
        })
      );

      signature = await sendTransaction(transaction, connection);
      setLoader(false);
      notifySuccess("Transaction successful!");
    } catch (error) {
      setLoader(false);
      notifyError(`Transaction failed! ${error?.message}`);
      return;
    }
  }, [publicKey, amount, sendTransaction, connection]);

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenSolTransfer(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Sol Transfer</div>
              <div className="modal-desc">
                Transfer your SPL tokens securely
              </div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"Recipient address"}
                  handleChange={(e) => setTransferAddress(e.target.value)}
                />
                <Input
                  placeholder={"Amount"}
                  handleChange={(e) => setAmount(e.target.value)}
                />
                <Input value={`Your Balance: ${balance} sol`} />

                <div className="form-group">
                  <button
                    disabled={!publicKey}
                    onClick={() => onClick()}
                    className="btn btn-primary btn-block"
                  >
                    Transfer Fund
                  </button>
                </div>
              </div>
              <div className="text-center notice">
                By using our tool you agree to our
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

export default SolTransfer;
