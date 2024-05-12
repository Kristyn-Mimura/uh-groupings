import { ChevronUp, ChevronDown } from 'lucide-react';

interface SortArrowProps {
    direction: string | boolean;
}
const SortArrow = ({direction} :SortArrowProps) => (
    <div>
        {direction === 'asc' ? <ChevronDown size={15} strokeWidth={3}/>
            : direction === 'desc' ?  <ChevronUp size={15} strokeWidth={3}/>
                : <div/>}
    </div>
);

export default SortArrow;
