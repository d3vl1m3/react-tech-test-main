import { useFetchPosts } from '@/domainHooks/usePosts/usePosts';
import Posts from './Posts';

export const PostsContainer = () => {
    const { posts, actions, isLoading: isFetchLoading} = useFetchPosts();
    const isLoading = isFetchLoading || actions.delete.isLoading || actions.fetch.isLoading;

    return <Posts posts={posts} onRemove={actions.delete.apply} handleSearch={actions.fetch.apply} isLoading={isLoading} />;
};