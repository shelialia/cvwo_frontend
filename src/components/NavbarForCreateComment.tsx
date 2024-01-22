import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Navbar({buttonName} : { buttonName: string }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const handleClick = () => {
    if (postId) {
      navigate(`/postdisplay/${postId}/comment`);
    } else {
      // Handle the case when postId is not available
      console.error('postId is not available.');
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NUS SOC FORUM
          </Typography>
        
            <Button variant="outlined" style={{ marginLeft:'auto', color: 'white', borderColor: 'white'}} onClick={handleClick}>
                {buttonName}
            </Button>
        
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
