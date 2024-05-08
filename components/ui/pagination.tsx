'use client';
import Link from "next/link";
import { Button } from "./button";

interface PaginationProps {
    currentPage: number;
    path: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, path }) => {
    return (
        <div className="flex justify-end space-x-1">
            {
                currentPage === 1
                    ? <Button disabled variant='outline'>Previous</Button>
                    : <Link href={`${path}?page=${currentPage - 1}`}>
                        <Button variant='outline'>Previous</Button>
                    </Link>
            }
            <Link href={`${path}?page=${currentPage + 1}`}><Button variant='outline'>Next</Button></Link>
        </div>
    );
};

export default Pagination;