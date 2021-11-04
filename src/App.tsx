import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import './App.css'
import WavePortal from "./utils/WavePortal.json";
import GradientTitle from "./common/GradientTitle";
import Button from "./common/Button";
import Input from './common/Input';

declare let window: any;

enum SubmitStatus {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR,
}

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState<any[]>([]);
  const [userMessage, setUserMessage] = useState("")
  const [submitStatus, setSubmitStatus] = useState(SubmitStatus.IDLE);

  const contractAddress = "0x040f161c8947521508419e64Fb60181f5164c1A9";
  const contractABI = WavePortal.abi;
  const isLoading = submitStatus === SubmitStatus.LOADING
  const hasError = submitStatus === SubmitStatus.ERROR

  async function getAllWaves() {
    const { ethereum } = window;

    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned: any[] = [];
        waves.forEach((wave: any) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned);

        wavePortalContract.on("NewWave", (from, timestamp, message) => {
          console.log("NewWave", from, timestamp, message);

          setAllWaves(prevState => [...prevState, {
            address: from,
            timestamp: new Date(timestamp * 1000),
            message: message
          }]);
        });
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function checkIfWalletIsConnected() {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getAllWaves()
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function connectWallet() {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      getAllWaves()
    } catch (error) {
      console.log(error);
    }
  }

  async function wave() {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const waveportalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const waveTxn = await waveportalContract.wave(userMessage, { gasLimit: 300000 });
        console.log("Mining...", waveTxn.hash);
        setSubmitStatus(SubmitStatus.LOADING)

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        setSubmitStatus(SubmitStatus.IDLE)
        setUserMessage("")

        let count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
        getAllWaves();
      } else {
        console.log("Ethereum object doesn't exist!");
        setSubmitStatus(SubmitStatus.ERROR)
      }
    } catch (error) {
      console.log(error);
      setSubmitStatus(SubmitStatus.ERROR)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className={`flex flex-col items-center px-6 py-16 ${submitStatus === SubmitStatus.LOADING ? "cursor-wait" : ""}`}>
      <div className="max-w-md w-full px-100 justify-center flex flex-col">
        <GradientTitle
          style={`text-center py-10`}
          size="big"
          titles={["👋 Hey! Welcome to my Beautiful Math"]}
        />
        <div className="inline-flex text-center items-center py-6">
          I am Francis! I am curious and I love math. My favorite conjecture is
          the collatz conjecture (3n + 1 conjecture), its representation is quite a sight! Connect
          your wallet and send me your best equation!
        </div>
        <Input
          id="description"
          inputStyle="h-full"
          isMultiligne={true}
          label={
            "Write your love letter to Math ❤️"
          }
          onChange={setUserMessage}
          placeholder="Pythagorean theorem: a²+ b² = c²"
          style="my-5 flex-auto"
          text={userMessage}
          type="text"
        />
        <Button
          onClick={wave}
          isDisabled={isLoading}
          style={`mt-6`}
          type="submit"
          value="Wave at Me"
        />
        {isLoading && (
          <div className="inline-flex justify-center italic py-2 text-gray-600">🧐 Solving your equation ...</div>
        )}
        {hasError && (
          <div className="inline-flex justify-center italic py-2 text-red-600">This equation was to hard to mine...<br/>Try again later, we'll gathering because math guys!</div>
        )}
        {!currentAccount && (
          <Button
            onClick={connectWallet}
            style={`mt-6`}
            type="submit"
            value="Connect Wallet"
          />
        )}
        {allWaves.length > 0 && (
        <div className="rounded-lg shadow-lg border mt-7 h-600">
          <div className="relative">
            <div className="flex flex-row items-center justify-center border-b h-100">
              <GradientTitle
                style="text-center"
                size="small"
                titles={["Beautiful Messages!"]}
              />
            </div>
            <div className="p-3 overflow-auto h-500">
              {allWaves.map((wave, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-lg shadow-lg mt-8 border flex flex-col text-sm"
                  >
                    <div className="flex px-3 py-4 hover:background-gradient">Address: {wave.address}</div>
                    <div className="flex px-3 py-4 hover:background-gradient">Time: {wave.timestamp.toString()}</div>
                    <div className="flex px-3 py-4 hover:background-gradient">Message: {wave.message}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        )} 
      </div>
    </div>
  );
}
