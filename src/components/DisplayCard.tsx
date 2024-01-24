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
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import SchoolIcon from '@mui/icons-material/School';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import CelebrationIcon from '@mui/icons-material/Celebration';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ComputerIcon from '@mui/icons-material/Computer';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

interface Post {
  id: number;
  topic: string;
  created_at: string;
  user: {
    name: string;
  };
  tag_names: string;
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

    const tagsString = post.tag_names;
    console.log(tagsString);

    function cleanTagsString(tagNames: string): string[] {
      if (tagNames !== null) {
        // Remove leading and trailing commas, replace consecutive commas with a single comma
        const cleanedString = tagNames.replace(/^,|,$|,+/g, ',');
    
        // Split the string into an array using commas
        const tagsArray = cleanedString.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    
        // Helper function to remove duplicates
        const removeDuplicates = (arr: string[]): string[] => {
          return arr.filter((value, index, self) => self.indexOf(value) === index);
        };
    
        // Remove duplicates from the array
        const uniqueTags = removeDuplicates(tagsArray);
    
        return uniqueTags;
      }
      return [];
    }

    // Example usage:
    const cleanedString = cleanTagsString(tagsString);
    console.log(cleanedString);

    const handleIcon = (tag: string) => {
      switch (tag.toLowerCase()) {
        case 'gaming':
          return <VideogameAssetIcon />;
        case 'academic':
          return <SchoolIcon />;
        case 'fashion':
          return <CheckroomIcon />;
        case 'memes':
          return <CelebrationIcon />;
        case 'music':
          return <MusicNoteIcon />;
        case 'tech':
          return <ComputerIcon />;
        case 'news':
          return <NewspaperIcon />;
        case 'sports':
          return <SportsEsportsIcon />;
        case 'travel':
          return <CardTravelIcon />;
        case 'tv & movies':
          return <LocalMoviesIcon />;
        case 'others':
          return <MiscellaneousServicesIcon />;
      }
    };    

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
      <Stack direction="row" spacing={1}>
        {cleanedString.map((tag, index) => (
          <Chip icon={handleIcon(tag)} label={tag} color='secondary'/>
        ))}
    </Stack>
      {/* <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
          srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio> */}
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

const Display = ({ selectedTags }: any) => {
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

    const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => post.tag_names.split(',').some(tag => selectedTags.includes(tag.trim())))
    : posts;

    return (
      <div className="mx-auto" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <Grid container spacing={2} sx={{ flexGrow: 1, width: '100%', padding: 0 }} justifyContent="center">
          {filteredPosts.map((post, index) => (
            <Grid key={index} xs={3}>
              <SingleCard post={post} onDelete={handleDeletePost} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
}

export default Display;