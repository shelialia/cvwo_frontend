import React from 'react';
import Navbar from './Navbar';
import Display from './DisplayCard';
import Typography from '@mui/material/Typography';

function Homepage() {
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
        <Display />
    </div>
  );
}
export default Homepage;