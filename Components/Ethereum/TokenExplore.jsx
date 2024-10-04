import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const TokenExplore = ({ setOpenTokenExplore, ERC20, setLoader }) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [transferToken, setTransferToken] = useState();

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  useEffect(() => {
    if (transferToken) {
      const loadToken = async () => {
        setLoader(true);
        const token = await ERC20(transferToken);
        if (token == undefined) {
          notifyError("Token dose not exist, on the chain");
          console.log("Token dose not exist, on the chain");
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
              onClick={() => setOpenTokenExplore(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Token Explore</div>
              <div className="modal-desc">Finder token details</div>
            </div>
            <div className="modal-body">
              <div>
                <Input
                  placeholder={"token address"}
                  handleChange={(e) => setTransferToken(e.target.value)}
                />
                {tokenDetails && (
                  <>
                    <Input
                      value={`Balance: ${tokenDetails?.name} ${tokenDetails?.balance} ${tokenDetails?.symbol}`}
                    />
                    <Input value={`Name: ${tokenDetails?.name} `} />
                    <Input value={`Symbol: ${tokenDetails?.symbol} `} />
                    <Input value={`ChainID: ${tokenDetails?.chainId} `} />
                    <Input value={`Decimals: ${tokenDetails?.decimals} `} />
                    <Input value={`Total Supply: ${tokenDetails?.supply} `} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenExplore;
