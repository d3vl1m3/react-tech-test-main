import { Container } from '@material-ui/core';
import { PostsContainer } from './pages/Posts/Posts.container';

const App = () => {
  return (
      <Container maxWidth='md'>
        <PostsContainer />
      </Container>
  )
}

export default App;