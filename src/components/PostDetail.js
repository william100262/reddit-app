import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://www.reddit.com/by_id/t3_${id}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch post');
            }
            return response.json()
        })
        .then(data => {
            setPost(data.data.children[0].data);
            setLoading(false);
            setError(null);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading post...</p>;
    if (error) return <p style={{color: 'red'}}>{error}</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
            <p>{post.ups}</p>
            <p>{post.selftext}</p>
            {post.preview.images && post.preview.images[0] && (
                <div style={{marginBottom: '20px'}}>
                    <img src={post.preview.images[0].source.url} alt={post.title} style={{maxWidth: '100px', height: 'auto'}}/>
                </div>
            )}
            <a href={`https://www.reddit.com${post.permalink}`} target="_blank" rel="noopener noreferrer">View original post on Reddit</a>
        </div>
    );

}

export default PostDetail;