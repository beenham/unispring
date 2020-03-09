
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
async function getGradeData(data) {
    let data_json;
    let dataMap = new Map();
    let grade_letters = [];
    let grade_letters_data = [];
    for (const item of data) {
        data_json = await fetch(item._links.grades.href).then(res => res.json());
        for (const grade of data_json._embedded.grades) {
            if (!dataMap.has(grade.grade)) {
                dataMap.set(grade.grade, 1);
            } else {
                dataMap.set(grade.grade, dataMap.get(grade.grade) + 1);
            }
        }
        for (let [key, value] of dataMap) {
            grade_letters.push(key);
            grade_letters_data.push(value);
        }


        item["grade_data"] = {
            labels: grade_letters,
            datasets: [{
                label: 'Grade Break down',
                data: grade_letters_data,
                backgroundColor: colours,
                borderColor: border_colours,
                borderWidth: 1
            }]
        };

        grade_letters = [];
        grade_letters_data = [];
        dataMap.clear();
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
                dataMap.set(student.gender,1);
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
    const [otheritems, setotherItems] = useState([]);

    const fetchItems = async() =>{
        let student_module_names= [];
        const number_json_modules =  await fetch('http://localhost:8080/api/modules').then(res => res.json());
        const data_json =  await fetch('http://localhost:8080/api/modules?size='  + number_json_modules.page.totalElements).then(res => res.json());
        let student_modules = await fetch("http://localhost:8080/api/students/220/modules").then(res => res.json());
        student_modules = student_modules._embedded.modules.filter(function(item){
            student_module_names.push(item.name);
            return item.year.value == "2019";
        });

        let data_j = data_json._embedded.modules.filter(function(item){
            return item.year.value == "2019";
        }).filter(function(item){
            return student_module_names.includes(item.name) === false;
        });

        student_modules = await getCoordinator(student_modules);
        student_modules = await getStudentGenderData(student_modules);
        student_modules = await getGradeData(student_modules);

        data_j = await getCoordinator(data_j);
        data_j = await getStudentGenderData(data_j);
        data_j = await getGradeData(data_j);

        setItems(student_modules);
        setotherItems(data_j);
    };
    return(
        <div id="infoPage">
        <div className="main-box" id="modules">
            <section className="hero">
                <div className="hero-body">
                    <div>
                        <i className="material-icons">apps</i>
                    </div>
                    <div className="container">
                        <h1 className="title">
                            University of Springfield
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
                        trimester={item.trimester} student_genders_data={item.student_genders_data}
                        grade_data={item.grade_data} renderPick={false} renderEdit={false} renderDrop={true}/>
            ))}

        </div>


            <section className="hero">
                <div className="hero-body">
                    <div>
                        <i className="material-icons">apps</i>
                    </div>
                    <div className="container">
                        <h1 className="title">
                            University of Springfield
                        </h1>
                        <h2 className="subtitle">
                            Other Modules
                        </h2>
                    </div>
                </div>
            </section>

        <div className="module-area">
            {otheritems.map(item =>(
                <Module key={item.id} name={item.name} code={item.code} coordinator={item.coordinator}
                        description={item.description} status={item.status} capacity={item.capacity}
                        trimester={item.trimester} student_genders_data={item.student_genders_data}
                        grade_data={item.grade_data} renderPick={true} renderEdit={false} renderDrop={false}/>
            ))}
        </div>
    </div>
        </div>);
}

export default ModuleArea;