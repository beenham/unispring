
import React, {useState, useEffect, Fragment} from 'react';
import {Bar, Doughnut, Pie, Bubble} from 'react-chartjs-2';
import DashboardStat from "./dashboardStat";
import Chart from "react-google-charts";

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
            dataMap.set(item.stage,1);
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
            dataMap.set(gradeData.grade,1);
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

async function getGenderData(data, number_one, number_two, number_three){

    let dataMap = new Map();
    let student_genders = [];
    let student_genders_data = [];

    for (const student of data) {
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

    return  {
        labels: student_genders,
        datasets: [{
            data: student_genders_data,
            backgroundColor: [getcolour(number_one), getcolour(number_two), getcolour(number_three)],
            borderColor: "#fff",
            borderWidth: 1
        }]};
}

function getNationalityData(data){
    let dataMap = new Map();
    let country_data = [['Country', 'Popularity']];

    for (const student of data) {
        if(!dataMap.has(student.nationality)){
            dataMap.set(student.nationality,1);
        }else{
            dataMap.set(student.nationality, dataMap.get(student.nationality) + 1);
        }
    }

    for (let [key, value] of dataMap) {
        let temp_data = [];
        temp_data.push(key);
        temp_data.push(value);
        country_data.push(temp_data);
    }
    return country_data;
}

function Dashboard(){

    useEffect(() => {
        fetchStudents();
    }, []);

    const [items, setItems] = useState([]);

    const fetchStudents = async() =>{
        const number_json =  await fetch('http://localhost:8080/api/students').then(res => res.json());
        const data_json =  await fetch('http://localhost:8080/api/students/?size=' + number_json.page.totalElements).then(res => res.json());
        let data_j = data_json._embedded.students.filter(function(item){return item;});

        const number_json_staff =  await fetch('http://localhost:8080/api/staff').then(res => res.json());
        const data_json_staff =  await fetch('http://localhost:8080/api/staff/?size=' + number_json_staff.page.totalElements).then(res => res.json());
        let data_j_staff = data_json_staff._embedded.staff.filter(function(item){return item;});

        const number_json_grades =  await fetch('http://localhost:8080/api/grades').then(res => res.json());
        const data_json_grades =  await fetch('http://localhost:8080/api/grades/?size='  + number_json_grades.page.totalElements).then(res => res.json());
        let data_j_grades = data_json_grades._embedded.grades.filter(function(item){return item;});

        let stageMap = studentStageNumbers(data_json._embedded.students);

        data_json["stage_one"] = stageMap.get("ONE");
        data_json["stage_two"] = stageMap.get("TWO");
        data_json["stage_three"] = stageMap.get("THREE");
        data_json["stage_four"] = stageMap.get("FOUR");
        data_json["stage_M"] = stageMap.get("MASTERS");
        data_json["stage_D"] = stageMap.get("DOCTORATE");
        data_json["studentGenderBreakDown"] = await getGenderData(data_j, 0, 4 , 3);
        data_json["staffGenderBreakDown"] = await getGenderData(data_j_staff, 2 ,5 , 1);
        data_json["gradesBreakdown"] = await getGradeData(data_j_grades);
        data_json["nationalityBreakdown"] = getNationalityData(data_j);
        setItems(data_json);
    };


    return (
        <div id="infoPage">
        <div  id="analytics">
        <section className="hero">
            <div className="hero-body">
                <div>
                    <i className="material-icons">show_chart</i>
                </div>
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
            <DashboardStat name="Stage One" number={items.stage_one} id={"border-one"}/>
            <DashboardStat name="Stage Two" number={items.stage_two} id={"border-two"}/>
            <DashboardStat name="Stage Three" number={items.stage_three} id={"border-three"}/>
            <DashboardStat name="Stage Four" number={items.stage_four} id={"border-four"}/>
            <DashboardStat name="Masters" number={items.stage_M} id={"border-five"}/>
            <DashboardStat name="Doctorate" number={items.stage_D} id={"border-six"}/>
        </nav>

        <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
                <div className="tile">
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-6">Student Gender Breakdown</p>
                            <Pie data={items.studentGenderBreakDown} id="chart-area" />
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-6">Staff Gender Breakdown</p>
                            <Doughnut data={items.staffGenderBreakDown} />
                        </article>
                    </div>
                </div>
                <div className="tile is-parent ">
                    <article className="tile is-child box">
                        <p className="title is-6">Student Nationality Breakdown</p>
                        <Chart id="dashboard-map"
                            width="100%"
                            height={'300px'}
                            chartType="GeoChart"
                            data={items.nationalityBreakdown}
                            options={{
                                colorAxis: { colors: ['#0098E0', '#F1DD84', '#B86377'] },
                                datalessRegionColor: '#efefef',
                                defaultColor: '#efefef',
                            }}
                            mapsApiKey="AIzaSyCCEHBCiHsha1jc3w_JO4UaxA1iNH7AUGY"
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </article>
                </div>
            </div>
            <div className="tile is-parent">
                <article className="tile is-child box">
                    <div className="content">
                        <p className="title is-6">Average Grade Break Down (Undergraduate)</p>
                        < Bar data={items.gradesBreakdown} id="myChart" width={100} height={150}/>
                    </div>
                </article>
            </div>
        </div>

    </div>
        </div>
    );
}

export default Dashboard;