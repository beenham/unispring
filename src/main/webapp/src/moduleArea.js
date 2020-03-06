
import React, {useState, useEffect} from 'react';
import Module from './module';

var colours = [
    'rgb(0, 152, 224, 0.8)',
    'rgb(94, 188, 219, 0.8)',
    'rgb(241, 221, 132, 0.8)',
    'rgb(245, 181, 135, 0.8)',
    'rgb(247, 137, 121, 0.8)',
    'rgb(184, 99, 119, 0.8)'
];
var border_colours = [
    '#0098E0',
    '#3C778B',
    '#F1DD84',
    '#F5B587',
    '#F78979',
    '#B86377'
];

 async function getCoordinator(data){
     let data_json;
    for (const item of data) {
        data_json = await fetch(item._links.coordinator.href).then(res => res.json());
        item["coordinator"] = data_json["forename"] +" "+ data_json["surname"];
    }
    return data;
 }

async function getStudentGenderData(data){
    let data_json;
    let dataMap = new Map();
    let student_genders = [];
    let student_genders_data = [];
    for (const item of data) {
        data_json = await fetch(item._links.students.href).then(res => res.json());
        for (const student of data_json._embedded.students) {
            if(!dataMap.has(student.gender)){
                dataMap.set(student.gender,0);
            }else{
                dataMap.set(student.gender, dataMap.get(student.gender) + 1);
            }
        }
        for (let [key, value] of dataMap) {
            student_genders.push(key);
            student_genders_data.push(value);
        }

        item["student_genders_data"] = {
            labels: student_genders,
            datasets: [{
                label: '# of Votes',
                data: student_genders_data,
                backgroundColor: colours,
                borderColor: border_colours,
                borderWidth: 1
            }]};
        student_genders = [];
        student_genders_data = [];
        dataMap.clear();
    }

    return data;
}

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
        let data_j = data_json._embedded.modules.filter(function(item){return item.year.value == "2020";});
        data_j = await getCoordinator(data_j);
        data_j = await getStudentGenderData(data_j);
        // console.log(data_j);
        setItems(data_j);
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
                <Module key={item.id} name={item.name} code={item.code} coordinator={item.coordinator}
                        description={item.description} status={item.status} capacity={item.capacity}
                        trimester={item.trimester} student_genders_data={item.student_genders_data}></Module>
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