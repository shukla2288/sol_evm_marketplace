import { useState } from "react";
import dynamic from "next/dynamic";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useNetworkConfiguration } from "../../solana/contexts/NetworkConfigurationProvider";

// INTERNAL IMPORT
import NetworkSwitcherSVG from "../Ethereum/SVG/NetworkSwitcherSVG";

const SolanaNetwork = ({ setOpenSolanaNetwork }) => {
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();

  console.log(networkConfiguration);

  const handleChange = (network) => {
    setNetworkConfiguration(network || "devnet");
  };

  return (
    <>
      <div className="bootstrap">
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
            <div className="modal-content">
              <button
                onClick={() => setOpenSolanaNetwork(false)}
                className="close"
              />
              <div className="modal-header">
                <div className="modal-title">Solana Network</div>
                <div className="modal-desc">
                  Kindly connect to your prefired networks
                </div>
              </div>
              <div className="modal-body">
                <div className="login-with">
                  <div className="providers">
                    <div
                      className="provider google"
                      onClick={() => handleChange("mainnet")}
                    >
                      <img
                        className="icon icon-google"
                        src={"logos/solana.png"}
                        alt=""
                      />
                      <span>
                        Solana Mainnet
                        {networkConfiguration == "devnet" ? "" : " Active"}
                      </span>
                    </div>
                    <div
                      className="provider google"
                      onClick={() => handleChange("devnet")}
                    >
                      <img
                        className="icon icon-google"
                        src={"logos/solana.png"}
                        alt=""
                      />
                      <span>
                        Devnet{" "}
                        {networkConfiguration == "devnet" ? "Active" : ""}
                      </span>
                    </div>

                    <WalletMultiButton style={{ width: "100%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(SolanaNetwork), {
  ssr: false,
});
