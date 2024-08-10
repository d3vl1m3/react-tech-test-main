import { Post } from '@/components/PostItem/PostItem';
import { BASE_URL } from '../const';

const fetchPosts = async (searchParam?: string): Promise<Post[]> => {
    let url = new URL(`${BASE_URL}/posts`);
    if (searchParam) {
        url.searchParams.append('title_like', searchParam);
    }

    try {
        const response = await fetch(url.toString());
        console.log('response', response);
        return response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

const deletePost = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        console.log(`Post with id ${id} deleted successfully.`);
    } else {
        console.error(`Failed to delete post with id ${id}.`);
    }
}


export { fetchPosts, deletePost };