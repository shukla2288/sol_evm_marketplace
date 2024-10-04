import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

///INTERNAL IMPORT
import Input from "./Input";

const ICOCreator = ({ setOpenICOCreator, ERC20, setLoader, ICO_CREATOR }) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();
  const [notFound, setNotFound] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const [token, setToken] = useState({
    address: "",
    price: "",
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
              onClick={() => setOpenICOCreator(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">ICO CREATOR</div>
              <div className="modal-desc">Launch you ICO in Marketplace</div>
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
                      setToken({ ...token, address: e.target.value })
                    )}
                  />
                )}

                <Input
                  placeholder={"Price"}
                  handleChange={(e) =>
                    setToken({ ...token, price: e.target.value })
                  }
                />
                {!notFound && (
                  <div className="form-group">
                    <button
                      onClick={() => ICO_CREATOR(token)}
                      className="btn btn-primary btn-block "
                    >
                      Create ICO
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

export default ICOCreator;
