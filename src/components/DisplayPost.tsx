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

interface Comment {
    content: string;
    created_at: Date;
    user_id: {
      name: string;
    };
  }
  
  interface SingleCardProps {
    comment: Comment;
  }

function SingleCard({ comment }: SingleCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(comment.created_at));
  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography className="title-lg" fontWeight="bold">
          {comment.user_id.name}
        </Typography>
        <Typography className="body-sm">{formattedDate}</Typography>
        <IconButton
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <EditIcon />
            <DeleteOutlineIcon />
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
  
  return (
    <div className="mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
      <Grid container spacing={2} sx={{ flexGrow: 1, width: '100%', padding: 0 }} justifyContent="center">
        {Comments.map((comment, index) => (
          <Grid key={index} xs={3}>
            <SingleCard comment={comment} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}