'use state';

import { FC } from 'react';
import { useState, useEffect } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};


const StakingCalculatorCard: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    let rewardRate = 15;
    const [amount, setAmount] = useState(10000);
  const [time, setTime] = useState(1);
  const [rewards, setRewards] = useState((amount * rewardRate / 100).toFixed(2));

  useEffect(() => {
    const newRewards = ((amount * rewardRate / 100) * time).toFixed(2);
    setRewards(newRewards);
}, [amount, time]);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(e.target.value);
    setAmount(newAmount);
    setRewards((newAmount * rewardRate / 100).toFixed(2));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setTime(newTime);
    const newRewards = rewardRate * amount * newTime / 100;
    setRewards(newRewards.toFixed(2));
  };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white p-6 shadow rounded-lg">
      <div className="text-3xl font-semibold mb-4">Reward Rate {rewardRate} %</div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter Staking Amount
        </label>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Staking Time
        </label>
        <input
          type="range"
          min="1"
          max="60"
          value={time}
          onChange={handleTimeChange}
          className="slider"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Rewards after {time}mo
        </label>
        <div className="p-4 bg-gray-100 rounded">${rewards}</div>
      </div>
    </div>
        </div>
    );
};

export default StakingCalculatorCard;
