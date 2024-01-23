import React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Grid from '@mui/joy/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface Comment {
    content: string;
    created_at: Date;
    user_id: number;
    id: number;
  }
  
  interface SingleCardProps {
    comment: Comment;
    onDeleteComment: (commentId: number) => void;
  }
  
function SingleCard({ comment, onDeleteComment}: SingleCardProps) {
  const { postId } = useParams();
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(comment.created_at));
  console.log(comment.user_id);

  const [username, setUsername] = useState<any>("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${comment.user_id}`);
        console.log(response.data.name);
        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [comment.user_id]);


  const handleDelete = async () => {
    try {
      // Make an API request to delete the comment
      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}/comments/${comment.id}`);
      onDeleteComment(comment.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
        // Handle errors if necessary
      }
    }
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography className="title-lg" fontWeight="bold">
          {username}
        </Typography>
        <Typography className="body-sm">{formattedDate}</Typography>
        <IconButton
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to={`/postdisplay/${postId}/commentupdate/${comment.id}`}>
            <EditIcon />
            </Link> 
            <DeleteOutlineIcon onClick={handleDelete}/>
          </div>
        </IconButton>
      </div>
      
      <CardContent orientation="horizontal">
        <div>
          <Typography className="body-xs">{comment.content}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DisplayPost() {
  const { postId } = useParams();
  const [Comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<Comment[]>(`http://localhost:3000/api/v1/posts/${postId}/comments`);
          console.log('API Response:', response.data);
          setComments(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [postId]);

    const handleDeleteComment = (commentId: any) => {
      // Update the local state to remove the deleted comment
      setComments((prevComments) => prevComments.filter((prevComment) => prevComment.id !== commentId));
    };
  
  return (
    <div className="mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <Grid container spacing={2} sx={{ flexGrow: 1, width: '100%', padding: 0 }} justifyContent="center">
        {Comments.map((comment, index) => (
          <Grid key={index} xs={3}>
            <SingleCard comment={comment} onDeleteComment={handleDeleteComment} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}