import React from 'react'
import CreateComment from '../components/CreateComment'
import Box from '@mui/joy/Box';
import NavbarWithoutButton from '../components/NavbarWithoutButton';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

const blue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const Button = styled(BaseButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    background-color: ${blue[500]};
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: 1px solid ${blue[500]};
    box-shadow: 0 2px 1px ${
        theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(45, 45, 60, 0.2)'
    }, inset 0 1.5px 1px ${blue[500]}, inset 0 -2px 1px ${blue[600]};

    &:hover {
        background-color: ${blue[600]};
    }

    &.${buttonClasses.active} {
        background-color: ${blue[700]};
        box-shadow: none;
        transform: scale(0.99);
    }

    &.${buttonClasses.focusVisible} {
        box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[500] : blue[500]};
        outline: none;
    }
`,
);

const Login = () => {
    return (
        <>
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
                Login using your name to enjoy the Forum!
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph sx = {{textAlign: "center"}}>
              Enjoy yourself!
              </Typography>
        </div>
            
            <Box
                display="flex"
                flexDirection="column" // Add this line to stack components vertically
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
                minWidth="100vw"
            >
                {/* <CreateComment title="Your Name*" /> */}

                <Button slots={{ root: 'span' }} style={{ marginTop: '20px' }}>Comment</Button>
            </Box>
            
        </>
    )
}

export default Login