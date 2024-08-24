import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import Cookies from 'js-cookie'; 
import './index.css'; 

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPost = async () => {
      const token = Cookies.get('token');
        
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`); 
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate('/'); 
  };

  return (
    <div className="blog-detail-container">
      <h1 className='blog-title'>{post.title}</h1>
      <p>{post.content}</p>
      <p>{post.description}</p>
      <div className="button-group">
        <button onClick={handleEdit} className="edit-button">Edit</button>
        <button onClick={handleDelete} className="delete-button">Delete</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Post Deleted Successfully!</h2>
            <p>The blog post has been removed.</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
