import './styles.css';
import { useCallback, useEffect, useState } from 'react';
import { loadPosts } from '../../utils/load-post';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TestInput } from '../../components/TextInput';

export const Home = () => {
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [postsPerPage] = useState(9);
    const [searchValue, setSearchValue] = useState('');

    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => post.title.toLowerCase().includes(searchValue.toLowerCase())) : posts;

    
    const handleLoadPosts = useCallback(async (page, postsPerPage) => {
      const postsAndPhotos = await loadPosts();
      
      setPosts(postsAndPhotos.slice(page, postsPerPage));
      setAllPosts(postsAndPhotos);
    }, []);

    useEffect(() => {
      handleLoadPosts(0, postsPerPage);
    }, [handleLoadPosts, postsPerPage]);
    
    const loadMorePosts = () => {
      const nextPage = page + postsPerPage;
      const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
      posts.push(...nexPosts);

      setPosts(posts);
      setPage(nextPage);
    }

    const handleChange = (e) => {
      const { value } = e.target;
      setSearchValue(value);
    }
  

  return (
    <section className='container'>
     <div className='search-container'>
       {!!searchValue && (
         <>
         <h1>Search Value: {searchValue}</h1><br/><br/><br/>
         </>
       )}

       <TestInput searchValue={searchValue} handleChange={handleChange} />
     </div>

     {filteredPosts.length > 0 && (
       <Posts posts={filteredPosts} />
     )}

     {filteredPosts.length === 0 && (
       <p>Não existem posts</p>
     )}

     <div className='button-container'>
       {!searchValue && (
         <Button disabled={noMorePosts} text={'Load More'} onClick={loadMorePosts} />
       )}
     </div>
    </section>
   );
};

// export class Home2 extends Component {
//     state = {
//       posts: [],
//       allPosts: [],
//       page: 0,
//       postsPerPage: 9,
//       searchValue: '',
//     }

//   async componentDidMount() {
//     await loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postsPerPage } = state;

//     const postsAndPhotos = await loadPosts();
//     setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   }

//   loadMorePosts = () => {
//     const {
//       posts,
//       allPosts,
//       page,
//       postsPerPage,
//     } = state;

//     const nextPage = page + postsPerPage;
//     const nexPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nexPosts);

//     setState({
//       posts, page: nextPage,
//     });
//   }

//   handleChange = (e) => {
//     const { value } = e.target;
//     setState({
//       searchValue: value,
//     })
//   }

//   render() {
    
   
//   }
// }
