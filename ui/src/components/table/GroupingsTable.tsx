'use client'

import GlobalFilter from '@/components/table/table-element/GlobalFilter';
import ColumnSettings from '@/components/table/table-element/ColumnSettings';
import {Table, TableHeader, TableHead, TableRow, TableBody, TableCell} from '@/components/ui/table';
import GroupingsTableHeaders from '@/components/table/table-element/GroupingsTableHeaders';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import {GroupingPath} from '@/groupings/GroupingsApiResults';
import SortArrow from '@/components/table/table-element/SortArrow';
import PaginationBar from '@/components/table/table-element/PaginationBar';
import {useState} from 'react';
import {Pencil2Icon} from '@radix-ui/react-icons'
import GroupingPathComponent from '@/components/table/table-element/GroupingPathComponent';
interface GroupingTableProps {
    data: GroupingPath[];
}

const GroupingsTable = ({data}: GroupingTableProps) => {
    const [globalFilter, setGlobalFilter] = useState('')
    const [sorting, setSorting] = useState<SortingState>([])

    // custom hook, tanstack table
    const tableInstance = useReactTable({
        columns: GroupingsTableHeaders,
        data: data,
        // returns the row model that is a 1:1 mapping of the OG data
        getCoreRowModel: getCoreRowModel(),
        // get set local sorting state when the sorting changes
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
            globalFilter,
        },
        initialState: {
            pagination:{
                pageSize: 20
            },
            // sorting: [
            //     {
            //         id: 'GROUPING NAME',
            //         desc: true, // sort by name in descending order by default
            //     },
            // ],
        },
        enableSortingRemoval: false,
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getPaginationRowModel: getPaginationRowModel(), // client-side pagination code
    });
    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-3xl text-text-color pb-7 pt-5">Manage Groupings</h1>
                <div className="flex items-center space-x-4">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                    <ColumnSettings table={tableInstance}/>
                </div>
            </div>
            <Table className="relative overflow-x-auto">
                <TableHeader>
                    {tableInstance.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}
                                        className="font-semibold text-uh-black border-solid border-t-[1px] border-b-[1px]"
                                        // returns a function that can be used to toggle col's sorting state
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        <div className="flex items-center">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            <SortArrow direction={header.column.getIsSorted()}/>
                                        </div>
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {tableInstance.getRowModel().rows.map((row, index) => (
                        <TableRow
                            key={row.id}
                            className={ index % 2 === 0 ? 'bg-light-grey' : ''}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className='p-0' width={cell.column.columnDef.size}>
                                    <div className='flex items-center pl-2 pr-2 py-0.5 text-[15.5px]'>
                                        {cell.column.id === 'GROUPING NAME' ? <Pencil2Icon className='me-2'/> : null}
                                        {cell.column.id === 'GROUPING PATH'?
                                            <GroupingPathComponent cell={cell}/>
                                            :
                                            <div className='m-2'>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </div>
                                        }
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar table={tableInstance} />
        </div>
    );
}

export default GroupingsTable;
