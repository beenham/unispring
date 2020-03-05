
import React from 'react';
import {Bar, Doughnut, Pie, Bubble} from 'react-chartjs-2';

function Dashboard(){

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

    var text_colour  = "#404040";


    var bar_data= {
        labels: ['NG - E', 'D', 'C', 'B', 'A'],
        datasets: [{
            label: 'Grade Break down',
            data: [2, 8, 13, 20, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    }

    var data_doughnut = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    }

    var data_pie = {
        labels: ['Male', 'Female', 'Other'],
        datasets: [{
            label: '# of Votes',
            data: [25, 15, 13],
            backgroundColor: colours,
            borderColor: border_colours,
            borderWidth: 1
        }]
    }

    var data_bubble = {
        labels: "Computer Science",
        datasets: [
            {
                label: ["China"],
                backgroundColor:'#0098E0',
                borderColor:'#0098E0',
                data: [{
                    x: 190,
                    y: 5.245,
                    r: 18
                }]
            }, {
                label: ["India"],
                backgroundColor:'#0098E0',
                borderColor:'#0098E0',
                data: [{
                    x: 200,
                    y: 7.526,
                    r: 20
                }]
            }, {
                label: ["Ireland"],
                backgroundColor:'#0098E0',
                borderColor:'#0098E0',
                data: [{
                    x: 250,
                    y: 6.994,
                    r: 24
                }]
            }, {
                label: ["Poland"],
                backgroundColor: '#0098E0',
                borderColor: '#0098E0',
                data: [{
                    x: 100,
                    y: 5.921,
                    r: 15
                }]
            }
        ]
    }



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
                            {/* <canvas id="chart-area" ></canvas> */}
                            <Pie data={data_pie} id="chart-area"/>
                        </article>
                    </div>
                    <div className="tile is-parent">
                        <article className="tile is-child box">
                            <p className="title is-4">One</p>
                            {/* <canvas id="chart-area2" ></canvas> */}
                            <Doughnut data={data_doughnut} />
                        </article>
                    </div>
                </div>
                <div className="tile is-parent ">
                    <article className="tile is-child box">
                        <p className="title is-4">One</p>
                        {/* <canvas id="bubble-chart" width="100" height="30"></canvas> */}
                        <Bubble data={data_bubble} width={100} height={30}/>
                    </article>
                </div>
            </div>
            <div className="tile is-parent">
                <article className="tile is-child box">
                    <div className="content">
                        <p className="title is-4">One</p>
                        {/* <canvas id="myChart" width="100" height="140"></canvas> */}
                        < Bar data={bar_data} id="myChart" width={100} height={145}/>
                    </div>
                </article>
            </div>
        </div>

    </div>);
}

export default Dashboard;