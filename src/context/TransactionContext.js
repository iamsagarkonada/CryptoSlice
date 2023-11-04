import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';
import TransactionPopup from '../components/TransactionPopup';

export const TransactionContext = React.createContext();
const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract;
}
export const TransactionProvider = ({ children }) => {
    const [currentAccount, setcurrentAccount] = useState('');
    const [formData, setFormData] = useState({ address: '', amount: '', keyword: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [loadingMessage, setLoadingMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }
    const checkIfWalletIsConnect = async () => {
        try {
          if (!ethereum) return alert("Please install MetaMask.");
    
          const accounts = await ethereum.request({ method: "eth_accounts" });
    
          if (accounts.length) {
            setcurrentAccount(accounts[0]);
            //getAllTransactions();
          } else {
            console.log("No accounts found");
          }
        } catch (error) {
          console.log(error);
        }
      };
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts", });

            setcurrentAccount(accounts[0]);
            //window.location.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask");

            //form data
            const { addressTo, amount, keyword, message } = formData;
            const transactionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }],
            });

            const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            setLoadingMessage(`Loading - ${transactionHash.hash}`);
            setIsPopupOpen(true);
            await transactionHash.wait();
            setIsPopupOpen(false);
            setLoadingMessage(`Success - ${transactionHash.hash}`);
            setIsPopupOpen(true)
            setIsLoading(false);
            const transactionsCount = await transactionsContract.getTransactionCount();

            setTransactionCount(transactionsCount.toNumber());
        } catch (error) {
            console.log(error);
            //throw new Error("No Ethereum Object")

        }
    }

    useEffect(() => {
        checkIfWalletIsConnect();
    }, [])

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData,isLoading, handleChange, sendTransaction ,loadingMessage,isPopupOpen,closePopup}}>
            {children}
            {/*<TransactionPopup isOpen={isPopupOpen} message={loadingMessage || successMessage} onClose={closePopup} />*/}
        </TransactionContext.Provider>
    )
    }