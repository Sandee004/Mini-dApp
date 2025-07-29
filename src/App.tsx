import { useState } from "react";
import Web3 from "web3";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum?: any;
    web3?: Web3;
  }
}

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error("Wallet connection error:", error);
        alert("Looks like you declined the connection request.");
      }
    } else {
      alert("MetaMask isn't detected. Please install it to connect!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    alert("Wallet disconnected."); // Optional: provide feedback to the user
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to our Zapier!</h1>
        <p className="text-gray-600 mb-6">
          Ready to dive in? Connect your crypto wallet to get started.
        </p>
        {walletAddress ? (
          <>
            <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded-md break-all text-sm font-medium mb-4">
              {" "}
              <p className="mb-1">Wallet Connected!</p>
              <span className="block text-lg font-semibold tracking-wide">
                {walletAddress}
              </span>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out text-sm"
            >
              Disconnect Wallet
            </button>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Connect Your Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
