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
        try {
            setIsDeleteLoading(true);
            await deletePostAgent(id);
            mutate();
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error deleting post:', error);
                setDeleteError(error);
            } else {
                console.error('Unknown error deleting post:', error);
                setDeleteError(new Error('Unknown error deleting post'));
            }
             
        } finally {
            setIsDeleteLoading(false);
        }
    }

    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState<Error| null>(null);
    const fetchPosts = async (searchParam?: string) => {
        setSearchError(null);
        try {
            setIsSearchLoading(true);
            await mutate(fetchPostsAgent(searchParam), false);
        } catch (error) {
            if (error instanceof Error) {
                setSearchError(error);
            } else{
                setSearchError(new Error('Unknown error searching posts'));
            }
            console.error('Error searching posts:', error);
        } finally {
            setIsSearchLoading(false);
        }
    }

    return {
        posts: data instanceof Error ? [] : data,
        isLoading,
        error,
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