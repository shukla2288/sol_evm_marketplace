import React from "react";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

//INTERNAL
import Button from "./Button";
import Cart from "./SVG/Cart";

const UserICO = ({ data, shortenAddress, setOpenCreatedICOTable }) => {
  const router = useRouter();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

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
              onClick={() => setOpenCreatedICOTable(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Your ICO Lists</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="body_overFlow">
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Supply </th>
                      <th>Token </th>
                      <th>Creator </th>
                      <th>Price </th>
                      <th>Buy </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((token, index) => (
                      <tr key={index + 1}>
                        <td
                          onClick={() =>
                            navigator.clipboard.writeText(token?.token)
                          }
                        >
                          {token?.name}
                        </td>
                        <td>{token?.symbol}</td>
                        <td>{token?.preSaleBal}</td>
                        <td>
                          <a>
                            {shortenAddress(token?.token)}{" "}
                            <FaRegCopy
                              onClick={() => copyAddress(token?.token)}
                            />
                          </a>
                        </td>
                        <td>
                          <a>
                            {shortenAddress(token?.creator)}{" "}
                            <FaRegCopy
                              onClick={() => copyAddress(token?.creator)}
                            />
                          </a>
                        </td>
                        <td>{token?.price}</td>
                        <td>
                          <div
                            data-tooltip={`${token?.name}`}
                            class="pay_button"
                          >
                            <a
                              onClick={() =>
                                router.push(`/icotoken?token=${token?.token}`)
                              }
                              target="_blank"
                              class="pay_button-wrapper"
                            >
                              <div class="pay_text">Buy Now</div>
                              <span class="pay_icon">
                                <Cart />
                              </span>
                            </a>
                          </div>
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

export default UserICO;
