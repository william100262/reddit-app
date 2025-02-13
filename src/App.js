import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import PostList from './components/PostList/PostList';
import PostDetail from './components/PostDetail';
import Sidebar from './components/SideBar';

function App() {
  const [query, setQuery] = useState();
  const navigate = useNavigate();

  //search functionailty 
  const handleSearchChange = (event) => {
      setQuery(event.target.value);
  };
  
  const handleSearchSumbit = (event) => {
      event.preventDefault();

      const currentParams = new URLSearchParams(window.location.search);
      const currentSubReddit = currentParams.get("query") || "cats";
      
      navigate(`/?query=${currentSubReddit}&search=${query}`);
  };

  return (
    <div style={pageLayoutStyle}>
      <Header 
        query={query}
        onSearchChange={handleSearchChange}
        OnSearchSumbit={handleSearchSumbit}
      />
      <div style={contentLayoutStyle}>
        <Sidebar />
        <div style={mainContentStyle}>
          <Routes>
            <Route path = "/" element = {<PostList query={query} />} />
            <Route path = "/post/:id" element = {<PostDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const pageLayoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}

const contentLayoutStyle = {
  display: 'flex',
  flexGrow: 1,
};

const mainContentStyle = {
  
  padding: '20px',
  width: '100%',
};


export default App;