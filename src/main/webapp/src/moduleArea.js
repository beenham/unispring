
import React, {useState, useEffect} from 'react';
import ModuleModal from './moduleModal';
import Module from './module';



function ModuleArea(){
  
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async() =>{
    // var oReq = new XMLHttpRequest();
    // var yourData;
    // oReq.open("GET", "http://localhost:8080/modules");
    // oReq.responseType = 'text';
    // oReq.onload = function () {
    //     if (oReq.readyState === oReq.DONE) {
    //         if (oReq.status === 200) {

    //           var json = JSON.parse(oReq.responseText);
    //           yourData = json.Data;
    //         }
    //     }
    // };
    // oReq.send();
    const data =  await fetch('http://localhost:8080/modules',{
      method: 'GET',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    console.log(data);
 }

      return(<div className="main-box" id="modules">
      <section className="hero is-dark">
         <div className="hero-body">
           <div className="container">
             <h1 className="title">
               Modules
             </h1>
             <h2 className="subtitle">
               Your Modules
             </h2>
           </div>
         </div>
       </section>
  
       <div className="module-area">       
        <Module></Module>
        <ModuleModal></ModuleModal>
       </div>
  
  
       <section className="hero is-dark">
         <div className="hero-body">
           <div className="container">
             <h1 className="title">
               Modules
             </h1>
             <h2 className="subtitle">
               Other Modules
             </h2>
           </div>
         </div>
       </section>
  
       <div className="module-area">
          <Module></Module>
          <ModuleModal></ModuleModal>
       </div>
   </div>);
  }

  export default ModuleArea;