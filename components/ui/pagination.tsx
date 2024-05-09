'use client';
import Link from "next/link";
import { Button } from "./button";

interface PaginationProps {
    currentPage: number;
    path: string;
    disableNextBtn?: boolean
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, path, disableNextBtn = false }) => {
    return (
        <div className="flex justify-end space-x-1 mt-2">
            {
                currentPage === 1
                    ? <Button disabled variant='outline'>Previous</Button>
                    : <Link href={`${path}?page=${currentPage - 1}`}>
                        <Button variant='outline'>Previous</Button>
                    </Link>
            }
            {
                disableNextBtn
                    ? <Button disabled variant='outline'>Next</Button>
                    : <Link href={`${path}?page=${currentPage + 1}`}>
                        <Button variant='outline'>Next</Button>
                    </Link>
            }
        </div>
    );
};

export default Pagination;