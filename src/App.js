//import logo from './logo.svg';
// import './App.css';

import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar'
// import ImageGallery from './components/ImageGallery/ImageGallery'

class App extends Component {
  state={
    images:[],
    // search:''
  };
  //  componentDidMount(){
  //  axios.get('https://pixabay.com/api/?q=cat&page=1&key=21803950-62f4c86011510fd15fe85c0d2&image_type=photo&orientation=horizontal&per_page=12')
  //    .then(response =>{
  //      this.setState({images:response.data.hits,})
  //    });
  //  }

     onChangeQuery=query =>{
      axios.get(`https://pixabay.com/api/?q=${query}&page=1&key=21803950-62f4c86011510fd15fe85c0d2&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response =>{
        this.setState({images:response.data.hits,})
      });
    }
     
     render(){

       return <div>
         <Searchbar onSubmit={this.onChangeQuery}/>
       {/* <ImageGallery /> */}

       <ul className="ImageGallery">
    {/* <ImageGalleryItem /> */}
    {this.state.images.map(({ id, webformatURL })=>(
      <li className="ImageGalleryItem" key={id}> 
  <img src={webformatURL} alt="" className="ImageGalleryItem-image" />
</li>


    ))



    }
    

    
</ul>
       </div>

       
       
     
     }





}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
