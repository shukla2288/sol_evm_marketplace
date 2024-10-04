import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import useUserSOLBalanceStore from "../../solana/stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, TransactionSignature } from "@solana/web3.js";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";

const SolanaAirdrop = ({ setOpenAirdrop }) => {
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async () => {
    if (!publicKey) {
      console.log("error", "Wallet not connected!");

      notifyError("Wallet not connected!");
      return;
    }

    let signature = "";

    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);

      notifySuccess("Airdrop successful!");

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature,
      });

      getUserSOLBalance(publicKey, connection);
      setSuccess(true);
    } catch (error) {
      notifyError(`Airdrop failed! ${error?.message}`);
      console.log("error", `Airdrop failed! ${error?.message}`, signature);
    }
  }, [publicKey, connection, getUserSOLBalance]);

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
              onClick={() => setOpenAirdrop(false)}
            />
            <div
              className="state initial"
              style={{ display: `${success ? "none" : "block"}` }}
            >
              <div className="modal-header">
                <div className="modal-title" id="modal_feedback_title">
                  Get Airdrop
                </div>
                <div className="modal-desc" id="modal_feedback_desc">
                  You can you our wallet generator to create you wallet address
                  and privateKey
                </div>
                <h4>
                  {wallet && (
                    <p>SOL Balance: {(balance || 0).toLocaleString()}</p>
                  )}
                </h4>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => onClick()}
                  >
                    Claim 1 Airdrop
                  </button>
                </div>
              </div>
            </div>
            <div
              className="state success"
              style={{ display: `${success ? "block" : "node"}` }}
            >
              <i className="icon icon-modal-success" />
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

export default SolanaAirdrop;
