import React, { Component } from 'react'
import Search from './Search'
import Table from './Table'
import './App.css'

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
]

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      list: list,
      searchTerm: ''
    }
  }

  onDismiss = id => {
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    this.setState({ list: updatedList })
  }

  onSearchChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  render () {
    const { searchTerm, list } = this.state
    return (
      <div className='page'>
        <div className='interactions'>
          <Search onSearchChange={this.onSearchChange} searchTerm={searchTerm}>
            Search
          </Search>
        </div>
        <Table list={list} searchTerm={searchTerm} onDismiss={this.onDismiss} />
      </div>
    )
  }
}

export default App
