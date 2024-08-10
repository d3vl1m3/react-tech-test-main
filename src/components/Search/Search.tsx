import { Grid, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';

export type SearchProps = {
    handleSearch: (searchParams: string) => void;
    isLoading?: boolean;
}

const Search = ({
    handleSearch,
    isLoading
}: SearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const q = urlSearchParams.get('q');
        if (q) {
            setSearchTerm(q);
        }
    }, []);
    
    const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

    // clear timeout on unmount
    useEffect(() => {
        return () => {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        };
    }, [typingTimeout]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value)

        // add value to the url as a query param
        const searchParams = new URLSearchParams();
        searchParams.set('q', value);

        // add the search param to the URL
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.pushState({}, '', newUrl);
        

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(() => {
            handleSearch(value);
        }, 500));
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <TextField
                fullWidth
                    variant='outlined'
                    placeholder='Search by title'
                    label='Search'
                    aria-labelledby='search'
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    disabled={isLoading}
                />
            </Grid>
        </Grid>
    );
};

export default Search;