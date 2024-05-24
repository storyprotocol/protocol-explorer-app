import React from 'react';

interface StakeMenuProps {
    stakeButtonDisabled: boolean;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    stakeButtonText?: string; // Made optional with default value in destructure
    stakeButtonStatusMessage: string;
    buttonOnClick: () => void;
}

const LoadingSpinner = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className} // Correctly passed the className prop to the svg element
    >
        <circle cx="12" cy="12" r="10" stroke="none" />
        <path d="M22 12A10 10 0 0 0 2 12" />
        <path d="M12 2a10 10 0 0 1 0 20" />
    </svg>
);

const SuccessIndicator = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className} // className prop is passed to the svg element
    >
        <circle cx="12" cy="12" r="10" /> {/* Circle outline */}
        <path d="M8 12l2 2 4-4"/> {/* Checkmark */}
    </svg>
);

export default function StakeMenu({
    stakeButtonDisabled = false,
    isError = false,
    isLoading = false,
    isSuccess = false,
    stakeButtonText = "Stake", // Default value set here
    stakeButtonStatusMessage = "",
    buttonOnClick
}: StakeMenuProps) {
    return (
        <>
            <button
                className={`flex justify-center items-center w-full font-bold py-2 px-4 rounded text-white ${isError ? 'bg-red-500 hover:bg-red-700' : 'bg-sp-purple hover:bg-sp-purple-dark'
                    }`}
                onClick={buttonOnClick}
                disabled={isError || isLoading || stakeButtonDisabled}
            >
                {isLoading ? <LoadingSpinner className="animate-spin" /> : isError ? 'Error' : isSuccess ? <SuccessIndicator className="" /> : stakeButtonText}
            </button>

            <div className="text-red-500">
                {(isError ? stakeButtonStatusMessage : "")}
            </div>
        </>
    );
}
