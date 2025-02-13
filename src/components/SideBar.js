import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const subreddits = ['cats', 'Catmemes', 'catpics', 'spacecats', 'CatGifs', 'Catloaf'];
    const [subredditData, setSubredditData] = useState({});
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const activeSubreddit = queryParams.get('query') || 'cats';

    useEffect(() => {
        subreddits.forEach(subreddit => {
            fetch(`https://www.reddit.com/r/${subreddit}/about.json`)
                .then(response => response.json())
                .then(data => {
                    setSubredditData(prevData => ({
                        ...prevData,
                        [subreddit]: data.data.icon_img,
                    }));
                })
                .catch(error => {
                    console.error(`Failed to fetch data for ${subreddit}:`, error);
                });
        });
    }, []);

    return (
        <aside style={sidebarStyle}>
            <h3 style={{ textAlign: 'center', marginTop: '1px', fontSize: '20px', textDecoration: 'underline', borderBottom: '2px solid black'}}>SubReddits</h3>
            <ul style={listStyle}>
                {subreddits.map(subreddit => (
                    <li
                        key={subreddit}
                        className={activeSubreddit === subreddit ? 'active-subreddit' : ''}
                        style={{
                            ...listItemStyle,
                            ...(activeSubreddit === subreddit
                                ? { backgroundColor: '#ADD8E6', fontWeight: 'bold' }
                                : {}),
                        }}
                    >
                        <Link to={`/?query=${subreddit}`} style={linkStyle}>
                            {subredditData[subreddit] ? (
                                <img
                                    src={subredditData[subreddit]}
                                    alt={`${subreddit} logo`}
                                    style={iconStyle}
                                />
                            ) : (
                                <div style={placeholderIconStyle}></div>
                            )}
                            {subreddit}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

const sidebarStyle = {
    top: '20px',
    width: '250px',
    padding: '20px',
    backgroundColor: 'white',
    position: 'relative',
    height: '335px'
};

const listStyle = {
    listStyleType: 'none',
    padding: '0',
};

const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '7px', 
    padding: '7px', 
    borderRadius: '5px', 
    transition: 'background-color 0.3s', 
};

const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    display: 'flex',
    alignItems: 'center',
};

const iconStyle = {
    width: '30px',
    height: '30px',
    marginRight: '10px',
    objectFit: 'cover',
    borderRadius: '50%',
};

const placeholderIconStyle = {
    width: '30px',
    height: '30px',
    backgroundColor: 'grey',
    marginRight: '10px',
    borderRadius: '50%',
};

export default Sidebar;
