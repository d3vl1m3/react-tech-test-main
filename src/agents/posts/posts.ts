import { Post } from '@/components/PostItem/PostItem';
import { BASE_URL } from '../const';
import { handleGenericResponses } from '../utils/utils';
import { ApiError, UnknownError } from '../errors/errors';


export type ApiResponseType<T> = Promise<T|ApiError>;

const fetchPosts = async (searchParam?: string): ApiResponseType<Post[]> => {
    let url = new URL(`${BASE_URL}/posts`);
    if (searchParam) {
        url.searchParams.append('title_like', searchParam);
    }

    try {
        const response = await fetch(url.toString());
        
        if (response.ok) {
            const data = await response.json();
            return data;
        }

        return handleGenericResponses(response);
        
    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
        return new UnknownError('Unknown error fetching posts');
    }
}

const deletePost = async (id: number): ApiResponseType<{message: string}> => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return { message: 'Post deleted successfully' };
        }

        return handleGenericResponses(response);

    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
        return new UnknownError('Unknown error deleting post');
    }
}


export { fetchPosts, deletePost };