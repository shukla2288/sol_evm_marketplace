import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const TokenTransfer = ({
  setOpenTokenTransfer,
  ERC20,
  setLoader,
  TRANSFER_TOKEN,
}) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [notFound, setNotFound] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [token, setToken] = useState({
    _sendTo: "",
    _amount: "",
    _tokenAddress: "",
  });

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await ERC20(transferToken);
        if (token == undefined) {
          notifyError("Token dose not exist, on the chain");
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
  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenTokenTransfer(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Token Balance Checker</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="modal-body">
              <div>
                {tokenDetails ? (
                  <Input
                    value={`${tokenDetails?.name} ${tokenDetails?.balance} ${tokenDetails?.symbol}`}
                  />
                ) : (
                  <Input
                    placeholder={"Token address"}
                    handleChange={(e) => (
                      setTransferToken(e.target.value),
                      setToken({ ...token, _tokenAddress: e.target.value })
                    )}
                  />
                )}

                <Input
                  placeholder={"Send To"}
                  handleChange={(e) =>
                    setToken({ ...token, _sendTo: e.target.value })
                  }
                />
                <Input
                  placeholder={"Quentity"}
                  handleChange={(e) =>
                    setToken({ ...token, _amount: e.target.value })
                  }
                />
                {!notFound && (
                  <div className="form-group">
                    <button
                      onClick={() => TRANSFER_TOKEN(token)}
                      className="btn btn-primary btn-block "
                    >
                      Transfer Token
                    </button>
                  </div>
                )}
              </div>
              {notFound && <div className="text-center notice">{notFound}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTransfer;
