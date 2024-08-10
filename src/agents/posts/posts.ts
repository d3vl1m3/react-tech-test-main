import { Post } from '@/components/PostItem/PostItem';
import { BASE_URL } from '../const';

const fetchPosts = async (searchParam?: string): Promise<Post[]|Error> => {
    let url = new URL(`${BASE_URL}/posts`);
    if (searchParam) {
        url.searchParams.append('title_like', searchParam);
    }

    try {
        const response = await fetch(url.toString());
        return response.json();
    } catch (error) {
        return new Error('Failed to fetch posts');
    }
}

const deletePost = async (id: number): Promise<{message: string}|Error> => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        return {
            message: 'Post deleted successfully',
        };
    } else {
        return new Error('Failed to delete post');
    }
}


export { fetchPosts, deletePost };