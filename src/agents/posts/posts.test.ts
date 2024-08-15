import { fetchPosts, deletePost } from './posts';
import { BASE_URL } from '../const';
import { GenericApiError } from '../errors/errors';

// @ts-ignore   
global.fetch = jest.fn();

describe('posts agent', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchPosts', () => {
        it('should fetch posts successfully without searchParam', async () => {
            const mockPosts = [{ id: 1, title: 'Post 1' }];
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockPosts,
            });

            const result = await fetchPosts();

            expect(fetch).toHaveBeenCalledWith(new URL(`${BASE_URL}/posts`).toString());
            expect(result).toEqual(mockPosts);
        });

        it('should fetch posts successfully with searchParam', async () => {
            const mockPosts = [{ id: 1, title: 'Post 1' }];
            const searchParam = 'search';
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => mockPosts,
            });

            const result = await fetchPosts({'search': searchParam});

            expect(fetch).toHaveBeenCalledWith(new URL(`${BASE_URL}/posts?search=search`).toString());
            expect(result).toEqual(mockPosts);
        });

        it('should handle fetch failure', async () => {
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

            const result = await fetchPosts();

            expect(fetch).toHaveBeenCalledWith(new URL(`${BASE_URL}/posts`).toString());
            expect(result).toEqual(new GenericApiError('Internal Server Error', { status: 500 }));
        });
    });

    describe('deletePost', () => {
        it('should delete post successfully', async () => {
            const postId = 1;
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({}) });

            const result = await deletePost(postId);

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
            expect(result).toEqual({
                message: 'Post deleted successfully'
            });
        });

        it('should handle delete failure', async () => {
            const postId = 1;
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

            const result = await deletePost(postId);

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
            expect(result).toEqual(new GenericApiError('Internal Server Error', { status: 500 }));            
        });
    });
});