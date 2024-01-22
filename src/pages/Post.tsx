import React from 'react'
import CreatePost from '../components/CreatePost'
import Box from '@mui/joy/Box';
import NavbarWithoutButton from '../components/NavbarWithoutButton';
import { Button as BaseButton, buttonClasses } from '@mui/base/Button';
import { styled } from '@mui/system';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Post = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: '',
        content: '',
      });
    
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };      
    
    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        try {
            const defaultUserId = 1;
            console.log('Data to be posted:', {
                post: {
                  ...formData,
                  user_id: defaultUserId,
                },
              });
            await axios({
                method: 'POST',
                url: 'http://localhost:3000/api/v1/posts',
                // headers: {
                //   'Content-Type': 'application/json', // Adjust as needed
                // },
                data: {
                  post: {
                    ...formData,
                    user_id: defaultUserId,
                  },
                },
              });
        
              navigate('/');
            } catch (error: any) {
              console.error(error.response.data); // Use error.response.data for detailed error information
              // Handle the error as needed
        }
    };
      
    return (
        <>
            <NavbarWithoutButton />
            <Box
                display="flex"
                flexDirection="column" // Add this line to stack components vertically
                justifyContent="center"
                alignItems="center"
                minHeight="50vh"
                minWidth="100vw"
            >
                {/* BEGIN: ed8c6549bwf9 */}
                <CreatePost title="Topic*" type="text" name="topic" value={formData.topic} onChange={handleChange} />
                <CreatePost title="Content*" type="text" name="content" value={formData.content} onChange={handleChange} />
                {/* END: ed8c6549bwf9 */}
                <Button onClick={handleSubmit} slots={{ root: 'span' }} style={{ marginTop: '20px' }}>
                    Create Post
                </Button>
            </Box>
        </>
    )
}

export default Post