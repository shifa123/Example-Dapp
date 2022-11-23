import { Loader } from ".";
import React, { useEffect, UseEffect, useState, UseState} from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const MintContext = React.createContext();

const { ethereum } = window;


const Navbar = () => {

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

    return(
        <nav className="navbar w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
            {/* <img src={eth} alt="logo" className="w-32 cursor-pointer}" /> */}
            <h2 className="text-4xl">Dapp</h2>
        </div>

        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center p-4">
            <li className="">
                {/* {!currentAccount && (<button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center bg-[#6d0909] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#fffedc] hover:text-red-800">
                        <p className="text-white text-base font-semibold">Connect Wallet</p>
                    </button>)} */}
            </li>
        </ul>
    </nav>
    )
}

export default Navbar;