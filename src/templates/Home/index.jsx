import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TestInput } from '../../components/TextInput';

export class Home extends Component {
    state = {
      posts: [],
      allPosts: [],
      page: 0,
      postsPerPage: 9,
      searchValue: '',
    }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      posts,
      allPosts,
      page,
      postsPerPage,
    } = this.state;

    const nextPage = page + postsPerPage;
    const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nexPosts);

    this.setState({
      posts, page: nextPage,
    });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      searchValue: value,
    })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

    return (
     <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <>
          <h1>Search Value: {searchValue}</h1><br/><br/><br/>
          </>
        )}

        <TestInput searchValue={searchValue} handleChange={this.handleChange} />
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}

      {filteredPosts.length === 0 && (
        <p>Não existem posts</p>
      )}

      <div className='button-container'>
        {!searchValue && (
          <Button disabled={noMorePosts} text={'Load More'} onClick={this.loadMorePosts} />
        )}
      </div>
     </section>
    );
  }
}
