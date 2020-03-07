
import React, {useState, useEffect, Fragment} from 'react';
import {Bar, Doughnut, Pie, Bubble} from 'react-chartjs-2';
import DashboardStat from "./dashboardStat";

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
function getcolour(num){
    return colours[num];
}


function studentStageNumbers(json_data){
    let dataMap = new Map();
    for (const item of json_data){
        if(!dataMap.has(item.stage)){
            dataMap.set(item.stage,0);
        }else{
            dataMap.set(item.stage, dataMap.get(item.stage) + 1);
        }
    }
    return dataMap;
}

async function getGradeData(data){

    let dataMap = new Map();
    let student_grades = [];
    let student_grades_data = [];

    for (const gradeData of data) {
        if(!dataMap.has(gradeData.grade)){
            dataMap.set(gradeData.grade,0);
        }else{
            dataMap.set(gradeData.grade, dataMap.get(gradeData.grade) + 1);
        }
    }
    for (let [key, value] of dataMap) {
        student_grades.push(key);
        student_grades_data.push(value);
    }

    return  {
        labels: student_grades,
        datasets: [{
            label: 'No. of students who achieved this grade',
            data: student_grades_data,
            backgroundColor: colours,
            borderColor: "#fff",
            borderWidth: 1
        }]};
}

async function getGenderData(data){

    let dataMap = new Map();
    let student_genders = [];
    let student_genders_data = [];

    for (const student of data) {
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

    return  {
        labels: student_genders,
        datasets: [{
            data: student_genders_data,
            backgroundColor: colours,
            borderColor: "#fff",
            borderWidth: 1
        }]};
}

function getNationalityData(data){
    let dataMap = new Map();
    let countries = [];
    let country_data = [];

    let data_list = [];

    for (const student of data) {
        if(!dataMap.has(student.nationality)){
            dataMap.set(student.nationality,0);
        }else{
            dataMap.set(student.nationality, dataMap.get(student.nationality) + 1);
        }
    }

    for (let [key, value] of dataMap) {
        countries.push(key);
        country_data.push(value);
    }

    for(let i = 0; i < countries.length; i++){
        data_list.push(
            {
                label: [countries[i]],
                backgroundColor:getcolour(i),
                borderColor:'#fff',
                data: [{
                    x: country_data[i],
                    y: 5,
                    r: (40*(country_data[i])/100)
                }]
            }
        );
    }

    return {
        labels: "Computer Science",
        datasets: data_list,
        options:{
            order:1
        }
    };
}

function Dashboard(){

    useEffect(() => {
        fetchStudents();
    }, []);

    const [items, setItems] = useState([]);

    const fetchStudents = async() =>{
        const data_json =  await fetch('http://localhost:8080/api/students/?size=250').then(res => res.json());
        let data_j = data_json._embedded.students.filter(function(item){return item;});

        const data_json_staff =  await fetch('http://localhost:8080/api/staff/?size=250').then(res => res.json());
        let data_j_staff = data_json_staff._embedded.staff.filter(function(item){return item;});

        const data_json_grades =  await fetch('http://localhost:8080/api/grades/?size=250').then(res => res.json());
        let data_j_grades = data_json_grades._embedded.grades.filter(function(item){return item;});

        let stageMap = studentStageNumbers(data_json._embedded.students);

        data_json["stage_one"] = stageMap.get("ONE");
        data_json["stage_two"] = stageMap.get("TWO");
        data_json["stage_three"] = stageMap.get("THREE");
        data_json["stage_four"] = stageMap.get("FOUR");
        data_json["stage_M"] = stageMap.get("MASTERS");
        data_json["stage_D"] = stageMap.get("DOCTORATE");
        data_json["studentGenderBreakDown"] = await getGenderData(data_j);
        data_json["staffGenderBreakDown"] = await getGenderData(data_j_staff);
        data_json["gradesBreakdown"] = await getGradeData(data_j_grades);
        data_json["nationalityBreakdown"] = getNationalityData(data_j);
        setItems(data_json);
    };


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
            <DashboardStat name="Stage One" number={items.stage_one}/>
            <DashboardStat name="Stage Two" number={items.stage_two}/>
            <DashboardStat name="Stage Three" number={items.stage_three}/>
            <DashboardStat name="Stage Four" number={items.stage_four}/>
            <DashboardStat name="Masters" number={items.stage_M}/>
            <DashboardStat name="Doctorate" number={items.stage_D}/>
        </nav>

        <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-4">Student Gender Breakdown</p>
                            <Pie data={items.studentGenderBreakDown} id="chart-area"/>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-4">Staff Gender Breakdown</p>
                            <Doughnut data={items.staffGenderBreakDown} />
                        </article>
                    </div>
                </div>
                <div className="tile is-parent ">
                    <article className="tile is-child box">
                        <p className="title is-4">Student Nationality Breakdown</p>
                        <Bubble data={items.nationalityBreakdown} width={100} height={30}/>
                    </article>
                </div>
            </div>
            <div className="tile is-parent">
                <article className="tile is-child box">
                    <div className="content">
                        <p className="title is-4">Average Grade Break Down (Undergraduate)</p>
                        < Bar data={items.gradesBreakdown} id="myChart" width={100} height={145}/>
                    </div>
                </article>
            </div>
        </div>

    </div>);
}

export default Dashboard;