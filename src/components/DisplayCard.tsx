import React from 'react';
import Typography from '@mui/material/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Grid from '@mui/joy/Grid';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

interface Post {
  id: number;
  topic: string;
  created_at: string;
  user: {
    name: string;
  };
  // Add other attributes as needed
}
interface SingleCardProps {
  post: Post;
  onDelete: (postId: number) => void; // Add onDelete prop so that UI is displayed when post is deleted without having to refresh page
}

function SingleCard({ post, onDelete }: SingleCardProps) {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(post.created_at));

  const handleDelete = async () => {
    try {
      // Make an API request to delete the comment
      await axios.delete(`http://localhost:3000/api/v1/posts/${post.id}`);
      onDelete(post.id);
      } catch (error) {
        console.error('Error deleting comment:', error);
        // Handle errors if necessary
      }
    }

  return (
    <Card sx={{ width: 320 }}>
      <div>
        <Typography className="title-lg" fontWeight="bold">
          {post.topic}
        </Typography>
        <Typography className="body-sm">{formattedDate}</Typography>
        <IconButton
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
          <Link to={`/postupdate/${post.id}`} style={{ marginLeft: 'auto' }}>
            <EditIcon color='action' />
          </Link>
            <DeleteOutlineIcon onClick={handleDelete}/>
          </div>
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography className="body-xs">Author: {post.user.name}</Typography>
        </div>
        <Link to={`/postdisplay/${post.id}`} style={{ marginLeft: 'auto' }}>
        <Button
          variant="solid"
          size="md"
          color="primary"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Read More
        </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

const Display = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<Post[]>('http://localhost:3000/api/v1/posts');
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);

    const handleDeletePost = (postId: number) => {
      // Update the local state to remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((prevPost) => prevPost.id !== postId));
    };

    return (
      <div className="mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, width: '100%', padding: 0 }} justifyContent="center">
          {posts.map((post, index) => (
            <Grid key={index} xs={3}>
              <SingleCard post={post} onDelete={handleDeletePost} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
}

export default Display;