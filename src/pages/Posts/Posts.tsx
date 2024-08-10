import Search from '../../components/Search/Search';
import PostItem, { type Post } from '../../components/PostItem/PostItem';
import { List, ListItem } from '@material-ui/core';

type PostsProps = {
    posts?: Post[];
    onRemove: (id: number) => void;
    handleSearch: (searchParams: string) => void;
    isLoading?: boolean;
}

const Posts = ({
    posts,
    onRemove,
    handleSearch,
    isLoading,
}: PostsProps) => {
    return (
        <div>
            <header>
                <Search handleSearch={handleSearch} />
            </header>

            {isLoading && <p>Loading...</p>}


            {!isLoading && posts && posts.length === 0 && (
                <p>No posts found</p>
            )}

            {!isLoading && posts && posts.length > 0 && (
            <main>
                    {posts && posts.length > 0 && (
                        <List>
                            {posts.map((post) => (
                                <ListItem>
                                    <PostItem key={post.id} post={post} onRemove={onRemove} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </main>

            )}

        </div>
    );
};

export default Posts;