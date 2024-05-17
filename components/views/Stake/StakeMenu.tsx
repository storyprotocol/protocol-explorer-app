import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ValidatorOption {
    id: string;
    name: string;
    logoUrl: string;
}

export default function StakeMenu() {
    const validators = [
        { id: '1', name: 'Umbrella', staked: '1,498,593', commission: '5%', logoUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/78228988871f1652c33f52f5cf5b3505_200_200.jpg' },
        { id: '2', name: 'Inu X', staked: '1,129,234', commission: '5%', logoUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/8facb421c1599743ebc4185e180f5d05_200_200.jpeg' },
        { id: '3', name: 'Stargaze', staked: '1,023,429', commission: '5%', logoUrl: 'https://s3.amazonaws.com/keybase_processed_uploads/41793337d1699aeac5d93e2272583205_200_200.jpg' },
        { id: '4', name: 'Amplifier', staked: '982,593', commission: '7.5%', logoUrl: 'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/cosmos/moniker/cosmosvaloper1et77usu8q2hargvyusl4qzryev8x8t9wwqkxfs.png' },
        { id: '5', name: 'Swiss Staking', staked: '874,294', commission: '7.5%', logoUrl: 'https://assets.leapwallet.io/dashboard/images/misc/validator.svg' },
        { id: '6', name: 'Kek', staked: '745,492', commission: '10%', logoUrl: 'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/cosmos/moniker/cosmosvaloper1y0us8xvsvfvqkk9c6nt5cfyu5au5tww2ztve7q.png' },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ValidatorOption | null>(null);
    const [walletBalance, setWalletBalance] = useState("5.832");
    const [inputAmount, setinputAmount] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSelect = (option: ValidatorOption) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const maxButtonOnClick = () => {
        console.log('30 button clicked')
        setinputAmount("5.832");
    };

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        // Check if the value is a number (including decimal)
        if (!value || value.match(/^\d*\.?\d*$/)) {
            setinputAmount(value);
            // Check if the entered number is greater than balance

            if (parseFloat(value) > 5.832) {
                console.log('setting error 44: Amount exceeds current balance', )
                setErrorMessage('Amount exceeds current balance');
            } else {
                setErrorMessage('');
            }
        }
    };

    return (
        <div className="w-full flex justify-center flex-col items-center">
            <div className="flex flex-col w-full max-w-screen-sm justify-center items-center">
                <div className="w-full text-center mb-2 text-lg font-bold">
                    Stake Amount
                </div>
                <div className="w-full text-center text-slate-400 mb-8">
                    Enter the amount you'd like to stake with your chosen validator
                </div>
                <div className="w-full flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-2">
                        <div className="text-lg font-bold flex-1 mr-4">
                            Stake Amount
                        </div>
                        <button
                            onClick={maxButtonOnClick}
                            className="bg-blue-200 hover:bg-blue-300 text-blue-700 font-medium py-1 px-2 rounded-full transition duration-150 ease-in-out"
                        >
                            Max Amount
                        </button>
                    </div>
                    <Input type="text" placeholder="Enter stake amount" className="w-full mb-2"value={inputAmount} onChange={handleInputChange} />
                    <div className="w-full flex justify-between items-center mb-8">
                        <div className="text-red-400">
                            {errorMessage}
                        </div>
                        <div className="text-slate-400">
                            Available Balance: {walletBalance} IP
                        </div>
                    </div>
                    <div className="w-full flex flex-col mb-2">
                        <div className="text-lg font-bold mb-4">
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
                                                <div className="text-sm	text-slate-500">{option.staked} staked • {option.commission} commission</div>
                                            </div>
                                            
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 text-white py-2 px-4 rounded-full transition duration-150 ease-in-out pt-4 pb-4 font-medium text-medium">
                            Enter a valid amount
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
