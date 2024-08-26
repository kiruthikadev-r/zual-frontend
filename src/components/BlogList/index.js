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
  const [loading, setLoading] = useState(true); 
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
      } finally {
        setLoading(false); 
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

      {loading ? (
        <div className="loading-icon">
          <img src="loading-spinner.gif" alt="Loading..." /> 
        </div>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BlogList;
