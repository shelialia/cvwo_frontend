import React from 'react';
import Navbar from './Navbar';
import Display from './DisplayCard';
import Typography from '@mui/material/Typography';
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
import Box from '@mui/material/Box';
import { useState } from 'react';

function Homepage() {
  const fixedTags = [
    'Academic',
    'Gaming',
    'Memes', 
    'Music', 
    'News', 
    'Sports', 
    'Tech', 
    'Travel', 
    'TV & Movies', 
    'Others'
  ];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        // Deselect tag
        return prevTags.filter((selectedTag) => selectedTag !== tag);
      } else {
        // Select tag
        return [...prevTags, tag];
      }
    });
  };

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
    <div>
        <Navbar buttonName="Create a New Post"/>
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
                Welcome to the Forum!
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph sx = {{textAlign: "center"}}>
              Feel free to browse, share, and interact with other users! Do remember to be respectful and kind to others.
              </Typography>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Stack direction="row" spacing={1}>
            {fixedTags.map((tag, index) => (
      
              <Chip icon={handleIcon(tag)} label={tag} clickable
            color={selectedTags.includes(tag) ? 'primary' : 'default'}
            onClick={() => handleTagClick(tag)} />

            ))}
          </Stack>
      </Box>
        <Display selectedTags={selectedTags}/>
    </div>
  );
}
export default Homepage;