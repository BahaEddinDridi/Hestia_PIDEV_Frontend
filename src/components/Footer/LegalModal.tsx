import React, { useEffect } from 'react';

const LegalModal = ({ closeModal, title, content }: { closeModal: () => void, title: string, content: string }) => {
    useEffect(() => {
        // Function to handle clicks outside the modal
        const handleClickOutside = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest('.modal-content')) {
            closeModal(); // Close the modal if click is outside the modal content
            }
        };

        // Add event listener when component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeModal]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-96 relative">
                <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    );
};

export default LegalModal;
