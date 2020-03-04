import React from 'react';


function ModuleModal(){
      return(<div className="modal" id="myModal">
      <div className="modal-background"></div>
      <div className="modal-card custom-modal">
        <header className="modal-card-head">
          <p className="modal-card-title">Secure Software Engineering</p>
          <button className="delete modal-close" aria-label="close"></button>
        </header>
        <section className="modal-card-body">
         <div className="image-box">
            <img src="code1 (1).jpg" alt="" />
         </div>
         <div className="modal-details">
            <div className="module-title-tag">
               <h2 className="title is-4">Secure Software Engineering</h2>
               <span className="tag is-info">COMP46060</span>
            </div>
            <div className="tabs is-small" id="tabs">
               <ul>
                 <li className="is-active" data-tab="1">
                   <button>
                     <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">info</i></span>
                     <span>About</span>
                   </button>
                 </li>
                 <li data-tab="2">
                   <button>
                     <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">show_chart</i></span>
                     <span>Stats</span>
                   </button>
                 </li>
               </ul>
             </div>
             <div id="tab-content">
               <section className="is-active main-box" data-content="1">
                  <table className="table is-fullwidth">
                    
                     <tbody>
                        <tr>
                           <td>Name:</td>
                           <td>Jack Daniels</td>
                        </tr>
                        <tr>
                           <td>Email:</td>
                           <td>jack.daniels@ucdconnect.ie</td>
                        </tr>
                        <tr>
                           <td>Stage:</td>
                           <td>4</td>
                        </tr>
                        <tr>
                           <td>Bio:</td>
                           <td>Im in fourth year and fyp is going shite</td>
                        </tr>
                     
                     </tbody>
                  </table>
               </section>
               <section data-content="2" id="module-charts" >
                 <div id="tag-area">
                  <span className="tag is-info">2019 Data</span>
                  <span className="tag is-light">2018 Data</span>
                  <span className="tag is-light">2017 Data</span>
                  <span className="tag is-light">2016 Data</span>
                 </div>
                 <div>
                  <div className="tile is-ancestor main-box">
                     <div className="tile is-horizontal is-12">
                       
                        <div className="tile is-parent box">
                           <article className="tile is-child">
                             <canvas id="module-pie" width="100" height="60"></canvas>
                           </article>
                         </div>
                         <div className="tile is-parent box">
                           <article className="tile is-child">
                             <canvas id="module-bar" width="100" height="60"></canvas>
                           </article>
                         </div>
                     </div>
                   </div>
                 </div>
               </section>
            
             </div>
 
          
 
        
         </div>
        </section>
        
      </div>
    </div>);
  }

  export default ModuleModal;