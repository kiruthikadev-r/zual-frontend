import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Cookies from 'js-cookie'; 
import './index.css'; 

const api = axios.create({
  baseURL: 'https://zual-backend.onrender.com/' 
});

function BlogList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const token = Cookies.get('token');

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const res = await api.get('/posts');
        console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);

        if (error.response && error.response.status === 401) {
          
          navigate('/login');
        }
      }
    };
    fetchPosts();
  }, [navigate]);

  const handleAddNewPost = () => {
    navigate('/new'); 
  };

  return (
    <div className="blog-container">
      <h1>Blog Posts</h1>
      {/* <div className="add-post-button-container">
        <button className="add-post-button" onClick={handleAddNewPost}>
        Add New Post
      </button>
      </div> */}
      
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
