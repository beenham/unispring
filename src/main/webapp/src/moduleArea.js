
import React, {useState, useEffect} from 'react';
import Module from './module';

function ModuleArea(){

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async() =>{

        const data_json =  await fetch('http://localhost:8080/api/modules')
            .then(res => res.json());
        // .then(data => console.log('Output: ', data))
        // .catch(err => console.error(err));

        // let data_j = data_json.filter(function(item){console.log(item);return item.year.value == "2020";});
        console.log(data_json["_embedded"]);
        // setItems(data_j);
    };

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
            {items.map(item =>(
                <Module key={item.id} name={item.name} code={item.code} coordinator={item.coordinator.forename + " " + item.coordinator.surname} description={item.description} status={item.status} capacity={item.capacity} trimester={item.trimester}></Module>
            ))}

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
        </div>
    </div>);
}

export default ModuleArea;