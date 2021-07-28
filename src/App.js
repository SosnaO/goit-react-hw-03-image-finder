//import logo from './logo.svg';
// import './App.css';

import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar'
// import Loader from 'react-loader-spinner';
 //import Button from './components/Button/Button'
// import ImageGallery from './components/ImageGallery/ImageGallery'
import Loader from "react-loader-spinner";
import Modal from './components/Modal/Modal'

class App extends Component {
  state={
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL:'',
    url: '',
    alt: '',

  };
  //  componentDidMount(){
  //  axios.get('https://pixabay.com/api/?q=cat&page=1&key=21803950-62f4c86011510fd15fe85c0d2&image_type=photo&orientation=horizontal&per_page=12')
  //    .then(response =>{
  //      this.setState({
  //        images:response.data.hits,
  //       })
  //    });
  //  }
    componentDidUpdate(prevProps, prevState) {
      if (prevState.searchQuery !== this.state.searchQuery) {
        this.fetchHits()
      }
    }

     onChangeQuery = query => {
       this.setState({
         searchQuery: query,
          currentPage: 1,
           hits: [],
          error: null,
          });
      //  this.fetchHits();
      };

    fetchHits = () => {
  
      const { currentPage, searchQuery } = this.state;

      this.setState({ isLoading: true });
    

      axios
      .get(`https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=21803950-62f4c86011510fd15fe85c0d2&image_type=photo&orientation=horizontal&per_page=12`, )
      .then(response => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...response.data.hits],
          currentPage: prevState.currentPage +1,
        }));  
       })
       .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        
        // {this.state.error && <h1>The search is empty</h1>}
      })
       .catch(error => this.setState({ error }))
       .finally(() => this.setState({ isLoading: false }));
  

    };
    
    toggleModal = () => {
      this.setState(({ showModal }) => ({
        showModal: !showModal,
      }))
    }
  

    
     render(){

       return (<div>
         {/* <button type="button" onClick={this.toggleModal}>Откріть модалку</button> */}
         {/* {this.state.error && <h1>The search is empty</h1>} */}
         <Searchbar onSubmit={this.onChangeQuery}/>
       {/* <ImageGallery /> */}

       {/* {loading && (
          <Loader
            className="Overlay"
            // style={loaderStyles}
            type="BallTriangle"
            color="#00BFFF"
            height={200}
            width={200}
          />
        )} */}

       <ul className="ImageGallery">
    {/* <ImageGalleryItem /> */}
    {this.state.hits.map(({ id, webformatURL })=>(
      <li className="ImageGalleryItem" key={id}> 
  <img  src={webformatURL} alt="" className="ImageGalleryItem-image" />
</li>
    ))
    }
        
</ul>

{this.state.isLoading && <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />}
{/* <Button onFetchImages={this.fetchHits}/> */}
        {this.state.hits.length > 0 && !this.state.isLoading && (
        <button type="button" onClick={this.fetchHits}>
          Load more</button>
          )};

          {this.setState.showModal && 
          (<Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
          <img src={this.state.largeImageURL} alt={this.state.tag}/>
         </Modal>)};
          {/* <button type="button" onClick={this.toggleModal}>Закріть модалку</button> */}
          


       </div>

       );
       
     
     }





}

export default App;
