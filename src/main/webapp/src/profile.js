
import React from 'react';

function Profile(){

      return(<div id="profile" className="main-box">
      <div className="box" id="profile-box">
         <article className="media">
           <div className="media-left">
             <figure className="image is-128x128">
               <img src="images/user.jpg" alt="" className="is-rounded" />
             </figure>
           </div>
           <div className="media-content">
             <div className="content profile-title-info">
               
                 <h2>John Smith</h2> 
                 <span className="tag is-info">4th year</span>
                 <span className="tag is-warning is-light" id="edit-button">Edit Profile</span>
                 <br />
               
             </div>
             <div className="tabs is-small" id="tabs">
               <ul>
                 <li className="is-active" data-tab="4">
                   <a>
                     <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">info</i></span>
                     <span>About</span>
                   </a>
                 </li>
                 <li data-tab="5">
                   <a>
                     <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">school</i></span>
                     <span>Grade</span>
                   </a>
                 </li>
                 <li data-tab="6">
                  <a>
                    <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">euro_symbol</i></span>
                    <span>Fees</span>
                  </a>
                </li>
               </ul>
             </div>
             <div id="tab-content">
               <section className="is-active" data-content="4">
                 <div className="main-box">
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
                  </div>
               </section>
               <section data-content="5" >
                  <div className="main-box">
                   <table className="table is-bordered is-fullwidth">
                     <thead>
                        <tr>
                           <td>Subject</td>
                           <td>Percentage</td>
                           <td>Grade</td>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>Secure Software Engineering</td>
                           <td>85%</td>
                           <td>B+</td>   
                         </tr>   
               
                     </tbody>
                  </table>
                  </div>
               </section>
  
               <section data-content="6">
                  <div id="profile-fees">
                   <div className="fee-box">
                     <h1>Amount due:</h1>
                     <i className="material-icons" id="euro-symbol">euro_symbol</i>
                     <h4>256.00</h4>
                  </div>
                  <div className="fee-box" id="fee-payment-box">
                     <h1>Payment area</h1>
                     <div className="field">
                        <p className="control has-icons-left is-small has-icons-right">
                          <input className="input is-small" type="text" placeholder="Name" />
                          <span className="icon is-small is-left">
                           <i className="material-icons">person</i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                          </span>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control has-icons-left has-icons-right is-small">
                          <input className="input is-small" type="number" placeholder="Card Number" />
                          <span className="icon is-small is-left">
                           <i className="material-icons">credit_card</i>
                          </span>
                          <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                          </span>
                        </p>
                      </div>
  
                      <div className="grouped-elements">
  
                        <div className="field ten-p">
                           <p className="control has-icons-left has-icons-right is-small">
                             <input className="input is-small" type="Number" placeholder="Amount to pay" />
                             <span className="icon is-small is-left">
                              <i className="material-icons">euro_symbol</i>
                             </span>
                             <span className="icon is-small is-right">
                               <i className="fas fa-check"></i>
                             </span>
                           </p>
                         </div>
  
                         <div className="field ten-p">
                           <p className="control has-icons-left has-icons-right is-small">
                             <input className="input is-small" type="date" placeholder="Expiration date" />
                             <span className="icon is-small is-left">
                              <i className="material-icons">date_range</i>
                             </span>
                             <span className="icon is-small is-right">
                               <i className="fas fa-check"></i>
                             </span>
                           </p>
                         </div>
  
                         <div className="field">
                           <p className="control has-icons-left has-icons-right is-small">
                             <input className="input is-small" type="number" placeholder="CVV number" />
                             <span className="icon is-small is-left">
                              <i className="material-icons"> security</i>
                             </span>
                             <span className="icon is-small is-right">
                               <i className="fas fa-check"></i>
                             </span>
                           </p>
                         </div>
  
                      </div>
  
                      <div className="field is-grouped is-grouped-right">
                        <p className="control">
                          <a className="button is-small is-primary">
                            Submit
                          </a>
                        </p>
                        <p className="control">
                          <a className="button is-small is-light">
                            Cancel
                          </a>
                        </p>
                      </div>
  
                  </div>
                  </div>
                </section>
            
             </div>
  
           </div>
         </article>
       </div>
   </div>);
  }

  export default Profile;