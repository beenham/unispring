
import React from 'react';

function Dashboard(){
      return (<div className="main-box" id="analytics">
      <section className="hero is-dark">
         <div className="hero-body">
           <div className="container">
             <h1 className="title">
               University of Springfield
             </h1>
             <h2 className="subtitle">
               Analytics
             </h2>
           </div>
         </div>
       </section>
       <nav className="level">
  
         
         <div className="level-item has-text-centered">
            <div>
              <p className="heading">1st Stage</p>
              <p className="title">456K</p>
              <hr id="border-one" />
            </div>
          </div>
          
  
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">2nd Stage</p>
              <p className="title">456K</p>
              <hr id="border-two" />
            </div>
          </div>
          
  
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">3rd Stage</p>
              <p className="title">456K</p>
              <hr id="border-three" />
            </div>
          </div>
          
  
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">4th Stage</p>
              <p className="title">456K</p>
              <hr id="border-four" />
            </div>
          </div>
          
  
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Masters</p>
              <p className="title">456K</p>
              <hr id="border-five" />
            </div>
          </div>
          
  
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Phd</p>
              <p className="title">456K</p>
              <hr id="border-six" />
            </div>
          </div>
          
  
       </nav>
  
       <div className="tile is-ancestor">
         <div className="tile is-vertical is-8">
           <div className="tile">
             <div className="tile is-parent">
               <article className="tile is-child box">
                 <p className="title is-4">One</p>
                   <canvas id="chart-area" ></canvas>
               </article>
             </div>
             <div className="tile is-parent">
               <article className="tile is-child box">
                 <p className="title is-4">One</p>
                     <canvas id="chart-area2" ></canvas>
               </article>
             </div>
           </div>
           <div className="tile is-parent ">
             <article className="tile is-child box">
               <p className="title is-4">One</p>
                 <canvas id="bubble-chart" width="100" height="30"></canvas>
             </article>
           </div>
         </div>
         <div className="tile is-parent">
           <article className="tile is-child box">
             <div className="content">
               <p className="title is-4">One</p>
               <canvas id="myChart" width="100" height="140"></canvas>
             </div>
           </article>
         </div>
       </div>
        
   </div>);
  }

  export default Dashboard;