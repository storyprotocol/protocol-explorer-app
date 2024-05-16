import { FC } from 'react';
import StakingCalculatorCard from '@/components/cards/StakingCalculatorCard';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return <StakingCalculatorCard/>;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-lg font-semibold"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
