
import React from 'react';

function Module (){


    return(<div className="card">
            <div className="card-image">
               <figure className="image is-4by3">
               <img src="images/code1 (1).jpg" alt="" />
               </figure>
            </div>
            <div className="card-content">
               <div className="media">
               <div className="media-content">
                  <p className="title is-4">Secure Software</p>
                  <p className="subtitle is-6">COMP46406</p>
                  
               </div>
               </div>
         
               <div className="content">
               <span className="small-text">By Lillian Pasquele</span>
               </div>
            </div>
            <footer className="card-footer">
               <button className="card-footer-item modal-button" data-target="#myModal" aria-haspopup="true">View</button>
               <button className="card-footer-item">Drop</button>
               <button className="card-footer-item">Pick</button>
               <button className="card-footer-item">Modify</button>
            </footer>
         </div>);
}

export default Module;