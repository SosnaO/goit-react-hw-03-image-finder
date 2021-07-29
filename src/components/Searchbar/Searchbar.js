    import React, { Component } from "react";
    class Searchbar extends Component{ 
    state = { query: '' };

    handleChange = element => {
        this.setState({ query: element.currentTarget.value, })
    };
    handleSubmit=element=>{
    element.preventDefault();
        if (this.state.query.length !== 0) {
            this.props.onChangeQuery(this.state.query)     
        } 
    }
    render(){
        return (
    <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
            <button type="submit" onSubmit={this.handleSubmit} className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
            </button>
            <input
                className="SearchForm-input"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.query}
                onChange={this.handleChange}
            />
         </form>
    </header>
    );
  }
}
export default Searchbar;