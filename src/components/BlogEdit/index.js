import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import Cookies from 'js-cookie'; 
import './index.css'; 

function BlogEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = Cookies.get('token');
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setDescription(res.data.description);
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content, description };
    await api.put(`/posts/${id}`, updatedPost); 
    navigate(`/posts/${id}`); 
  };

  return (
    <form onSubmit={handleUpdate}>
      <h1>Edit Post</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
}

export default BlogEdit;
