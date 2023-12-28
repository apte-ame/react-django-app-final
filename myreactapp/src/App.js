// App.js
import React, { useState, useEffect } from 'react';
import AddPostButton from './AddPostButton';
import './App.css'; // Import the CSS file for styling

const App = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts/');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        // Fetch posts when the component mounts
        fetchPosts();
    }, []);

    const handlePost = () => {
        // Refetch posts when a new post is added
        fetchPosts();
    };

    // Function to render a single post card
    const renderPostCard = (post) => (
        <div key={post.id} className="post-card">
            <img src={`${post.image}`} alt={post.text} />
            <p>{post.text}</p>
        </div>
    );

    // Function to render blank post card with image placeholder
    const renderBlankPostCard = (index) => (
        <div key={index} className="post-card blank-post-card">
            <div className="image-placeholder">
                {/* Gallery icon with circle */}
                <div className="gallery-icon">
                    <span className="icon">&#128247;</span>
                </div>
            </div>
            <p>Caption here</p>
        </div>
    );

    // Render posts or blank post cards based on the posts array
    const renderPosts = () => {
        if (posts.length === 0) {
            // Display two blank post cards if there are no posts
            return [renderBlankPostCard(1), renderBlankPostCard(2)];
        } else {
            // Display posts
            // return posts.map(renderPostCard);
            // Display posts in reverse order (recently added first)
            return posts.slice().reverse().map(renderPostCard);
        }
    };

    return (
        <div className="app">
            <div className="header-container">
                <h1>My Posts</h1>
                {/* AddPostButton component with the onPost callback */}
                <AddPostButton onPost={handlePost} />
            </div>
            {/* Display posts or blank post cards */}
            <div className="post-grid">
                {renderPosts()}
            </div>
        </div>
    );
};

export default App;
