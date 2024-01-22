import React from 'react';
import DisplayPost from '../components/DisplayPost'
import NavbarForCreateComment from '../components/NavbarForCreateComment';
import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const PostDisplay = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div>
        <NavbarForCreateComment buttonName="Create a New Comment"/ >
          {post && (
        <div className='mx-auto max-w-[1000px]'>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.primary"
                gutterBottom
                fontWeight='bold'
                    sx={{ whiteSpace: 'nowrap', marginTop: '50px', marginBottom: '20px' }}
                >
                {post['topic'] ? post['topic'] : 'No Topic'}
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph sx = {{textAlign: "center"}}>
              {post['content'] ? post['content'] : 'No Topic'}
              </Typography>
        </div>
          )}
        <DisplayPost />
    </div>
  )
}

export default PostDisplay