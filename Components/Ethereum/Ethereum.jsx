import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

//INTERNAL IMPORT
import UploadICON from "./SVG/UploadICON";
import Input from "./Input";

const Ethereum = ({ setOpenEthereum, ETHER_LATEST_PRICE, setLoader }) => {
  const [tokenDetails, setTokenDetails] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    const loadToken = async () => {
      setLoader(true);
      const token = await ETHER_LATEST_PRICE();
      if (token == undefined) {
        setNotFound("Token dose not exist, on the chain");
      } else {
        const ethbtc_timestamp = new Date(
          token.data.result.ethbtc_timestamp * 1000
        );
        const ethusd_timestamp = new Date(
          token.data.result.ethusd_timestamp * 1000
        );

        const options = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };

        const item = {
          btc: ethbtc_timestamp.toLocaleDateString("en-US", options),
          usd: ethusd_timestamp.toLocaleDateString("en-US", options),
          btcPrice: token.data.result.ethbtc,
          usdPrice: token.data.result.ethusd,
        };

        setTokenDetails(item);
        console.log(token);
        console.log(item);
      }
      setLoader(false);
    };

    loadToken();
  }, []);

  return (
    <div className="bootstrap">
      <div className="modal show" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered modal-custom modal-custom-xl">
          <div className="modal-content">
            <button onClick={() => setOpenEthereum(false)} className="close" />
            <div className="modal-header">
              <div className="modal-title">Ethereum Latest Price</div>
              <div className="modal-desc">
                Now you can get latest ethereum price
              </div>
            </div>
            <div className="modal-body">
              <div>
                {tokenDetails && (
                  <>
                    <Input value={`$ ${tokenDetails.usdPrice} USD`} />
                    <Input value={`${tokenDetails.usd} `} />
                    <Input value={`${tokenDetails.btcPrice} BTC`} />
                    <Input value={`${tokenDetails.btc} `} />
                  </>
                )}
              </div>{" "}
              {notFound && <div className="text-center notice">{notFound}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ethereum;
