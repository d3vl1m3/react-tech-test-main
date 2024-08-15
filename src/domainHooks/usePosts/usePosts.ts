import useSWR from 'swr';
import { fetchPosts as fetchPostsAgent, deletePost as deletePostAgent } from '../../agents/posts/posts';
import { useState } from 'react';

export const getSearchParams = (): {[k: string]: string} => {
    const entries = new URLSearchParams(window.location.search).entries()
    // loop through the entries and create an object from them
    const searchParams = Object.fromEntries(entries);
    // replace any '+' with a space
    Object.keys(searchParams).forEach(k => {
        searchParams[k] = searchParams[k].replace(/\+/g, ' ');
    });

    // add a _per_page and _page key to the searchParams object if they doesn't exist
    if (!searchParams._per_page) {
        searchParams._per_page = '10';
    }

    if (!searchParams._page) {
        searchParams._page = '1';
    }

    return searchParams;

}

export const useFetchPosts = () => {
    const searchParams = getSearchParams();

    const { data, error, isLoading, mutate } = useSWR('/posts', () => fetchPostsAgent(searchParams));

    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [deleteError, setDeleteError] = useState<Error| null>(null);

    const deletePost = async (id: number) => {
        setDeleteError(null);

        setIsDeleteLoading(true);
        const repsonse = await deletePostAgent(id);
        setIsDeleteLoading(false);

        if ( repsonse instanceof Error) {
            console.error('Error deleting post:', repsonse);
            setDeleteError(repsonse);
            setIsDeleteLoading(false);
        }

        // when we delete a post, we need to refetch the posts instead of just mutating locally
        mutate();
            
    }

    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<Error| null>(null);
    
    const fetchPosts = async (searchParam?: {[k: string]: string}) => {
        setSearchError(null);

        setIsSearchLoading(true);
        const response = await mutate(fetchPostsAgent(searchParam), false);
        setIsSearchLoading(false);

        if (response instanceof Error) {
            console.error('Error fetching posts:', data);
            setSearchError(response);
        }
    }

    return {
        // because we are returning errors as data, we need to check if the data is an instance of Error
        posts: data instanceof Error ? [] : data,
        isLoading,
        error: data instanceof Error ? data : error,
        actions: {
            delete: {
                apply: deletePost,
                isLoading: isDeleteLoading,
                error: deleteError
            },
            fetch: {
                apply: fetchPosts,
                isLoading: isSearchLoading,
                error: searchError
            },
        }
    };
};