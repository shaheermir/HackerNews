import React, { Component } from 'react'
import Search from './Search'
import Table from './Table'
import Button from './Button'
import './App.css'

const DEFAULT_QUERY = 'redux'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = '100'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    }
  }

  setSearchTopStories = result => {
    const { hits, page } = result
    const oldHits = page !== 0 ? this.state.result.hits : []

    const updatedHits = [...oldHits, ...hits]

    this.setState({
      result: { hits: updatedHits, page }
    })
  }

  fetchSearchTopStories = (searchTerm, page) => {
    const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
  }

  onDismiss = id => {
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id)
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    })
  }

  onSearchChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  onSearchSubmit = e => {
    e.preventDefault()
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  componentDidMount () {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  render () {
    const { searchTerm, result } = this.state
    console.log(result)
    const page = (result && result.page) || 0

    return (
      <div className='page'>
        <div className='interactions'>
          <Search
            onSearchChange={this.onSearchChange}
            searchTerm={searchTerm}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        {result ? <Table list={result.hits} onDismiss={this.onDismiss} /> : null}
        <div className='interactions'>
          <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
            Next
          </Button>
        </div>
      </div>
    )
  }
}

export default App
