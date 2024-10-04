import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//IMPORT
import Button from "./Ethereum/Button";

const Header = ({
  connectWallet,
  address,
  shortenAddress,
  accountBalance,
  setOpenContact,
  openContact,
  setAddress,
}) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setIsMetaMaskInstalled(true);

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, [address]);

  const handleAccountsChanged = (accounts) => {
    console.log("Accounts changed:", accounts[0]);
    setAddress(accounts[0]);
  };
  const router = useRouter();
  return (
    <header class="header">
      <nav>
        <div class="logo">
          <a href="/">
            MEMEPUMP.<span>net</span>
          </a>
        </div>
        <input type="checkbox" id="menu-toggle" />
        <label for="menu-toggle" class="menu-icon">
          &#9776;
        </label>
        <ul class="menu">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#solana">Solana</a>
          </li>
          <li>
            <a href="#bitcon">Bitcoin</a>
          </li>
          <li>
            <a href="/pricing">Pricing</a>
          </li>
          <li>
            <a
              onClick={() =>
                openContact ? setOpenContact(false) : setOpenContact(true)
              }
            >
              Contact
            </a>
          </li>
          {address ? (
            <li>
              <Button
                name={`${shortenAddress(address)} `}
                handleClick={() => router.push(`/profile`)}
              />
            </li>
          ) : (
            <li>
              <Button handleClick={connectWallet} name="Connect Wallet" />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
