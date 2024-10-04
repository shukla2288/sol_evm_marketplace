import React, { useEffect, useState } from "react";

//INTERNAL IMPORT

import { useStateContext } from "../Context/index";
import UserICO from "../Components/Ethereum/UserICO";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Contact from "../Components/Contact";
import Banner from "../Components/Banner";
import TokenCreator from "../Components/Ethereum/TokenCreator";
import Network from "../Components/Ethereum/Network";
import TokenBalance from "../Components/Ethereum/TokenBalance";
import TokenExplore from "../Components/Ethereum/TokenExplore";
import TokenTransfer from "../Components/Ethereum/TokenTransfer";
import ENSFinder from "../Components/Ethereum/ENSFinder";
import ContractABI from "../Components/Ethereum/ContractABI";
import SolidityContract from "../Components/Ethereum/SolidityContract";
import ContractOwner from "../Components/Ethereum/ContractOwner";
import Ethereum from "../Components/Ethereum/Ethereum";
import Loader from "../Components/Loader";
import EthereumWalletGenerator from "../Components/Ethereum/EthereumWalletGenerator";
import AddToken from "../Components/Ethereum/AddToken";
import ICOCreator from "../Components/Ethereum/ICOCreator";
import TransferEther from "../Components/Ethereum/TransferEther";
import ICOMarketplace from "../Components/Ethereum/ICOMarketplace";
import LiqudityFinder from "../Components/Ethereum/LiqudityFinder";
import AddNetwork from "../Components/Ethereum/AddNetwork";
import CreatedToken from "../Components/Ethereum/CreatedToken";
import MetaMassAdded from "../Components/Ethereum/MetaMassAdded";
import CreatedWallet from "../Components/Ethereum/CreatedWallet";
import ICOAddress from "../Components/Ethereum/ICOAddress";
import SolanaWallet from "../Components/Solana/SolanaWallet";
import SolanaNetwork from "../Components/Solana/SolanaNetwork";
import SolanaAirdrop from "../Components/Solana/SolanaAirdrop";
import SolanaCreateToken from "../Components/Solana/SolanaCreateToken";
import SolTransfer from "../Components/Solana/SolTransfer";
import BitCoinWallet from "../Components/BitCoin/BitcoinWallet";
import QRCodeCreator from "../Components/QRCodeCreator";
const profile = () => {
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
    accountBalance,
    CREATOR_RECEIVER,
    TEST_POLYGON_ADDRESS,
    TEST_SEPOLIA_ADDRESS,
    TEST_BASE_ADDRESS,
    ETHEREUM_ADDRESS,
    POLYGON_ADDRESS,
    BINNANCE_ADDRESS,
    BASE_ADDRESS,
  } = useStateContext();

  const [openNetworkModel, setOpenNetworkModel] = useState(false);
  const [openTokenCreatorModel, setOpenTokenCreatorModel] = useState(false);
  const [openTokenBalace, setOpenTokenBalace] = useState(false);
  const [openTokenExplore, setOpenTokenExplore] = useState(false);
  const [openTokenTransfer, setOpenTokenTransfer] = useState(false);
  const [openENSFinder, setOpenENSFinder] = useState(false);
  const [openontractABI, setOpenontractABI] = useState(false);
  const [openSolidityContract, setOpenSolidityContract] = useState(false);
  const [openContractOwner, setOpenContractOwner] = useState(false);
  const [openEthereum, setOpenEthereum] = useState(false);
  const [openEthereunWalletGenerator, setOpenEthereunWalletGenerator] =
    useState(false);
  const [openAddToken, setOpenAddToken] = useState(false);
  const [openICOCreator, setOpenICOCreator] = useState(false);
  const [openICOMarketplace, setOpenICOMarketplace] = useState(false);
  const [openTransferEther, setOpenTransferEther] = useState(false);
  const [openTableModel, setOpenTableModel] = useState(false);
  const [openLiqudityFinder, setOpenLiqudityFinder] = useState(false);
  const [openAddNetwork, setOpenAddNetwork] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openCreatedICOTable, setOpenCreatedICOTable] = useState(false);
  const [openCreatedToken, setOpenCreatedToken] = useState(false);
  const [openAddedMetaMass, setOpenAddedMetaMass] = useState(false);
  const [openCreatedWallet, setOpenCreatedWallet] = useState(false);
  const [openQRCodeCreator, setOpenQRCodeCreator] = useState(false);
  //SOLANA
  const [openSolanaWallet, setOpenSolanaWallet] = useState(false);
  const [openSolanaNetwork, setOpenSolanaNetwork] = useState(false);
  const [openAirdrop, setOpenAirdrop] = useState(false);
  const [openSolanaTokenCreator, setOpenSolanaTokenCreator] = useState(false);
  const [openSolTransfer, setOpenSolTransfer] = useState(false);
  const [openICOAddress, setOpenICOAddress] = useState(false);
  //BITCOIN
  const [openBitCoinWallet, setOpenBitCoinWallet] = useState(false);

  const [features, setFeatures] = useState();
  const [countNet, setCountNet] = useState(0);
  const [network, setNetwork] = useState("");
  const [networkActive, setNetworkActive] = useState();

  //ICO ARRAY
  const [userICOLists, setUserICOLists] = useState();
  const [allICOLists, setAllICOLists] = useState();
  const [ICOContractAddress, setICOContractAddress] = useState();

  // ETHEREUM MAINNET
  const ETHEREUM_MAIN = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Token Creator",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
    {
      name: "ENS Name",
      image: "universe-vcutter-vrotate",
      new: false,
    },
    {
      name: "Contract ABI",
      image: "universe-vcutter-vflip",
      new: false,
    },
    {
      name: "Solidity Contract",
      image: "universe-vcutter-vresolution",
      new: false,
    },
    {
      name: "Ethereum Price",
      image: "universe-vcutter-vvolume",
      new: false,
    },
    {
      name: "Contract Owner",
      image: "universe-vcutter-vspeed",
      new: false,
    },
    {
      name: "Liqudity Finder",
      image: "universe-vcutter-stabilize",
      new: false,
    },
  ];

  // POLYGON MAINNET
  const POLYGON_MAINNET = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Token Creator",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
  ];

  // BASE MAINNET
  const BASE_MAINNET = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Token Creator",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
  ];

  // BINANCE MAINNET
  const BINANCE_MAINNET = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "ICO Marketplace",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
  ];

  // POLYGON AMOY TEST
  const POLYGON_AMOY = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Created ICO",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "ICO Address",
      image: "universe-pdf-rotate",
      new: true,
    },
    {
      name: "Created Token",
      image: "universe-acutter-atrim",
      new: false,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "Token Creator",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "ICO Creator",
      image: "universe-vcutter-screenrecorder",
      new: true,
    },
    {
      name: "ICO Marketplace",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
  ];

  // POLYGON AMOY TEST
  const SEPOLIA = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Created ICO",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Created Token",
      image: "universe-acutter-atrim",
      new: false,
    },
    {
      name: "ICO Address",
      image: "universe-pdf-rotate",
      new: true,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "Token Creator",
      image: "universe-vcutter-veditor",
      new: true,
    },
    {
      name: "ICO Creator",
      image: "universe-vcutter-screenrecorder",
      new: true,
    },
    {
      name: "ICO Marketplace",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
  ];

  // BESE SEPOLIA TEST
  const BESE_SEPOLIA = [
    {
      name: "Network Setup",
      image: "universe-vcutter-vloop",
      new: false,
    },
    {
      name: "Add Network",
      image: "universe-webcamera",
      new: false,
    },
    {
      name: "Added MetaMass",
      image: "universe-acutter-avolume",
      new: false,
    },
    {
      name: "Created Wallet",
      image: "universe-acutter-aspeed",
      new: false,
    },
    {
      name: "ICO Marketplace",
      image: "universe-vcutter-vtts",
      new: true,
    },
    {
      name: "Token Transfer",
      image: "universe-vcutter-addaudio",
      new: false,
    },
    {
      name: "ETH Transfer",
      image: "universe-vcutter-vtrim",
      new: false,
    },
    {
      name: "Token Explorer",
      image: "universe-vcutter-addimage",
      new: false,
    },
    {
      name: "Token Balance",
      image: "universe-vcutter-addtext",
      new: false,
    },
    {
      name: "Add Token",
      image: "universe-vcutter-delogo",
      new: false,
    },
    {
      name: "Ethereum Address",
      image: "universe-vcutter-vcrop",
      new: false,
    },
  ];

  //SOLANA
  const SOLANA = [
    {
      name: "Solana Network",
      image: "universe-acutter-pitch",
      new: false,
    },
    {
      name: "Airdrop",
      image: "universe-acutter-equalizer",
      new: false,
    },
    {
      name: "Solana Token",
      image: "universe-acutter-areverse",
      new: false,
    },
    {
      name: "Transfer Sol",
      image: "universe-ajoiner",
      new: false,
    },
    {
      name: "Solana Wallet",
      image: "universe-pdf-merge",
      new: false,
    },
    {
      name: "QR Code Creator",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  //BITCOIN
  const BITCOIN = [
    {
      name: "BitCoin Wallet",
      image: "universe-pdf-merge",
      new: false,
    },
    {
      name: "QR Code Creator",
      image: "universe-pdf-png2pdf",
      new: false,
    },
  ];

  useEffect(() => {
    const handleNetworkChange = (newNetworkId) => {
      console.log(`Network changed to: ${newNetworkId}`);
      setNetwork(newNetworkId);
    };

    if (window.ethereum) {
      window.ethereum
        .request({ method: "net_version" })
        .then((networkId) => setNetwork(networkId))
        .catch((error) => console.error(error));

      window.ethereum.on("chainChanged", handleNetworkChange);

      return () => {
        window.ethereum.removeListener("chainChanged", handleNetworkChange);
      };
    } else {
      console.log("MetaMask is not installed.");
    }
  }, []);

  useEffect(() => {
    const networkObject = localStorage.getItem("ACTIVE_NETWORK");

    const network = networkObject ? JSON.parse(networkObject) : null;

    if (network?.chainName == "Ethereum") {
      setFeatures(ETHEREUM_MAIN);
    } else if (network?.chainName == "Polygon Mainnet") {
      setFeatures(POLYGON_MAINNET);
    } else if (network?.chainName == "Binance Chain") {
      setFeatures(BINANCE_MAINNET);
    } else if (network?.chainName == "Base Mainnet") {
      setFeatures(BASE_MAINNET);
    } else if (network?.chainName == "Polygon Amoy") {
      setFeatures(POLYGON_AMOY);
    } else if (network?.chainName == "Base Sepolia") {
      setFeatures(BESE_SEPOLIA);
    } else if (network?.chainName == "Sepolia") {
      setFeatures(SEPOLIA);
    } else {
      setFeatures(ETHEREUM_MAIN);
    }
    setNetworkActive(network);
  }, [countNet]);

  useEffect(() => {
    const networkObject = localStorage.getItem("ACTIVE_NETWORK");

    const network = networkObject ? JSON.parse(networkObject) : null;

    const fetchData = async () => {
      const singleUser = await GET_ALL_USER_PRESALE_TOKENS();
      const allICO = await GET_ALL_PRESALE_TOKENS();

      setUserICOLists(singleUser);
      setAllICOLists(allICO);
    };
    if (network?.id == "polygon_amoy" && TEST_POLYGON_ADDRESS != "ADDRESS") {
      setICOContractAddress(TEST_POLYGON_ADDRESS);
      fetchData();
    } else if (network?.id == "sepolia" && TEST_SEPOLIA_ADDRESS != "ADDRESS") {
      setICOContractAddress(TEST_SEPOLIA_ADDRESS);
      fetchData();
    } else if (
      network?.id == "base_sepolia" &&
      TEST_BASE_ADDRESS != "ADDRESS"
    ) {
      setICOContractAddress(TEST_BASE_ADDRESS);
      fetchData();
    } else if (network?.id == "ethereum" && ETHEREUM_ADDRESS != "ADDRESS") {
      setICOContractAddress(ETHEREUM_ADDRESS);
      fetchData();
    } else if (network?.id == "polygon" && POLYGON_ADDRESS != "ADDRESS") {
      setICOContractAddress(POLYGON_ADDRESS);
      fetchData();
    } else if (network?.id == "bsc" && BINNANCE_ADDRESS != "ADDRESS") {
      setICOContractAddress(BINNANCE_ADDRESS);
      fetchData();
    } else if (network?.id == "base_mainnet" && BASE_ADDRESS != "ADDRESS") {
      setICOContractAddress(BASE_ADDRESS);
      fetchData();
    }
  }, [address, network, reCall]);
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
      <div className="content">
        <Banner />

        {openCreatedICOTable && (
          <UserICO
            data={userICOLists}
            shortenAddress={shortenAddress}
            setOpenCreatedICOTable={setOpenCreatedICOTable}
          />
        )}
      </div>
      <div className="content">
        <div className="groups">
          <div className="group vtools">
            <div className="title">{networkActive?.chainName} Tools</div>
            <div className="items">
              {features?.map((tool, index) => (
                <a
                  className="item new"
                  onClick={() =>
                    tool.name == "Network Setup"
                      ? setOpenNetworkModel(true)
                      : tool.name == "Token Creator"
                      ? setOpenTokenCreatorModel(true)
                      : tool.name == "Token Balance"
                      ? setOpenTokenBalace(true)
                      : tool.name == "Token Explorer"
                      ? setOpenTokenExplore(true)
                      : tool.name == "Token Transfer"
                      ? setOpenTokenTransfer(true)
                      : tool.name == "ENS Name"
                      ? setOpenENSFinder(true)
                      : tool.name == "Contract ABI"
                      ? setOpenontractABI(true)
                      : tool.name == "Solidity Contract"
                      ? setOpenSolidityContract(true)
                      : tool.name == "Contract Owner"
                      ? setOpenContractOwner(true)
                      : tool.name == "Ethereum Price"
                      ? setOpenEthereum(true)
                      : tool.name == "Ethereum Address"
                      ? setOpenEthereunWalletGenerator(true)
                      : tool.name == "Add Token"
                      ? setOpenAddToken(true)
                      : tool.name == "ICO Creator"
                      ? setOpenICOCreator(true)
                      : tool.name == "ETH Transfer"
                      ? setOpenTransferEther(true)
                      : tool.name == "ICO Marketplace"
                      ? setOpenTableModel(true)
                      : tool.name == "Liqudity Finder"
                      ? setOpenLiqudityFinder(true)
                      : tool.name == "Add Network"
                      ? setOpenAddNetwork(true)
                      : tool.name == "Created ICO"
                      ? setOpenCreatedICOTable(true)
                      : tool.name == "Created Token"
                      ? setOpenCreatedToken(true)
                      : tool.name == "Added MetaMass"
                      ? setOpenAddedMetaMass(true)
                      : tool.name == "Created Wallet"
                      ? setOpenCreatedWallet(true)
                      : tool.name == "ICO Address"
                      ? setOpenICOAddress(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> New </span>
                    </div>
                  )}

                  <div className={`img ${tool.image}`} />
                  <div className="name">{tool.name}</div>
                </a>
              ))}
            </div>
          </div>
          <div id="solana" className="group atools">
            <div className="title">Solana Tools</div>
            <div className="items">
              {SOLANA?.map((tool, index) => (
                <a
                  className="item new"
                  onClick={() =>
                    tool.name == "Solana Wallet"
                      ? setOpenSolanaWallet(true)
                      : tool.name == "Solana Network"
                      ? setOpenSolanaNetwork(true)
                      : tool.name == "Airdrop"
                      ? setOpenAirdrop(true)
                      : tool.name == "Solana Token"
                      ? setOpenSolanaTokenCreator(true)
                      : tool.name == "Transfer Sol"
                      ? setOpenSolTransfer(true)
                      : tool.name == "QR Code Creator"
                      ? setOpenQRCodeCreator(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> New </span>
                    </div>
                  )}

                  <div className={`img ${tool.image}`} />
                  <div className="name">{tool.name}</div>
                </a>
              ))}
            </div>
          </div>
          <div id="bitcon" className="group pdftools">
            <div className="title">Bitcoin Tools</div>
            <div className="items">
              {BITCOIN?.map((tool, index) => (
                <a
                  className="item new"
                  onClick={() =>
                    tool.name == "BitCoin Wallet"
                      ? setOpenBitCoinWallet(true)
                      : tool.name == "QR Code Creator"
                      ? setOpenQRCodeCreator(true)
                      : ""
                  }
                >
                  {tool.new && (
                    <div className="badge-overlay">
                      <span className="badge"> New </span>
                    </div>
                  )}

                  <div className={`img ${tool.image}`} />
                  <div className="name">{tool.name}</div>
                </a>
              ))}

              {/* <a className="item" href="https://pdf.io/compress/">
                <div className="img universe-pdf-compress" />
                <div className="name">Compress</div>
              </a>
              <a className="item" href="https://pdf.io/unlock/">
                <div className="img universe-pdf-unlock" />
                <div className="name">Unlock</div>
              </a>
              <a className="item" href="https://pdf.io/protect/">
                <div className="img universe-pdf-protect" />
                <div className="name">Protect</div>
              </a>
              <a className="item" href="https://pdf.io/rotate/">
                <div className="img universe-pdf-rotate" />
                <div className="name">Rotate</div>
              </a>
              <a className="item" href="https://pdf.io/page-numbers/">
                <div className="img universe-pdf-page-numbers" />
                <div className="name">Add Page Numbers</div>
              </a>
              <a className="item" href="https://pdf.io/pdf2doc/">
                <div className="img universe-pdf-pdf2doc" />
                <div className="name">PDF to Word</div>
              </a>
              <a className="item" href="https://pdf.io/pdf2xls/">
                <div className="img universe-pdf-pdf2xls" />
                <div className="name">PDF to Excel</div>
              </a>
              <a className="item" href="https://pdf.io/pdf2jpg/">
                <div className="img universe-pdf-pdf2jpg" />
                <div className="name">PDF to JPG</div>
              </a>
              <a className="item" href="https://pdf.io/pdf2png/">
                <div className="img universe-pdf-pdf2png" />
                <div className="name">PDF to PNG</div>
              </a>
              <a className="item" href="https://pdf.io/pdf2html/">
                <div className="img universe-pdf-pdf2html" />
                <div className="name">PDF to HTML</div>
              </a>
              <a className="item" href="https://pdf.io/doc2pdf/">
                <div className="img universe-pdf-doc2pdf" />
                <div className="name">Word to PDF</div>
              </a>
              <a className="item" href="https://pdf.io/jpg2pdf/">
                <div className="img universe-pdf-jpg2pdf" />
                <div className="name">JPG to PDF</div>
              </a>
              <a className="item" href="https://pdf.io/xls2pdf/">
                <div className="img universe-pdf-xls2pdf" />
                <div className="name">Excel to PDF</div>
              </a>
              <a className="item" href="https://pdf.io/ppt2pdf/">
                <div className="img universe-pdf-ppt2pdf" />
                <div className="name">PPT to PDF</div>
              </a>
              <a className="item" href="https://pdf.io/png2pdf/">
                <div className="img universe-pdf-png2pdf" />
                <div className="name">PNG to PDF</div>
              </a> */}
            </div>
          </div>
        </div>
      </div>
      {openNetworkModel && (
        <Network
          setOpenNetworkModel={setOpenNetworkModel}
          setCountNet={setCountNet}
          countNet={countNet}
        />
      )}
      {openTokenCreatorModel && (
        <TokenCreator
          setOpenTokenCreatorModel={setOpenTokenCreatorModel}
          setLoader={setLoader}
          PINATA_AIP_KEY={PINATA_AIP_KEY}
          PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
          address={address}
          createERC20={createERC20}
        />
      )}
      {openTokenBalace && (
        <TokenBalance
          setOpenTokenBalace={setOpenTokenBalace}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {openTokenExplore && (
        <TokenExplore
          setOpenTokenExplore={setOpenTokenExplore}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {openTokenTransfer && (
        <TokenTransfer
          setOpenTokenTransfer={setOpenTokenTransfer}
          TRANSFER_TOKEN={TRANSFER_TOKEN}
          ERC20={ERC20}
          setLoader={setLoader}
        />
      )}
      {openENSFinder && (
        <ENSFinder
          setOpenENSFinder={setOpenENSFinder}
          ENS_NAME={ENS_NAME}
          setLoader={setLoader}
        />
      )}
      {openontractABI && (
        <ContractABI
          setOpenontractABI={setOpenontractABI}
          GET_CONTRACT_ABI={GET_CONTRACT_ABI}
          setLoader={setLoader}
        />
      )}
      {openSolidityContract && (
        <SolidityContract
          setOpenSolidityContract={setOpenSolidityContract}
          GET_CONTRACT_SOURCE_CODE={GET_CONTRACT_SOURCE_CODE}
          setLoader={setLoader}
        />
      )}
      {openContractOwner && (
        <ContractOwner
          setOpenContractOwner={setOpenContractOwner}
          GET_CONTRACT_CREATOR={GET_CONTRACT_CREATOR}
          setLoader={setLoader}
        />
      )}
      {openEthereum && (
        <Ethereum
          setOpenEthereum={setOpenEthereum}
          ETHER_LATEST_PRICE={ETHER_LATEST_PRICE}
          setLoader={setLoader}
        />
      )}
      {openEthereunWalletGenerator && (
        <EthereumWalletGenerator
          setOpenEthereunWalletGenerator={setOpenEthereunWalletGenerator}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openAddToken && (
        <AddToken
          ERC20={ERC20}
          setOpenAddToken={setOpenAddToken}
          setLoader={setLoader}
          PINATA_AIP_KEY={PINATA_AIP_KEY}
          PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
          address={address}
          TRANSFER_ETHER={TRANSFER_ETHER}
          ADD_TOKEN_FEE={ADD_TOKEN_FEE}
          CREATOR_RECEIVER={CREATOR_RECEIVER}
        />
      )}
      {openICOCreator && (
        <ICOCreator
          ERC20={ERC20}
          setOpenICOCreator={setOpenICOCreator}
          setLoader={setLoader}
          ICO_CREATOR={ICO_CREATOR}
        />
      )}
      {openTransferEther && (
        <TransferEther
          ERC20={ERC20}
          setOpenTransferEther={setOpenTransferEther}
          setLoader={setLoader}
          CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}
          GET_BALANCE={GET_BALANCE}
          TRANSFER_ETHER={TRANSFER_ETHER}
        />
      )}
      {openTableModel && (
        <ICOMarketplace
          data={allICOLists}
          setOpenTableModel={setOpenTableModel}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openCreatedToken && (
        <CreatedToken
          setOpenCreatedToken={setOpenCreatedToken}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openLiqudityFinder && (
        <LiqudityFinder
          setOpenLiqudityFinder={setOpenLiqudityFinder}
          setLoader={setLoader}
          GET_POOL_ADDRESS={GET_POOL_ADDRESS}
          ERC20={ERC20}
        />
      )}
      {openAddNetwork && (
        <AddNetwork
          setOpenAddNetwork={setOpenAddNetwork}
          setLoader={setLoader}
          setCountNet={setCountNet}
          countNet={countNet}
        />
      )}
      {openQRCodeCreator && (
        <QRCodeCreator
          setOpenQRCodeCreator={setOpenQRCodeCreator}
          shortenAddress={shortenAddress}
        />
      )}
      {openContact && (
        <Contact setOpenContact={setOpenContact} setLoader={setLoader} />
      )}
      {openAddedMetaMass && (
        <MetaMassAdded
          setOpenAddedMetaMass={setOpenAddedMetaMass}
          shortenAddress={shortenAddress}
        />
      )}
      {openCreatedWallet && (
        <CreatedWallet
          setOpenCreatedWallet={setOpenCreatedWallet}
          shortenAddress={shortenAddress}
        />
      )}
      {openICOAddress && (
        <ICOAddress
          setOpenICOAddress={setOpenICOAddress}
          shortenAddress={shortenAddress}
          ICOContractAddress={ICOContractAddress}
        />
      )}
      {/* //SOLANA */}
      {openSolanaWallet && (
        <SolanaWallet
          setOpenSolanaWallet={setOpenSolanaWallet}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openSolanaNetwork && (
        <SolanaNetwork
          setOpenSolanaNetwork={setOpenSolanaNetwork}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openAirdrop && (
        <SolanaAirdrop
          setOpenAirdrop={setOpenAirdrop}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
        />
      )}
      {openSolanaTokenCreator && (
        <SolanaCreateToken
          setOpenSolanaTokenCreator={setOpenSolanaTokenCreator}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
          PINATA_AIP_KEY={PINATA_AIP_KEY}
          PINATA_SECRECT_KEY={PINATA_SECRECT_KEY}
          address={address}
          SOLANA_FEE={SOLANA_FEE}
          SOLANA_RECEIVER={SOLANA_RECEIVER}
        />
      )}
      {openSolTransfer && (
        <SolTransfer
          setOpenSolTransfer={setOpenSolTransfer}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
          address={address}
        />
      )}
      {/* //BITCOIN */}
      {openBitCoinWallet && (
        <BitCoinWallet
          setOpenBitCoinWallet={setOpenBitCoinWallet}
          setLoader={setLoader}
          shortenAddress={shortenAddress}
          address={address}
        />
      )}
      {loader && <Loader />}
      <Footer setOpenContact={setOpenContact} openContact={openContact} />
    </>
  );
};

export default profile;
