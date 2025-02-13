import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './postListStyles.css';


function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const subreddit = queryParams.get('query') || 'cats';
    const searchQuery = queryParams.get('search') || '';

    useEffect(() => {
        setLoading(true);
        let url;
        if (searchQuery) {
            url = `https://www.reddit.com/r/${subreddit}/search.json?q=${searchQuery}&restrict_sr=1`;
        } else {
            url = `https://www.reddit.com/r/${subreddit}.json`; // Fetch posts from the subreddit if no search term is used
        }
        console.log('Fetching URL:', url);

        fetch(url)
            .then(response => { 
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                    return response.json();
            })
            .then(data => {
                setPosts(data.data.children);
                setLoading(false);
                setError(null);
            })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [subreddit, searchQuery]);

    return (
        <div>
            <div className="background-overlay"></div>
            <div>
            <h2>Posts</h2>
            {loading && <p>Loading posts...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {!loading && !error && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                {posts
                .filter(post =>
                  post.data.thumbnail && post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default'
                )
                .map(post => (
                  <li key={post.data.id} className="post-item">
                    <h3>
                      <a href={`https://www.reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer">
                        {post.data.title}
                      </a>
                    </h3>
                    <p>Author: {post.data.author}</p>     
                        <img
                          src={post.data.thumbnail}
                          alt={post.data.title}
                          className='post-image'
                        />
                    <p>Upvotes: {post.data.ups}</p>
                  </li>
                ))}
              </ul>
              
            )}
            </div>
        </div>



    );
}

export default PostList;