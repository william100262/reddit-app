import React from 'react';
import './headerStyles.css'
import catLogo from './catLogo.png';

function Header({ query, onSearchChange, OnSearchSumbit }) {
    return (
        <header>
            <div className='left-container'>
                <img className='logo' src={catLogo} alt= 'CatLogo'></img>
                <h1 className='title'>Cat Reddit</h1>
            </div>
            <div className='search-container'>

                <form onSubmit={OnSearchSumbit}>
                <input
                    className='search'
                    type="text"
                    value={query}
                    onChange={onSearchChange}
                    placeholder="Search CatReddit"
                />
                <button type="submit">Search</button>
                </form>
            </div>
        </header>
    );
}

export default Header;