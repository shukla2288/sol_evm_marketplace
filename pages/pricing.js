import React, { useEffect, useState } from "react";

//INTERNAL IMPORT
import { useStateContext } from "../Context/index";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";

const pricing = () => {
  const {
    createERC20,
    connectWallet,
    address,
    setAddress,
    shortenAddress,
    GET_ALL_PRESALE_TOKENS,
    GET_ALL_USER_PRESALE_TOKENS,
    ICO_CREATOR,
    buyToken,
    transferTokens,
    withdrawToken,
    PRESALE_ADDRESS,
    setLoader,
    loader,
    reCall,
    ERC20,
    TRANSFER_TOKEN,
    ENS_NAME,
    GET_CONTRACT_ABI,
    GET_CONTRACT_SOURCE_CODE,
    GET_CONTRACT_CREATOR,
    ETHER_LATEST_PRICE,
    CHECK_ACCOUNT_BALANCE,
    GET_BALANCE,
    PINATA_AIP_KEY,
    PINATA_SECRECT_KEY,
    TRANSFER_ETHER,
    GET_POOL_ADDRESS,
    ADD_TOKEN_FEE,
    SOLANA_FEE,
    SOLANA_RECEIVER,
    CREATOR_RECEIVER,
    accountBalance,
    TEST_POLYGON_ADDRESS,
    TEST_SEPOLIA_ADDRESS,
  } = useStateContext();

  const [openContact, setOpenContact] = useState(false);
  const [activeTap, setActiveTap] = useState(0);
  console.log(activeTap);
  return (
    <>
      <Header
        connectWallet={connectWallet}
        address={address}
        shortenAddress={shortenAddress}
        accountBalance={accountBalance}
        setOpenContact={setOpenContact}
        openContact={openContact}
      />
      <div className="content">
        <div className="index-blocks-2">
          <div className="wide-bg">
            <div className="app-desc max-width">
              <div className="text">
                <h2>Pricing structure of MemePump.net Fee</h2>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3, ensuring fairness and clarity at every level.
                </p>
              </div>
              <img
                src="/assets/i/v3/universe/vcutter-veditor.svg"
                alt="Video Editor"
              />
            </div>
          </div>
          <article className="block-padding max-width">
            <h2>Fair Fees for the Web3 Era</h2>
            <p>
              Our innovative pricing structure is designed to align with the
              decentralized ethos of Web3
            </p>
            <ol>
              <li>
                <h3>ERC20 Token Creator</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3, ensuring fairness and clarity at every level.
                </p>
              </li>
              <li>
                <h3>Solana Token Creator</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3, ensuring fairness and clarity at every level.
                </p>
              </li>
              <li>
                <h3>MetaMass Token Add</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3, ensuring fairness and clarity at every level.
                </p>
              </li>
              <li>
                <h3>IPFS UPLOAD Token</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3, ensuring fairness and clarity at every level.
                </p>
              </li>
            </ol>
          </article>
          <div className="line" />
          <div className="block-padding misc max-width">
            <h2>Revolutionizing Value: Fair Fees for the Web3 Era</h2>
            <p>
              At MemePump.net, we believe in creating a transparent and equitable
              ecosystem for all users. Our innovative pricing structure is
              designed to align with the decentralized ethos of Web3, ensuring
              fairness and clarity at every level. Whether you're a developer,
              enterprise, or individual user, our tiered fee system offers
              competitive rates tailored to your needs.
            </p>
            <p>
              With a focus on simplicity, our clear-cut pricing eliminates
              hidden costs, empowering you to leverage cutting-edge tools
              without breaking the bank. Embrace the future of digital
              interaction with confidence, knowing that Web3.Tools is committed
              to providing exceptional value while fostering a community-centric
              approach. Join us in pioneering a new standard for Web3 services,
              where transparency, fairness, and innovation are at the forefront
              of our mission.
            </p>
          </div>
          <div className="line" />
          <div className="block-padding max-width">
            <h2>Why Choose Us</h2>
            <div className="features">
              <div className="item">
                <h3>Network Setup</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3,
                </p>
              </div>
              <div className="item">
                <h3>Add Network</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3,
                </p>
              </div>
              <div className="item">
                <h3>Token Creator</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3,
                </p>
              </div>
              <div className="item">
                <h3>Token Transfer</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3,
                </p>
              </div>
              <div className="item">
                <h3>ETH Transfer</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3,
                </p>
              </div>
              <div className="item">
                <h3>Token Explorer</h3>
                <p>
                  At MemePump.net, we believe in creating a transparent and
                  equitable ecosystem for all users. Our innovative pricing
                  structure is designed to align with the decentralized ethos of
                  Web3,
                </p>
              </div>
            </div>
          </div>
          <div className="line" />
          <div className="block-padding sub max-width">
            <h2>Format-specific tools</h2>
            <div className="items">
              <a>Token Balance</a>
              <a>Token Explorer</a>
              <a>ETH Transfer</a>
              <a>Add Token</a>
              <a>Ethereum Address</a>
              <a>ENS Name</a>
              <a>Contract ABI</a>
              <a>Solidity Contract</a>
              <a>Ethereum Price</a>
              <a>Contract Owner</a>
            </div>
          </div>
          <div className="line" />
          <div className="block-padding">
            <div className="faq">
              <h2>Frequently Asked Questions</h2>

              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  onClick={() => setActiveTap(index)}
                  className={`item  ${index == activeTap ? "active" : ""} `}
                  key={index}
                >
                  <div className="q">Is MemePump.net is free to use?</div>
                  <div className="a">
                    At MemePump.net, we believe in creating a transparent and
                    equitable ecosystem for all users. Our innovative pricing
                    structure is designed to align with the decentralized ethos
                    of Web3, ensuring fairness and clarity at every level.
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="line" />
        </div>
      </div>
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default pricing;
