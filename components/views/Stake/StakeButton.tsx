import React, { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { Hex } from 'viem'

const contractAddress = "0x7BaF78Fe68afE9F06cCEEcAc82A43Ec641B552f5";
const abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "staker",
                "type": "address"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "amountToUnstake",
                "type": "uint64"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addressFrom",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "addressTo",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "amountToDelegate",
                "type": "uint64"
            }
        ],
        "name": "delegate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountStaked",
                "type": "uint256"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "unstaker",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountUnstaked",
                "type": "uint256"
            }
        ],
        "name": "Unstaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "addressFrom",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "addressTo",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "amountToDelegate",
                "type": "uint64"
            }
        ],
        "name": "Delegated",
        "type": "event"
    }
]

export default function StakeButton() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract()

    const [txHash, setTxHash] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const { data: receipt, isError, isLoading, status } = useWaitForTransactionReceipt({
        hash: `${txHash}` as Hex,
    });

    useEffect(() => {
        if (isLoading) {
            console.log('Transaction is loading...');
            setStatusMessage("Transaction is loading...");
        } else {
            console.log('Loading complete.');
            setStatusMessage("Loading complete.");
        }
    }, [isLoading]); 

    useEffect(() => {
        if (isError) {
            console.error('An error occurred with the transaction.');
            setStatusMessage("Error: " + status);
        }
    }, [isError]);

    useEffect(() => {
        console.log('Transaction status:', status);
        setStatusMessage("Status: " + status);
    }, [status]); 

    const { data } = useReadContract({
        abi,
        address: contractAddress,
        args: [address],
        functionName: 'amountStaked',
    })

    const handleOnClick = async () => {
        console.log('205: Stake button clicked, staked balance:', address);
        const txhash = await writeContractAsync({
            address: contractAddress,
            abi,
            functionName: 'stake',
            value: BigInt(20000000000000000),
            args: [address]
        });
        setTxHash(txhash);
        console.log('168 - result: ', {txHash, receipt, isError, isLoading, status});
    };

    const handleOnClickUnstake = async () => {

        const stakedBalance = data;
        console.log('205: Unstake button clicked, staked balance:', address);
        //For args array index 0, it's the pubkey not the amount/value
        //Value is how much you want to stake, in wei
        const txhash = await writeContractAsync({
            address: contractAddress,
            abi,
            functionName: 'unstake',
            args: [BigInt(20000000000000000)]
        });
        setTxHash(txhash);
        console.log('191 - result: ', {txHash, receipt, isError, isLoading, status});
    }

    return (
        <>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOnClick}
            >
                Stake / Unstake
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleOnClickUnstake}
            >
                Unstake
            </button>
            <div className="">
                {statusMessage}
            </div>
        </>

    );
}