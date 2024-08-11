import { Post } from '@/components/PostItem/PostItem';
import { BASE_URL } from '../const';
import { handleGenericResponses } from '../utils/utils';
import { UnknownError } from '../errors/errors';

const fetchPosts = async (searchParam?: string): Promise<Post[]|Error> => {
    let url = new URL(`${BASE_URL}/posts`);
    if (searchParam) {
        url.searchParams.append('title_like', searchParam);
    }


    try {
        const response = await fetch(url.toString());
        // convert the non-200 status codes to errors
        return handleGenericResponses(response);

    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
        return new UnknownError('Unknown error fetching posts');
    }

    

}

const deletePost = async (id: number): Promise<{message: string}|Error> => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${id}`, {
            method: 'DELETE',
        });

        return handleGenericResponses(response);

    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
        return new UnknownError('Unknown error fetching posts');
    }
}


export { fetchPosts, deletePost };