import React, { useEffect, UseEffect, useState, UseState} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const MintContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const mintContract = new ethers.Contract(contractAddress, contractABI, signer);

    return mintContract;
}

export const MintProvider = ({ children }) => {
    const [currentAccount , setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({addressTo: '', ipfsUri: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [mints, setMint] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]:e.target.value }));
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask");
            
            const { studentAddress, ipfsUri} = formData;
            const mintContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({ 
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: studentAddress,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex //0.00001
                }]
            });

            const transactionHash = await mintContract.mintStudentToken(studentAddress, ipfsUri);
            setIsLoading(true);
            console.log(`Loading - ${transactionHash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash}`);


        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum Object")
        }
    }

    return (
        <MintContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isLoading }}>
            {children}
        </MintContext.Provider>
    )


}