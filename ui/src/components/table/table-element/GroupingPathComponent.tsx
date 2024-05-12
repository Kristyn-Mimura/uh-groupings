import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Cell} from '@tanstack/table-core';
import {GroupingPath} from '@/groupings/GroupingsApiResults';
import {ClipboardIcon, Pencil2Icon} from '@radix-ui/react-icons'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import {useEffect, useState} from "react";

interface CellProps {
    cell: Cell<GroupingPath, unknown>;
}

const GroupingPathComponent = ({cell}: CellProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const tooltip = 'copied';
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const handleClick = () => {
        toggleVisibility();
        navigator.clipboard.writeText(cell.row.getValue('GROUPING PATH'));

    }

    // const hidePopover = () => {
    //     const copyPopover = document.querySelector('[data-content="copy"]');
    //     const copiedPopover = document.querySelector('[data-content="copied!"]');
    //
    //     if (copyPopover) {
    //         copyPopover.className='hidden';
    //     }
    //     if (copiedPopover) {
    //         copiedPopover.className='block';
    //         setTimeout(() => {
    //             copiedPopover.className='hidden';
    //         }, 1000);
    //     }
    // };

    return(
        <div className='flex items-center ml-5 w-11/12 h-6 outline outline-1 rounded'>
            <Input className='border-none text-s h-6 text-dark-grey truncate' readOnly value={cell.row.getValue('GROUPING PATH')}></Input>
            <TooltipProvider delayDuration={1}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button className='bg-light-grey hover:bg-uh-teal h-6' data-tooltip-target="tooltip-default" variant='ghost'
                            onClick={() => handleClick()}
                        ><ClipboardIcon/></Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{'copy'}</p>
                    </TooltipContent>
                    <TooltipContent className={isVisible ? 'hidden' : 'block'}>
                        <p>{'copied!'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>

    );
};

export default GroupingPathComponent;
