import { renderHook, act } from '@testing-library/react';
import useSWR from 'swr';
import { fetchPosts as fetchPostsAgent, deletePost as deletePostAgent } from '../../agents/posts/posts';
import { useFetchPosts } from './usePosts';

jest.mock('swr');
jest.mock('../../agents/posts/posts');

describe('useFetchPosts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize correctly', () => {
        (useSWR as jest.Mock).mockReturnValue({
            data: null,
            error: null,
            isLoading: true,
            mutate: jest.fn(),
        });

        const { result } = renderHook(() => useFetchPosts());

        expect(result.current.posts).toBeNull();
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBeNull();
        expect(result.current.actions.delete.isLoading).toBe(false);
        expect(result.current.actions.delete.error).toBeNull();
    });

    it('should fetch posts with correct parameters', async () => {
        const mutateMock = jest.fn();
        (useSWR as jest.Mock).mockReturnValue({
            data: [],
            error: null,
            isLoading: false,
            mutate: mutateMock,
        });

        const { result } = renderHook(() => useFetchPosts());

        await act(async () => {
            await result.current.actions.fetch.apply('test search');
        });

        expect(mutateMock).toHaveBeenCalledWith(fetchPostsAgent('test search'), false);
        expect(fetchPostsAgent).toHaveBeenCalledWith('test search');
    });

    it('should handle fetch posts error', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
        const mutateMock = jest.fn().mockImplementation(() => new Error('Fetch error'));
        (useSWR as jest.Mock).mockReturnValue({
            data: [],
            error: null,
            isLoading: false,
            mutate: mutateMock,
        });

        const { result } = renderHook(() => useFetchPosts());

        await act(async () => {
            await result.current.actions.fetch.apply('test search');
        });

        expect(consoleErrorMock).toHaveBeenCalledWith('Error fetching posts:', []);
        consoleErrorMock.mockRestore();
    });

    it('should delete post with correct parameters', async () => {
        const mutateMock = jest.fn();
        (useSWR as jest.Mock).mockReturnValue({
            data: [],
            error: null,
            isLoading: false,
            mutate: mutateMock,
        });

        const { result } = renderHook(() => useFetchPosts());

        await act(async () => {
            await result.current.actions.delete.apply(1);
        });

        expect(deletePostAgent).toHaveBeenCalledWith(1);
        expect(mutateMock).toHaveBeenCalled();
    });

    it('should handle delete post error', async () => {
        const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
        const mutateMock = jest.fn();
        (useSWR as jest.Mock).mockReturnValue({
            data: [],
            error: null,
            isLoading: false,
            mutate: mutateMock,
        });
        (deletePostAgent as jest.Mock).mockImplementation(() => new Error('Delete error'));

        const { result } = renderHook(() => useFetchPosts());

        await act(async () => {
            await result.current.actions.delete.apply(1);
        });

        expect(consoleErrorMock).toHaveBeenCalledWith('Error deleting post:', expect.any(Error));
        expect(result.current.actions.delete.error).toEqual(new Error('Delete error'));
        consoleErrorMock.mockRestore();
    });
});