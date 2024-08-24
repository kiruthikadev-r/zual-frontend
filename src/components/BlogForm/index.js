import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import api from '../../api';
import Cookies from 'js-cookie'; 
import './index.css'; 

function BlogForm() {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      
      const fetchPost = async () => {
        const res = await api.get(`/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setDescription(res.data.description);
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = { title, content, description };
    const token = Cookies.get('token');
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      if (id) {
        
        const res = await api.put(`/posts/${id}`, post);
        console.log(res.data);
      } else {
        
        const res = await api.post('/posts', post);
        console.log(res.data);
      }
      setTitle('');
      setContent('');
      setDescription('');
      setIsModalOpen(true); 
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{id ? 'Edit Post' : 'Create a New Post'}</h1>
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
        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>{id ? 'Post Updated Successfully!' : 'Post Created Successfully!'}</h2>
            <p>Your post has been {id ? 'updated' : 'created'} and saved.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default BlogForm;
