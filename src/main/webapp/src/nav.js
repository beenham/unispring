import React from 'react';

function Navigation(){
      return(<div id="sideMenu">
      <div className="has-text-centered">
         <div>
           <h1 className="title is-3 ">University of Springfield</h1>
         </div>
       </div>
       <figure className="image is-96x96">
         <img className="" src="logo.png"  alt=""/>
       </figure>
       <div className="has-text-centered">
         <div>
           <h2 className="heading">University of Springfield</h2>
         </div>
       </div>
      <aside className="menu">

         <p className="menu-label">
           General
         </p>
         <ul className="menu-list">
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">apps</i>
              </span>
                <a href="/modules">Modules</a>
            </li>
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">account_circle</i>
              </span>
                <a href="/profile">Profile</a>
              </li>
            <li>
              <span className="icon has-text-info">
                <i className="material-icons">show_chart</i>
              </span>
              <a href="/dashboard">Stats</a>
              </li>
         </ul>
         <p className="menu-label">
            Other
          </p>
          <ul className="menu-list">
            <li>
               <span className="icon has-text-info">
                  <i className="material-icons">settings</i>
                </span>
               <a>Settings</a>
            </li>
            <li>
               <span className="icon has-text-info">
                  <i className="material-icons">power_settings_new</i>
                </span>
               <a className="modal-button" data-target="#log-in-reg" aria-haspopup="true" >Logout</a>
            </li>
          </ul>
       </aside>
       <footer className="footer">
         <div className="has-text-centered">
             <h6>Copyright &copy University of Springfield</h6> 
         </div>
       </footer>
   </div>);
  }

  export default Navigation;