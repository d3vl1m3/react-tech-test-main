import { getSearchParams } from '../../domainHooks/usePosts/usePosts';
import { Button } from '@material-ui/core';
import { useState } from 'react';

type PaginationProps = {
    fetchPosts: (searchParams: {[k: string]: string}) => void;
}

const pageParamToNumber = (page: string | null): number => {
    if (!page) {
        return 1;
    }
    const pageAsNumber = Number(page);
    return isNaN(pageAsNumber) ? 1 : pageAsNumber;
}

const getTargetPage = (action: 'next' | 'prev'): string => {
    const searchParams = getSearchParams();
    const desiredPageAsNumber = pageParamToNumber(searchParams._page);

    let targetPage = action === 'next' ? desiredPageAsNumber + 1 : desiredPageAsNumber - 1;
    return targetPage < 1 ? '1' : targetPage.toString();
}

export const Pagination = ({fetchPosts}: PaginationProps) => {
    const searchParams = getSearchParams();
    const [currentPage, setCurrentPage] = useState(searchParams._page);


    
    const onPageChange = (action: 'next' | 'prev') => {
        const searchParams = getSearchParams();
        const targetPage = getTargetPage(action);

        // increment or decrement the page number
        searchParams._page = targetPage;
        setCurrentPage(targetPage);

        // update the search params in the URL to match the new params
        const urlParams = new URLSearchParams(searchParams);
        urlParams.set('_page', targetPage);

        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.pushState({}, '', newUrl);

        fetchPosts(searchParams);
    }
    return (
        <div>
            {parseInt(currentPage) > 1 && (
                <Button variant="outlined" type='button' onClick={() => onPageChange('prev')}>Prev</Button>
            )}
            <Button variant="outlined"type='button' onClick={() => onPageChange('next')}>Next</Button>
        </div>
    );
}