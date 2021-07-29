import React, { Component } from 'react';
import imagesApi from './components/imagesApi/imagesApi';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem'
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from 'react-loader-spinner';
import './styles.css';
class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    currentPageImages: [],
    searchQuery: '',
    isLoading: false,
    error: null,
    largeImage: '',
    showModal: false,
    modalUrl: '',
    modalAlt: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
  } 
  onChangeQuery = searchQuery => {
    this.setState({ 
      searchQuery: searchQuery, 
      currentPage: 1, 
      hits: [], 
      error: null, 
    })
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))
  }
  fetchHits = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };
    this.setState({ isLoading: true });
    imagesApi
    .fetchHits(options)
    .then(hits => {
      this.setState( prevState => ({
        hits: [...prevState.hits, ...hits], 
        currentPage: prevState.currentPage + 1,
        currentPageImages: [...hits], 
      }));
      if (hits.length === 0) {
          this.setState({
            error: 'Nothing was find by your query. Try again.',});
      }})
      .then(() => {
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth',
                })
              })
    .catch(error => this.setState({ error }))
    .finally(() => this.setState({ isLoading: false }));
  };
  onClickImageGalleryItem = e => {
    this.setState({
      modalUrl: e.currentTarget.getAttribute('url'),
      modalAlt: e.currentTarget.getAttribute('alt'),
    });
    this.toggleModal();
  };
  render() {
    const { hits, currentPageImages, isLoading, error, showModal, modalAlt, modalUrl } = this.state;
    const shouldRenderLoadMoreButton = !(currentPageImages.length < 12) && !isLoading;
    return (
      <>
        <Searchbar onChangeQuery={this.onChangeQuery} />
        {error && (
          <p >
           {error}
          </p>
        )}
        <ImageGallery>
          {hits.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem key={id} alt={tags} src={webformatURL} url={largeImageURL} onClick={this.onClickImageGalleryItem} />
          ))}
        </ImageGallery>

        {isLoading && 
       
        <Loader 
        style={{textAlign: 'center'}}
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs 
        /> }     
                    
        {shouldRenderLoadMoreButton && <Button  onfetchHits={this.fetchHits}/> }

        {showModal && (
          <Modal src={modalUrl} alt={modalAlt} onClose={this.toggleModal} />
        )}  
      </>      
    )    
  }   
};
export default App;
