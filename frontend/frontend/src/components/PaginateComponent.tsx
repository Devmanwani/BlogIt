import React from 'react';

interface PaginationProps {
    currentPage: number;
    paginate: (pageNumber: number) => void;
    totalPages: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({ currentPage, paginate, totalPages }) => {
    return (
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    className={`px-2 mb-1 border mt-1 ${index + 1 === currentPage ? 'bg-blue-500 text-white font-bold' : ''}`}
                    key={index}
                    onClick={() => paginate(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default PaginationComponent;
