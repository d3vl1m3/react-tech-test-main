import useSWR from 'swr';
import { fetchPosts as fetchPostsAgent, deletePost as deletePostAgent } from '../../agents/posts/posts';
import { useState } from 'react';

export const useFetchPosts = () => {
    // get the search param from the URL    
    let searchParams = new URLSearchParams(window.location.search).toString().split('=')[1];
    searchParams = searchParams?.replace(/\+/g, ' ')

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
    const fetchPosts = async (searchParam?: string) => {
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