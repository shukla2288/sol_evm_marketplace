import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const TransferEther = ({
  setOpenTransferEther,
  setLoader,
  CHECK_ACCOUNT_BALANCE,
  GET_BALANCE,
  TRANSFER_ETHER,
}) => {
  const [userBalance, setUserBalance] = useState();
  const [transferUser, setTransferUser] = useState();
  const [transferAddress, setTransferAddress] = useState();
  const [amount, setAmount] = useState();

  useEffect(() => {
    const loadToken = async () => {
      setLoader(true);
      const balance = await GET_BALANCE();

      setUserBalance(balance);
      console.log(balance);

      setLoader(false);
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (transferAddress) {
      const loadToken = async () => {
        setLoader(true);
        const token = await CHECK_ACCOUNT_BALANCE(transferAddress);

        setTransferUser(token);

        setLoader(false);
      };

      loadToken();
    }
  }, [transferAddress]);
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenTransferEther(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Transfer Ether</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="modal-body">
              <div>
                {userBalance && <Input value={`${userBalance} Matic`} />}
                {transferUser ? (
                  <Input value={`${transferUser} Matic`} />
                ) : (
                  <Input
                    placeholder={"Token address"}
                    handleChange={(e) => setTransferAddress(e.target.value)}
                  />
                )}

                <Input
                  placeholder={"Amount"}
                  handleChange={(e) => setAmount(e.target.value)}
                />
                <div className="form-group">
                  <button
                    onClick={() => TRANSFER_ETHER(transferAddress, amount)}
                    className="btn btn-primary btn-block "
                  >
                    Transfer ETH
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferEther;
