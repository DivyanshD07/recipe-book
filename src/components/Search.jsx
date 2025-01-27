import React, { useState } from 'react'
import './Search.css'

const Search = ({ searchTerm, setSearchTerm, onSearch, suggestions = [], onInputChange, enableSuggestions = false }) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch();
        setIsDropdownOpen(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (onInputChange) {
            onInputChange(value);
        }
        setIsDropdownOpen(enableSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        onSearch();
        setIsDropdownOpen(false);
    }

    return (
        <div className='search'>
            <form onSubmit={handleSearch} className='form'>
                <input
                    type="text"
                    placeholder='Serch for recipe...'
                    value={searchTerm}
                    onChange={handleChange}
                    className='input'
                />
                <button className='btn' type='submit'>Search</button>
            </form>
            {enableSuggestions && isDropdownOpen && suggestions.length > 0 && (
                <div className='dropdown'>
                    <ol
                        className='dropdown-lists'
                    >
                        {suggestions.map((suggestion, index) => (
                            <li
                                className='dropdown-list'
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ol>
                </div>

            )}
        </div>
    )
}

export default Search