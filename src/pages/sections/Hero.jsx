import React from 'react'
import "./Hero.css"
import Search from '../../components/Search';

const Hero = ({ onSearch, searchTerm, setSearchTerm, suggestions, onInputChange }) => {

  return (
    <div className='hero'>
      <h1 className='heading'>RecipeBook</h1>
      {/* <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={onSearch}
        onInputChange={onInputChange}
        suggestions={suggestions}
        enableSuggestions={true}
      /> */}
    </div>
  )
}

export default Hero