import Search from '../../components/Search/Search';
import PostItem, { type Post } from '../../components/PostItem/PostItem';
import { List, ListItem } from '@material-ui/core';
import { Pagination } from '@/components/Pagination/Pagination';

type PostsProps = {
    posts?: Post[];
    onRemove: (id: number) => void;
    fetchPosts: (searchParams: {[k: string]: string}) => void;
    isLoading?: boolean;
}

const Posts = ({
    posts,
    onRemove,
    fetchPosts,
    isLoading,
}: PostsProps) => {
    return (
        <div>
            <header>
                <Search fetchPosts={fetchPosts} />
            </header>

            {isLoading && <p>Loading...</p>}


            {!isLoading && posts && posts.length <= 0 && (
                <p>No posts found</p>
            )}

            {!isLoading && posts && posts.length > 0 && (
                <main>
                    <Pagination fetchPosts={fetchPosts} />
                    
                    <List>
                        {posts.map((post) => (
                            <ListItem key={post.id}>
                                <PostItem key={post.id} post={post} onRemove={onRemove} />
                            </ListItem>
                        ))}
                    </List>
                    
                    <Pagination fetchPosts={fetchPosts} />
                </main>

            )}

        </div>
    );
};

export default Posts;