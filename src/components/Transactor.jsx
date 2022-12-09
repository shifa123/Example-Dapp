import { Loader } from ".";
import React, { useEffect, UseEffect, useState, UseState} from 'react';
import { ethers } from 'ethers';
import eth from '../etherum.png'

import { contractABI, contractAddress } from '../utils/constants';

export const MintContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const mintContract = new ethers.Contract(contractAddress, contractABI, signer);

    return mintContract;
}


const Input = ({ placeholder , name ,type , value , handleChange }) => (
    <input 
      placeholder={placeholder} 
      type={type} 
      step="0.0001" 
      value={value}
      onChange={(e) => handleChange(e, name)} 
      className="my-2 w-full rounded-sm p-2 outline-none text-black border tex-sm white-glassmorphism"/>
);

const Transactor = () => {

    const [formData, setFormData] = useState({addressTo: '', amount: ''});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]:e.target.value }));
    }


    const [currentAccount , setCurrentAccount] = useState('');

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask");

            const accounts = await ethereum.request({ method : 'eth_requestAccounts'});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            
            throw new Error("No Ethereum Object")
        }

    }


    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please Install MetaMask");

            const { address, amount } = formData;
            const mintContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            const transactionHash = await ethereum.request({ 
                method: 'eth_sendTransaction',
                params:[{
                    from: currentAccount,
                    to: address,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex, //0.00001
                    data: ''
                }]
            });

            console.log(transactionHash);

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
    
    const handleSubmit = (e) => {

        e.preventDefault();

        

        console.log("Here")

        sendTransaction();

        
    }

    return(
        <div className="w-full overflow-hidden md:justify-center justify-between items-">
            <div className="flex  items-start justify-between md:p-20 py-12 px-4">
                <div className="flex-1  mx-15 ml-10 mr-20 pl-10 justify-start items-start">
                    {/* <img src={blue_cap} alt="" className="cap-img" /> */}
                    <h1 className="text-3xl sm:text-5xl text-black py-1" style={{color: "white"}}>
                        Send Tokens
                    </h1>
                    
                    <img src={eth} alt="" className="eth-img" />
                    
                </div>
                <div className="box flex-1 white-glassmorphism mx-15 mr-10 py-5 px-10 ml-20 justify-end items-end">
                    <h3 className="text-1xl sm:text-5xl text-black py-1" style={{color: "white"}}>
                        Add Information
                    </h3>
                    <Input placeholder="Address" name="address" type="text" handleChange={ handleChange } className='wallet-color'/>
                    <Input placeholder="Amount" name="amount" type="text" handleChange={ handleChange } className='wallet-color'/>

                    <div className='justify-center wallet'>
                        {!currentAccount && (<button type="button" onClick={connectWallet} id="button-connect" className="ml-20 wallet-color py-2 px-7 rounded-full cursor-pointer hover:bg-[#fffedc] hover:text-red-800">
                            <p className="text-white text-base font-semibold ">Connect Wallet</p>
                        </button>)}
                    </div>

                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button
                        type="button"
                        onClick={handleSubmit}
                        className="wallet-color text-white font-semibold w-full mt-2 mb-3 p-2 rounded-full cursor-pointer">
                            Send Ether!
                        </button>
                    )}
                    </div>
                </div>
                
            
        </div>
    )
}

export default Transactor;