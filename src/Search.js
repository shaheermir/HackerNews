import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const Search = ({ onSearchChange, searchTerm, children, onSubmit }) => (
  <form>
    {children}
    <input type='text' onChange={onSearchChange} value={searchTerm} />
    <Button onClick={onSubmit}>Submit</Button>
  </form>
)

Search.propTypes = {
  onSearchChange: PropTypes.func,
  searchTerm: PropTypes.string,
  children: PropTypes.string,
  onSubmit: PropTypes.func
}

export default Search
