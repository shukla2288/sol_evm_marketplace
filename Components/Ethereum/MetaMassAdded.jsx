import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

///INTERNAL
import Button from "./Button";
import Cart from "./SVG/Cart";

const MetaMassAdded = ({ shortenAddress, setOpenAddedMetaMass }) => {
  const router = useRouter();
  const [createdAllToken, setCreatedAllToken] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  useEffect(() => {
    const tokens = localStorage.getItem("ADDED_METAMASS");

    const tokenLists = tokens ? JSON.parse(tokens) : null;
    setCreatedAllToken(tokenLists);
    console.log(tokenLists);
  }, []);

  const copyAddress = (text) => {
    navigator.clipboard.writeText(text);
    notifySuccess(" Copied successfully");
  };
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenAddedMetaMass(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">All Added MetaMass Token</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="body_overFlow">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Name</th>
                      <th>Symbol </th>
                      <th>Supply </th>
                      <th>Address </th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdAllToken?.map((token, index) => (
                      <tr key={index + 1}>
                        <td
                          onClick={() =>
                            navigator.clipboard.writeText(token?.tokenAddress)
                          }
                        >
                          <img
                            src={token?.logo || "theblockchaincoders.jpg"}
                            alt={token?.name}
                            style={{
                              with: "30px",
                              height: "30px",
                              borderRadius: "10px",
                            }}
                          />
                        </td>
                        <td>{token?.name}</td>
                        <td>{token?.symbol}</td>
                        <td>{token?.supply}</td>
                        <td>
                          <a>
                            {shortenAddress(token?.tokenAddress)}{" "}
                            <FaRegCopy
                              onClick={() => copyAddress(token?.tokenAddress)}
                            />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaMassAdded;
