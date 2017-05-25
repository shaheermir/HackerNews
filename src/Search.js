import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ onSearchChange, searchTerm, children }) => (
  <form>
    {children}
    <input type='text' onChange={onSearchChange} value={searchTerm} />
  </form>
)

Search.propTypes = {
  onSearchChange: PropTypes.func,
  searchTerm: PropTypes.string,
  children: PropTypes.string
}

export default Search
