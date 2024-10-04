import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import Input from "./Input";

const LiqudityFinder = ({
  setOpenLiqudityFinder,
  ERC20,
  setLoader,
  GET_POOL_ADDRESS,
}) => {
  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });

  const [token_1, setToken_1] = useState();
  const [token_2, setToken_2] = useState();
  const [fee, setFee] = useState();
  //DISPLAY TOKEN
  const [token_A, setToken_A] = useState();
  const [token_B, setToken_B] = useState();
  const [poolAddress, setPoolAddress] = useState();

  useEffect(() => {
    const loadToken = async () => {
      setLoader(true);
      const token = await ERC20(token_A);
      if (token == undefined) {
        console.log("Kindly past the token address");
      } else {
        setToken_1(token);
      }
      setLoader(false);
    };
    loadToken();
  }, [token_A]);

  useEffect(() => {
    const loadToken = async () => {
      setLoader(true);
      const token = await ERC20(token_B);
      if (token == undefined) {
        console.log("Kindly past the token address");
      } else {
        setToken_2(token);
      }
      setLoader(false);
    };
    loadToken();
  }, [token_B]);

  const CALLING_POOL_Add = async () => {
    setLoader(true);
    if (!token_1 || !token_2 || !fee) {
      return notifyError("Provide all details");
    } else {
      const pool = await GET_POOL_ADDRESS(token_1, token_2, fee);
      console.log(pool);
      setPoolAddress(pool[0]);
      notifySuccess("Pool address add successfully");
    }
    setLoader(false);
  };

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button
              onClick={() => setOpenLiqudityFinder(false)}
              className="close"
            />
            <div className="modal-header">
              <div className="modal-title">Liqudity Finder</div>
              <div className="modal-desc">
                Create your ERC20 token and launch
              </div>
            </div>
            <div className="modal-body">
              <div>
                {token_1 ? (
                  <Input
                    value={`${token_1?.name} (${
                      token_1?.symbol
                    }) Bal: ${token_1?.balance.slice(0, 8)}`}
                  />
                ) : (
                  <Input
                    placeholder={"Token A"}
                    handleChange={(e) => setToken_A(e.target.value)}
                  />
                )}

                {token_2 ? (
                  <Input
                    value={`${token_2?.name} (${
                      token_2?.symbol
                    }) Bal: ${token_2?.balance.slice(0, 8)}`}
                  />
                ) : (
                  <Input
                    placeholder={"Token B"}
                    handleChange={(e) => setToken_B(e.target.value)}
                  />
                )}

                <Input
                  placeholder={"Fee"}
                  handleChange={(e) => setFee(e.target.value)}
                />
                {poolAddress && <Input value={`${poolAddress}`} />}
                {poolAddress ? (
                  <div className="form-group">
                    <button className="btn btn-primary btn-block ">
                      Added Successfully
                    </button>
                  </div>
                ) : (
                  <div className="form-group">
                    <button
                      onClick={() => CALLING_POOL_Add()}
                      className="btn btn-primary btn-block "
                    >
                      Check Pool
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiqudityFinder;
