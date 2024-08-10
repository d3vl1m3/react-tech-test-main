import { fetchPosts, deletePost } from './posts';
import { BASE_URL } from '../const';

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
                json: async () => mockPosts,
            });

            const result = await fetchPosts();

            expect(fetch).toHaveBeenCalledWith(new URL(`${BASE_URL}/posts`).toString());
            expect(result).toEqual(mockPosts);
        });

        it('should fetch posts successfully with searchParam', async () => {
            const mockPosts = [{ id: 1, title: 'Post 1' }];
            const searchParam = 'test';
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => mockPosts,
            });

            const result = await fetchPosts(searchParam);

            const expectedUrl = new URL(`${BASE_URL}/posts`);
            expectedUrl.searchParams.append('title_like', searchParam);
            

            expect(fetch).toHaveBeenCalledWith(expectedUrl.toString());
            expect(result).toEqual(mockPosts);
        });

        it('should handle fetch failure', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch failed'));

            const result = await fetchPosts();

            expect(fetch).toHaveBeenCalledWith(new URL(`${BASE_URL}/posts`).toString());
            expect(result).toEqual([]);
        });
    });

    describe('deletePost', () => {
        it('should delete post successfully', async () => {
            const postId = 1;
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

            await deletePost(postId);

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
        });

        it('should handle delete failure', async () => {
            const postId = 1;
            (fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

            await deletePost(postId);

            expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/posts/${postId}`, { method: 'DELETE' });
        });
    });
});