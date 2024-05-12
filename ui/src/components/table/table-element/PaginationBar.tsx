import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {Table} from '@tanstack/table-core';
import {GroupingPath} from '@/groupings/GroupingsApiResults';
import { DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import {useState} from 'react';

interface PaginationProps {
    table: Table<GroupingPath>;
}

const PaginationBar = ({table}: PaginationProps) => {
    const [activePage, setActivePage] = useState(0);
    const startPage = Math.max(0, activePage - 2);
    let endPage = Math.min(table.getPageCount() - 1, startPage + 4);
    if (activePage == 0) {
        endPage = Math.min(table.getPageCount() - 1, 2);
    } else if (activePage == 1) {
        endPage = Math.min(table.getPageCount() - 1, 3);
    }
    //{activePage === i ? ' border-x bg-green-200 hover:bg-green-200 text-black' : ' border-x hover:bg-light-dark-3-4'}
    const paginationButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        paginationButtons.push(
            <PaginationItem className='border-x'>
                <PaginationLink
                    key={i}
                    className='rounded-none hover:bg-light-grey active:bg-pagination-hover border-transparent'
                    onClick={() => {table.setPageIndex(i);  setActivePage(i);}}
                    isActive={i == activePage}>
                    {i + 1}
                </PaginationLink>
            </PaginationItem>
        )
    }

    return (
        <Pagination className='flex justify-end pt-3 pb-3 text-green-blue'>
            <PaginationContent className='border rounded gap-0'>
                <PaginationItem key={'first'} className='hover:bg-light-grey'>
                    <PaginationLink key={'first'} onClick={() => {table.firstPage(); setActivePage(0);}}
                        className={!table.getCanPreviousPage() ? 'pointer-events-none cursor-not-allowed' : undefined}>
                        <DoubleArrowLeftIcon />
                        First
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem key={'prev'} className='border-l hover:bg-light-grey'>
                    <PaginationPrevious key={'prev'} onClick={() => {table.previousPage(); setActivePage(activePage - 1);}}
                        className={!table.getCanPreviousPage() ? 'pointer-events-none cursor-not-allowed' : undefined}>
                    </PaginationPrevious>
                </PaginationItem>
                {paginationButtons}
                <PaginationItem key={'next'} className='hover:bg-light-grey'>
                    <PaginationNext key={'next'} onClick={() => {table.nextPage(); setActivePage(activePage + 1);}}
                        className={!table.getCanNextPage() ? 'pointer-events-none' : undefined}/>
                </PaginationItem>
                <PaginationItem key={'last'} className='px-2 border-l hover:bg-light-grey'>
                    <PaginationLink key={'last'} onClick={() => {table.lastPage(); setActivePage(table.getPageCount() -1);}}
                        className={!table.getCanNextPage() ? 'pointer-events-none cursor-not-allowed' : undefined}>
                        <span className='pr-1'>Last</span>
                        <DoubleArrowRightIcon className=''/>
                    </PaginationLink>
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    );

};

export default PaginationBar;
