import { Grid, Typography, Button } from '@material-ui/core';

export type Post = {
    id: number;
    title: string;
    body: string;
}

type PostItemProps = {
    post: Post;
    onRemove: (postId: number) => void;
}

const PostItem = ({ post, onRemove }: PostItemProps) => {
    const handleRemove = () => {
        onRemove(post.id);
    };

    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs>
                <Typography variant="h5" component="h2">{post.title}</Typography>
                <Typography variant="body1">{post.body}</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" onClick={handleRemove}>
                    Remove
                </Button>
            </Grid>
        </Grid>
    );
};

export default PostItem;