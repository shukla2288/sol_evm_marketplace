import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { useDropzone } from "react-dropzone";

//INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";
import Input from "./Input";

const AddToken = ({
  setOpenAddToken,
  address,
  ERC20,
  setLoader,
  PINATA_AIP_KEY,
  PINATA_SECRECT_KEY,
  TRANSFER_ETHER,
  ADD_TOKEN_FEE,
  CREATOR_RECEIVER,
}) => {
  const [imageURL, setImageURL] = useState();

  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await ERC20(transferToken);
        if (token == undefined) {
          setNotFound("Token dose not exist, on the chain");
        } else {
          setTokenDetails(token);
          console.log(token);
        }
        setLoader(false);
      };

      loadToken();
    }
  }, [transferToken]);

  const [token, updateToken] = useState({
    name: "",
    symbol: "",
    supply: "",
  });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const uploadToIPFS = async (file) => {
    if (file) {
      try {
        setLoader(true);
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          maxBodyLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_AIP_KEY,
            pinata_secret_api_key: PINATA_SECRECT_KEY,
            "Content-Type": "multipart/form-data",
          },
        });

        const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        console.log(url);
        setImageURL(url);
        setLoader(false);
        notifySuccess("Cover Image Uploade Successfully");
      } catch (error) {
        setLoader(false);
        notifyError("Unable to upload image to Pinata");
      }
    }
  };

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToIPFS(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });
  //
  const addTokenToMetaMask = async (tokenDeatils, address) => {
    if (window.ethereum) {
      const tokenDecimals = tokenDeatils?.decimals;
      const tokenAddress = tokenDeatils.address;
      const tokenSymbol = tokenDeatils?.symbol;
      const tokenSupply = tokenDeatils?.supply;
      const tokenName = tokenDeatils?.name;
      const tokenImage = imageURL;

      setLoader(true);
      const transation = await TRANSFER_ETHER(CREATOR_RECEIVER, ADD_TOKEN_FEE);
      if (transation) {
        try {
          const wasAdded = await window.ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20",
              options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
                image: tokenImage,
              },
            },
          });

          if (wasAdded) {
            const today = Date.now();
            let date = new Date(today);
            const _tokenCreatedData = date.toLocaleDateString("en-US");

            const _token = {
              account: address,
              supply: tokenSupply.toString(),
              name: tokenName,
              symbol: tokenSymbol,
              tokenAddress: tokenAddress,
              createdAt: _tokenCreatedData,
              logo: imageURL,
            };

            let tokenHistory = [];

            const history = localStorage.getItem("ADDED_METAMASS");
            if (history) {
              tokenHistory = JSON.parse(localStorage.getItem("ADDED_METAMASS"));
              tokenHistory.push(_token);
              localStorage.setItem(
                "ADDED_METAMASS",
                JSON.stringify(tokenHistory)
              );
              setLoader(false);
              setReCall(reCall + 1);
            } else {
              tokenHistory.push(_token);
              localStorage.setItem(
                "ADDED_METAMASS",
                JSON.stringify(tokenHistory)
              );
              setLoader(false);
              setReCall(reCall + 1);
            }

            notifySuccess("Token added!");
          } else {
            notifyError("Token not added");
          }
        } catch (error) {
          notifyError("Failed to add");
        }
      }
    } else {
      notifyError("MetaMask is not installed");
    }
  };

  console.log(CREATOR_RECEIVER);
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button onClick={() => setOpenAddToken(false)} className="close" />
            <div className="modal-header">
              <div className="modal-title">Add Token MetaMask</div>
              <div className="modal-desc">
                Upload your token image, And Add in MetaMass
              </div>
            </div>
            <div className="modal-body">
              <>
                {imageURL ? (
                  <div>
                    <img
                      style={{ width: "150px", height: "auto" }}
                      src={imageURL}
                      alt=""
                    />
                  </div>
                ) : (
                  <div {...getRootProps()}>
                    <label for="file" class="custum-file-upload">
                      <div class="icon">
                        <UploadICON />
                      </div>
                      <div class="text">
                        <span>Click to upload Logo</span>
                      </div>
                      <input {...getInputProps()} id="file" type="file" />
                    </label>
                  </div>
                )}
              </>
              {tokenDetails ? (
                <>
                  <Input
                    value={`${tokenDetails?.name} ${tokenDetails?.balance} ${tokenDetails?.symbol}`}
                  />
                  <Input placeholder={"Name"} value={`${tokenDetails?.name}`} />
                  <Input
                    placeholder={"Symbol"}
                    value={`${tokenDetails?.symbol}`}
                  />
                  <Input
                    placeholder={"Supply"}
                    value={`${tokenDetails?.supply}`}
                  />
                  <Input
                    placeholder={"Decimals"}
                    value={`${tokenDetails?.decimals}`}
                  />
                </>
              ) : (
                <Input
                  placeholder={"Token address"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
              )}
              <div>
                {imageURL && (
                  <div className="form-group">
                    <button
                      onClick={() => addTokenToMetaMask(tokenDetails, address)}
                      className="btn btn-primary btn-block "
                    >
                      Add To MetaMask
                    </button>
                  </div>
                )}
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

export default AddToken;
