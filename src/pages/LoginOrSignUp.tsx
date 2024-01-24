import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import NavbarForLoginOrSignUp from '../components/NavbarForLoginOrSignUp';

const LoginOrSignUp = () => {
  return (
    <div>
        <NavbarForLoginOrSignUp />
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
                Join the Forum!
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph sx = {{textAlign: "center"}}>
              Don't Miss the Chance to join the NUS SOC Community! Sign up or Login to enjoy.
              </Typography>
        </div>
        <Box display="flex" justifyContent="center" alignItems="center">
            <a href="/login" style={{textDecoration: 'none'}}>
                <Button size="large" variant="contained" style={{marginRight: 20}}>Login</Button>
            </a>
            <a href="/signup" style={{textDecoration: 'none'}}>
                <Button size="large" variant="outlined">Sign Up</Button>
            </a>
        </Box>
    </div>
  )
}

export default LoginOrSignUp