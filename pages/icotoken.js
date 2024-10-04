import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
//INTERNAL IMPORT
import { useStateContext } from "../Context/index";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import Contact from "../Components/Contact";
import Banner from "../Components/Banner";

const icotoken = () => {
  const router = useRouter();
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });
  const {
    connectWallet,
    address,
    setAddress,
    shortenAddress,
    buyToken,
    withdrawToken,
    setLoader,
    loader,
    reCall,
    ERC20,
    accountBalance,
    SINGLE_TOKEN,
  } = useStateContext();

  const [openContact, setOpenContact] = useState(false);
  const [tokenQuantity, setTokenQuantity] = useState();
  const [tokenDetails, setTokenDetails] = useState();
  const [icoTokenDetails, setIcoTokenDetails] = useState();
  const [amount, setAmount] = useState();
  const [widthdrawQuantity, setWidthdrawQuantity] = useState();
  const [network, setNetwork] = useState();

  useEffect(() => {
    const tokenAddress = router.query.token;
    if (tokenAddress) {
      const loadToken = async () => {
        setLoader(true);

        const token = await ERC20(tokenAddress);
        setTokenDetails(token);

        //SINGLE TOKEN DETAIL
        const single = await SINGLE_TOKEN(tokenAddress);
        setIcoTokenDetails(single[0]);
        console.log(single);

        const networkObject = localStorage.getItem("ACTIVE_NETWORK");

        const network = networkObject ? JSON.parse(networkObject) : null;
        setNetwork(network);
        console.log(network?.nativeCurrency.symbol);
        setLoader(false);
      };

      loadToken();
    }
  }, [router.query, reCall]);

  const BUY_TOKEN = async (avalableQuantity, buyQuantity, tokenAddress) => {
    try {
      console.log(Number(avalableQuantity) >= Number(buyQuantity));
      if (Number(avalableQuantity) >= Number(buyQuantity)) {
        const buy = await buyToken(buyQuantity, tokenAddress);
      } else {
        notifyError(`Only ${avalableQuantity} tokens left`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const WIDTHDRAW_TOKEN = async (
    avalableQuantity,
    widthdrawQuantity,
    tokenAddress
  ) => {
    try {
      if (Number(avalableQuantity) >= Number(widthdrawQuantity)) {
        const buy = await withdrawToken(widthdrawQuantity, tokenAddress);
      } else {
        notifyError(`Only ${avalableQuantity} tokens left`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header
        connectWallet={connectWallet}
        address={address}
        shortenAddress={shortenAddress}
        accountBalance={accountBalance}
        setOpenContact={setOpenContact}
        openContact={openContact}
        setAddress={setAddress}
      />
      <div class="hellow_container">
        <div class="hellow_innerwrap">
          <section class="hellow_section2 hellow_clearfix">
            <div class="hellow_col2 hellow_column1 hellow_first">
              <img
                style={{
                  width: "100%",
                  heigth: "auto",
                }}
                src="/buypage.png"
                alt=""
              />
            </div>
            <div class="hellow_col2 hellow_column2 hellow_last">
              <div class="hellow_sec2innercont">
                <div class="hellow_sec2addr">
                  <p>
                    Get your {tokenDetails?.symbol} Token Now, before its end it
                    sell
                  </p>
                  <p>
                    <span class="hellow_collig">Name :</span>{" "}
                    {tokenDetails?.name} {tokenDetails?.symbol}
                  </p>
                  <p>
                    <span class="hellow_collig">Address :</span>{" "}
                    {shortenAddress(tokenDetails?.address)}
                  </p>
                  <p>
                    <span class="hellow_collig">Total Supply :</span>{" "}
                    {tokenDetails?.supply}
                  </p>
                  <p>
                    <span class="hellow_collig">Price :</span>{" "}
                    {icoTokenDetails?.price} {network?.nativeCurrency.symbol}
                  </p>
                  <p>
                    <span class="hellow_collig">Your Balance :</span>{" "}
                    {tokenDetails?.balance} {tokenDetails?.symbol}
                  </p>
                  <p>
                    <span class="hellow_collig">ICO Left :</span>{" "}
                    {icoTokenDetails?.preSaleBal} {tokenDetails?.symbol}
                  </p>
                </div>
              </div>
              <div class="hellow_sec2contactform">
                <h3 class="hellow_sec2frmtitle">
                  Exclusive offer, avalible for {tokenDetails?.name}, in best
                  possible price
                </h3>

                <div>
                  {Number(icoTokenDetails?.preSaleBal) != 0 && (
                    <>
                      <div class="hellow_clearfix">
                        <textarea
                          placeholder="Token Quantity"
                          name="textarea"
                          id=""
                          cols="30"
                          rows="1"
                          onChange={(e) => setAmount(e.target.value)}
                        ></textarea>
                      </div>
                      <div class="hellow_clearfix">
                        <textarea
                          value={
                            amount
                              ? `${amount * icoTokenDetails?.price} ${
                                  network?.nativeCurrency.symbol
                                }`
                              : "Output value"
                          }
                          name="textarea"
                          id=""
                          cols="30"
                          rows="1"
                        ></textarea>
                      </div>
                      <div class="hellow_clearfix">
                        <button
                          onClick={() =>
                            BUY_TOKEN(
                              icoTokenDetails?.preSaleBal,
                              amount,
                              router.query.token
                            )
                          }
                        >
                          Buy Token
                        </button>
                      </div>
                      {/* //WIDTHDRAW TOKEN ONLY OWNER */}
                      {icoTokenDetails?.creator.toLowerCase() == address && (
                        <>
                          <div class="hellow_clearfix">
                            <textarea
                              placeholder="Quantity"
                              name="textarea"
                              id=""
                              cols="30"
                              rows="1"
                              onChange={(e) =>
                                setWidthdrawQuantity(e.target.value)
                              }
                            ></textarea>
                          </div>
                          <div class="hellow_clearfix">
                            <button
                              onClick={() =>
                                WIDTHDRAW_TOKEN(
                                  icoTokenDetails?.preSaleBal,
                                  widthdrawQuantity,
                                  router.query.token
                                )
                              }
                            >
                              Widthdraw Token
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div class="hellow_clearfix">
                    <textarea
                      placeholder={`NOTE: We are excited to inform you that you can now purchase ERC20 tokens at the best possible price with unparalleled security on our platform. Here’s why you should consider buying your tokens with us. \n\n Competitive Pricing: We offer the most competitive rates for ERC20 tokens, ensuring you get the best value for your investment.\n\n
Top-notch Security: Your transactions and assets are safeguarded with state-of-the-art security measures, including multi-signature wallets, two-factor authentication, and encrypted data storage.\n\n
User-friendly Interface: Our platform is designed to provide a seamless and intuitive user experience, making it easy for both beginners and experienced traders to buy tokens.\n\n
Transparent Process: Enjoy complete transparency in all transactions, with real-time updates and detailed reports.\n\n
Reliable Support: Our dedicated customer support team is available 24/7 to assist you with any queries or issues you may encounter.`}
                      name="textarea"
                      id=""
                      cols="30"
                      rows="7"
                      disabled
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="content">
        <Banner />
      </div>
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      {loader && <Loader />}
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default icotoken;
