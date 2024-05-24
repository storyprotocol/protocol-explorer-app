import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import StakeButton from "./StakeButton"
import { useReadContract, useWriteContract, useAccount, useBalance, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { formatEther, parseEther, Hex, Abi } from 'viem';
import { z } from 'zod'

let decimalTruncatingRegex = /^-?\d+(?:\.\d{0,6})?/;
let validStakeAmountRegex = /^\d*\.?\d*$/;
let validDecimalRegex = /^[-]?(\d+\.?\d*|\.\d+)$/;
const abi: Abi = [
    {
        "inputs": [],
        "name": "InvalidDelegateAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "StakeAmountTooHigh",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "StakeAmountTooLow",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UnstakeAmountTooHigh",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "UnstakeTransferFailed",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "addressFrom",
                "type": "address"
            },
            {
                "indexed": false,
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
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
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
                "indexed": false,
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
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "amountStaked",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
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
    }
]

const createFormSchema = (walletBalance: number) => z.object({
    inputAmount: z.number()
        .max(walletBalance, `Input amount must be less than or equal to ${walletBalance}`),
});

interface ValidatorOption {
    id: string;
    name: string;
    staked: string;
    commission: string;
    logoUrl: string;
    contractAddress: string;
}

interface ReadContractResult {
    data: bigint | undefined;
}

// export default function StakeMenu({ stakingMode = 'staking' }: StakeMenuProps) {
export default function StakeMenu() {
    let initialValidators = [
        { id: '1', name: 'Umbrella', staked: '1,498,593', commission: '5%', logoUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/78228988871f1652c33f52f5cf5b3505_200_200.jpg', contractAddress: "7BaF78Fe68afE9F06cCEEcAc82A43Ec641B552f5" },
        { id: '2', name: 'Inu X', staked: '1,129,234', commission: '5%', logoUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/8facb421c1599743ebc4185e180f5d05_200_200.jpeg', contractAddress: "F33E8283279FCA6e92011B1c376Fd2d0aAf005f2" },
        { id: '3', name: 'Stargaze', staked: '1,023,429', commission: '5%', logoUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/41793337d1699aeac5d93e2272583205_200_200.jpg', contractAddress: "cE82C6831C10425E9aECEA77E66cB29a0bC1B182" }
    ];

    const [stakingMode, setStakingMode] = useState('staking');
    const [validators, setValidators] = useState(initialValidators);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ValidatorOption>(validators[0]);
    const { writeContractAsync, isPending: isWaitingForWalletConfirmation } = useWriteContract()
    const [inputAmount, setInputAmount] = useState("");
    const [stakeButtonText, setStakeButtonText] = useState("Stake");
    const [stakeButtonStatusMessage, setStakeButtonStatusMessage] = useState("");
    const [stakeButtonDisabled, setStakeButtonDisabled] = useState(false);
    const [txHash, setTxHash] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const { address } = useAccount();
    const balance = useBalance({
        address: address,
    })
    const account = useAccount()

    const { data: receipt, isError, isLoading, status } = useWaitForTransactionReceipt({
        hash: `${txHash}` as Hex,
    });

    useWatchContractEvent({
        address: '0x7BaF78Fe68afE9F06cCEEcAc82A43Ec641B552f5',
        abi,
        eventName: 'Stake',
        onLogs(logs) {
            console.log('223 stake: ', logs)
          refetchReadStaked();
        },
    })

    useWatchContractEvent({
        address: '0x7BaF78Fe68afE9F06cCEEcAc82A43Ec641B552f5',
        abi,
        eventName: 'Unstake',
        onLogs(logs) {
            console.log('233 unstake: ', logs)
          refetchReadStaked();
        },
    })

    useEffect(() => {
        if (isLoading) {
            console.log('Transaction is loading...');
            setStakeButtonStatusMessage("Transaction is loading...");
        } else {
            console.log('Loading complete.');
            setStakeButtonStatusMessage("Loading complete.");
        }
    }, [isLoading]);

    useEffect(() => {
        if (isError) {
            console.error('An error occurred with the transaction.');
            setStakeButtonStatusMessage("Error: " + status);
        }
    }, [isError]);

    useEffect(() => {
        console.log('Transaction status:', status);
        setStakeButtonStatusMessage("Status: " + status);
    }, [status]);

    const { data, refetch: refetchReadStaked } = useReadContract({
        abi,
        address: `0x${validators[0].contractAddress}`,
        args: [address],
        functionName: 'amountStaked',
    });

    console.log('200 validator data: ', data);
    let formattedEther;

    try {
        if (balance.data?.value != undefined) {
            formattedEther = formatEther(balance.data.value);
            formattedEther = formattedEther.match(decimalTruncatingRegex)?.[0];
        } else {
            formattedEther = 0;
        }
    } catch (e) {
        formattedEther = 0;
    }

    const [walletBalance, setWalletBalance] = useState(formattedEther);

    const handleSelect = (option: ValidatorOption) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        if (balance.data?.value != undefined) {
            let formattedEther = formatEther(balance.data.value);
            const truncatedString = formattedEther.match(decimalTruncatingRegex)?.[0] || "";
            setWalletBalance(truncatedString);
        }
    }, [balance]);
    
    console.log('39 useEffect account: ', account.address);

    const maxButtonOnClick = () => {
        setStakeButtonDisabled(false);
        if (stakingMode === 'staking') {
            setInputAmount(walletBalance?.toString() || "");
        } else {
            setInputAmount(formatEther(data as bigint));
        }
    };

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        setIsSuccess(false);
        if (!value || value.match(validStakeAmountRegex)) {
            setInputAmount(value);
            if (stakingMode == "staking") {
                if (parseFloat(value) > parseFloat(walletBalance as string)) {
                    setStakeButtonText("Enter a valid amount");
                    console.log('setting error 44: Amount exceeds current balance',)
                    setErrorMessage('Amount exceeds current balance');
                    setStakeButtonDisabled(true);
                } else {
                    setStakeButtonText("Stake");
                    setErrorMessage('');
                    setStakeButtonDisabled(false);
                }
            } else {
                if (parseFloat(value) > parseFloat(formatEther(data as bigint) as string)) {
                    setStakeButtonText("Enter a valid amount");
                    console.log('setting error 52: Amount exceeds current balance',)
                    setErrorMessage('Amount exceeds current balance');
                    setStakeButtonDisabled(true);
                } else {
                    setStakeButtonText("Unstake");
                    setErrorMessage('');
                    setStakeButtonDisabled(false);
                }

            }
        }
    }

    const stakeButtonOnClick = async () => {
        if (stakingMode === 'staking') {
            const formSchema = createFormSchema(walletBalance as number);
            try {
                formSchema.parse({
                    inputAmount: Number(inputAmount)
                });
                console.log("Form is valid!");
                if (selectedOption) {
                    const txhash = await writeContractAsync({
                        address: `0x${selectedOption.contractAddress}`,
                        abi,
                        functionName: 'stake',
                        value: BigInt(parseEther(inputAmount)),
                        args: [address]
                    });
                    setTxHash(txhash);
                    setIsSuccess(true);
                    refetchReadStaked();
                    console.log('338 refetchStakeCalled');
                }
                console.log('168 - result: ', { txHash, receipt, isError, isLoading, status });
            } catch (error) {
                if (error instanceof z.ZodError) {
                    console.log(error.flatten().fieldErrors);
                    const errorDetails = JSON.stringify(error.flatten().fieldErrors);
                    setStakeButtonText("Enter a valid amount");
                    setStakeButtonDisabled(true);
                    setErrorMessage(errorDetails);
                    setIsSuccess(false);
                }
            }
        } else {
            const formSchema = createFormSchema(walletBalance as number);
            try {
                formSchema.parse({
                    inputAmount: Number(inputAmount)
                });
                console.log("Form is valid!");
                if (validDecimalRegex.test(inputAmount)) {
                    if (selectedOption) {
                        const txhash = await writeContractAsync({
                            address: `0x${selectedOption.contractAddress}`,
                            abi,
                            functionName: 'unstake',
                            args: [BigInt(parseEther(inputAmount))]
                        });
                        setTxHash(txhash);
                        setIsSuccess(true);
                        refetchReadStaked();
                        console.log('369 refetchStakeCalled');
                    }
                    console.log('191 - result: ', { txHash, receipt, isError, isLoading, status });
                } else {
                    setStakeButtonText("Enter a valid amount");
                    setErrorMessage('Invalid amount');
                    setIsSuccess(false);
                }
            } catch (error) {
                console.log('368: ', error);
                if (error instanceof z.ZodError) {
                    console.error(error.flatten().fieldErrors);
                    setStakeButtonText("Enter a valid amount");
                    setErrorMessage(error.flatten().fieldErrors as unknown as string);
                    setIsSuccess(false);
                }
            }
        }
    }

    const stakeOptionButtonOnClick = async (option: ValidatorOption) => {
        setStakingMode('staking');
        setStakeButtonText('Stake');
        setSelectedOption(option);
        setIsSuccess(false);
    }

    const unstakeOptionButtonOnClick = async (option: ValidatorOption) => {
        setStakingMode('unstaking');
        setStakeButtonText('Unstake');
        setSelectedOption(option);
        setIsSuccess(false);
    }

    return (
        <div className="w-full flex justify-center flex-col items-center">
            <div className="flex flex-col w-full max-w-screen-sm justify-center items-center">
                <div className="w-full text-center mb-2 text-xl font-bold">
                    {stakingMode == "staking" ? "Stake Amount" : "Unstake Amount"}
                </div>
                <div className="w-full text-center text-slate-400 mb-8">
                    Enter the amount you'd like to {stakingMode == "staking" ? "stake" : "unstake"} with your chosen validator
                </div>
                <div className="w-full flex flex-col items-center mb-4 p-5 bg-white rounded-lg border bg-card text-card-foreground shadow-sm ">
                    <div className="w-full flex justify-between items-center mb-2">
                        <div className="text-lg font-bold flex-1 mr-4">
                            {stakingMode == "staking" ? "Stake Amount" : "Unstake Amount"}
                        </div>
                        <button
                            onClick={maxButtonOnClick}
                            className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-medium py-1 px-2 rounded-full transition duration-150 ease-in-out"
                        >
                            Max Amount
                        </button>
                    </div>
                    <Input type="text" placeholder="Enter stake amount" className="w-full mb-2" value={inputAmount} onChange={handleInputChange} />
                    <div className="w-full flex justify-between items-center mb-8">
                        <div className="text-red-400">
                            {errorMessage}
                        </div>
                        <div className="text-slate-400">
                            {data && stakingMode === "staking" ? `Available to Stake: ${walletBalance}` : `Available to Unstake: ${(data != undefined ? formatEther(data as bigint) : "0.0")}`} IP
                        </div>
                    </div>
                    <div className="w-full flex flex-col mb-2">
                        <div className="text-lg font-bold mb-2">
                            Validator
                        </div>
                        <div className="relative w-full mb-8">
                            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded shadow bg-white">
                                {selectedOption ? (
                                    <>
                                        <img src={selectedOption.logoUrl} alt={selectedOption.name} className="w-8 h-8 mr-2 rounded-full" />
                                        <span className="flex-1 text-left">{selectedOption.name}</span>
                                    </>
                                ) : 'Select a validator'}
                                <span className="ml-auto">{isOpen ? '▲' : '▼'}</span>
                            </button>
                            {isOpen && (
                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1">
                                    {validators.map(option => (
                                        <li key={option.id} onClick={() => handleSelect(option)} className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 w-full">
                                            <img src={option.logoUrl} alt={option.name} className="w-8 h-8 mr-2 rounded-full" />
                                            <div className="flex flex-col">
                                                <div>{option.name}</div>
                                                <div className="text-sm	text-slate-500">{(data != undefined ? formatEther(data as bigint) : "0.0")} IP staked</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <StakeButton stakeButtonDisabled={stakeButtonDisabled} isError={isError} isLoading={isLoading} isSuccess={isSuccess} stakeButtonText={stakeButtonText} stakeButtonStatusMessage={stakeButtonStatusMessage} buttonOnClick={stakeButtonOnClick} />
                    </div>
                </div>
                <div className="w-full flex justify-center flex-col items-center mb-8 p-5 bg-white rounded-lg border bg-card text-card-foreground shadow-sm ">
                    <div className="w-full text-center mb-4 text-xl font-bold">
                        Your Staked Tokens
                    </div>
                    <ul className="w-full flex justify-center flex-col items-center">
                        {validators.map(option => (
                            <li key={option.id} className="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100 w-full">
                                <div className="flex justify-center items-center">
                                    <img src={option.logoUrl} alt={option.name} className="w-8 h-8 mr-2 rounded-full" />
                                    <div className="flex flex-col">
                                        <div>{option.name}</div>
                                        <div className="text-sm	text-slate-500">{(data != undefined ? formatEther(data as bigint) : "0.0")} IP staked</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div onClick={() => stakeOptionButtonOnClick(option)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        Stake
                                    </div>
                                    <div onClick={() => unstakeOptionButtonOnClick(option)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Unstake
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}