import { Input } from '@/components/ui/input'
import {Dispatch, SetStateAction} from 'react';

interface FilterProps {
    filter: string;
    setFilter:  Dispatch<SetStateAction<string>>;
}
// filter = value of text input, setFilter = the setter function
const GlobalFilter = ( {filter, setFilter} : FilterProps) => (
    <Input
        placeholder='Filter Groupings...'
        value={filter || ''}
        // call setFilter function with input value
        onChange={e => setFilter(e.target.value)}
    />

);

export default GlobalFilter;

// import { Dispatch, SetStateAction, useState } from 'react';
//
// interface FilterProps {
//     filtering: string;
//     setFiltering: Dispatch<SetStateAction<string>>;
// }
//
// const Filter = ({ filtering, setFiltering }: FilterProps) => {
//     return (
//         <div className="col-span-3 my-3">
//             <input
//                 className="border rounded p-2 w-full"
//                 type="text"
//                 value={filtering}
//                 onChange={(e) => setFiltering(e.target.value)}
//                 placeholder="Search by Holiday, Day, Month, Year"
//             />
//         </div>
//     );
// };
//
// export default Filter;
