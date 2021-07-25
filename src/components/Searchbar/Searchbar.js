import React, { Component } from "react";


class Searchbar extends Component{ 
  state = {query: ''}
//const Searchbar=()=>(


handleChange =element=>{
  this.setState({query: element.currentTarget.value})
}
handleSubmit=element=>{
  element.preventDafault();
  this.props.onSubmit(this.state.query)
  this.setState({query:''})
}

  render(){
    return (
      <div>
      <header className="Searchbar">
  <form className="SearchForm" onSubmit={this.handleSubmit}>
    <button type="submit" className="SearchForm-button">
      <span className="SearchForm-button-label">Search</span>
    </button>

    <input
      className="SearchForm-input"
      type="text"
      // autocomplete="off"
      // autofocus
      placeholder="Search images and photos"
      value={this.state.query}
      onChange={this.handleChange}
    />
  </form>
  
</header>
</div>
    )


  }



// )
}





export default Searchbar;