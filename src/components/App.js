import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
  // handlers
  handleChangeType = (filterType) => {
    //update app state.filters.type
    this.setState(prevState => {
      return {
        ...prevState, 
        filters: {
          type: filterType
        }
      }
    })
  }

  handleFindPetClick = () => {
    let url
    if(this.state.filters.type === 'all') {
      url = '/api/pets'
    }else {
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(resp => resp.json())
    .then(pets => this.state.pets = pets)
  }

  handleAdoptPet = (id) => {
    let p
    for(p of this.state.pets) {
      if(p.id == id) {
        p.isAdopted = true
      }
    }
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFindPetClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
