import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { Keypair } from "@solana/web3.js";
import QRCode from "qrcode.react";
import bs58 from "bs58";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

const SolanaWallet = ({ setOpenSolanaWallet, setLoader, shortenAddress }) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [createdWallet, setCreatedWallet] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [wallets, setWallets] = useState([]);

  const saveWalletToLocalStorage = (wallet) => {
    const existingWallets = JSON.parse(localStorage.getItem("wallets")) || [];
    existingWallets.push(wallet);
    localStorage.setItem("wallets", JSON.stringify(existingWallets));
    setWallets(existingWallets);
  };

  const getWalletsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("wallets")) || [];
  };

  const generateWallet = () => {
    setLoader(true);

    const newKeypair = Keypair.generate();

    const publicKey = newKeypair.publicKey.toString();
    const secretKey = bs58.encode(newKeypair.secretKey);

    console.log("Public Key:", publicKey);

    const walletDetails = {
      network: "Solana",
      address: publicKey,
      privateKey: secretKey,
    };

    saveWalletToLocalStorage(walletDetails);
    setCreatedWallet(walletDetails);
    setSuccess(true);
    setLoader(false);
  };

  useEffect(() => {
    const address = getWalletsFromLocalStorage();
    setWallets(address);
    console.log(address);
  }, []);

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess(" Copied successfully");
  };

  return (
    <div className="bootstrap">
      <div className="modal fade modal-language"></div>
      <div
        className="modal fade modal-feedback show"
        tabIndex={-1}
        id="modal-feedback"
        style={{ display: "block" }}
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-custom modal-custom-xl modal-dialog-centered modal-feedback">
          <div className="modal-content">
            <button
              type="button"
              className="close"
              onClick={() => setOpenSolanaWallet(false)}
            />
            <div
              className="state initial"
              style={{ display: `${success ? "none" : "block"}` }}
            >
              <div className="modal-header">
                <div className="modal-title" id="modal_feedback_title">
                  Solana Generate Wallet
                </div>
                <div className="modal-desc" id="modal_feedback_desc">
                  You can you our wallet generator to create you wallet address
                  and privateKey
                </div>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => generateWallet()}
                  >
                    Generate Wallet
                  </button>
                </div>
              </div>
            </div>
            <div
              className="state success"
              style={{ display: `${success ? "block" : "node"}` }}
            >
              <QRCode value={createdWallet?.address} size={200} />
              <p className="h">
                {shortenAddress(createdWallet?.address)}{" "}
                <FaRegCopy
                  onClick={() => copyAddress(createdWallet?.address)}
                />
              </p>
              <p className="d">
                {shortenAddress(createdWallet?.privateKey)}
                <FaRegCopy
                  onClick={() => copyAddress(createdWallet?.privateKey)}
                />
              </p>
              <button
                className="btn btn-primary btn-block"
                onClick={() => router.push(`/profile`)}
              >
                Get Wallet Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolanaWallet;
