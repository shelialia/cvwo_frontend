import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import CreatePost from './pages/Post';
import DisplayPost from './pages/PostDisplay';
import Comment from './pages/Comment';
import Login from './pages/Login';
import PostUpdate from './pages/PostUpdate';
import CommentUpdate from './pages/CommentUpdate';

function App() {
  return (
    <Router>
    <div className='bg-gradient-to-br from-cyan-700 to-blue-700'>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/posts" element={<CreatePost />} />
      <Route path="/postdisplay/:postId" element={<DisplayPost />} />
      <Route path="/postdisplay/:postId/comment" element={<Comment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/postupdate/:postId" element={<PostUpdate />} />
      <Route path="/postdisplay/:postId/commentupdate/:commentId" element={<CommentUpdate />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
