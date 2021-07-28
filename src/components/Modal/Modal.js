// import React, { Component } from 'react';
// import styles from '../../styles.css'
// import {createPortal} from 'react-dom'
// // import PropTypes from 'prop-types';

// const modalRoot = document.querySelector('#modal-root')
// class Modal extends Component {
//   componentDidMount(){
//       window.addEventListener('keydown',this.handleKeyDomw)
//   }
//   componentWillUnmount(){
//     window.removeEventListener('keydown', this.handleKeyDomw)
//   }
//   handleKeyDomw =element=> {
//     if (element.code ==='Escape') {
//       this.props.onClose();
//     }
//   }
//   handleBackdropClick = event => {
//     if(event.currentTarget === event.target){
//       this.props.onClose();
//     }

//   }
//   render(){
//     return createPortal (
//     <div class={styles.Overlay} onClick={this.handleBackdropClick}>  
//   <div class={styles.Modal}>
//     <img src={this.props.src} alt={this.props.alt} />
//     {/* {this.props.children} */}
//   </div>
// </div>, modalRoot,



//     );


//   }



// }
// // Modal.propTypes = {
// //   children: PropTypes.node.isRequired,
// //   onClose: PropTypes.func.isRequired,
// // };

//  export default Modal;

import React, { Component} from 'react';
import { createPortal } from 'react-dom';
import styles from '../../styles.css'
// import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render(){
        const { src, alt } = this.props;
        return createPortal(
            <div className={styles.Overlay} onClick={this.handleOverlayClick}>
                <div className={styles.Modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>, 
            modalRoot,
        );
    }
}

export default Modal;