
import React, {Fragment, useState} from 'react';
import Modal from 'react-modal';
import ModuleIndicator from './moduleIndicator';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {Bar, Pie} from 'react-chartjs-2';

function ModuleIndicatorArea(props){
    let full;
    full = props.status === "FULL";
    if(full){
        return <ModuleIndicator className="tag is-danger" text={"Module Full"}/>
    }else{
        return <ModuleIndicator className="tag is-warning" text={"Module Terminated"}/>
    }
}

function Module (props){

    const [modalIsOpen, setModalIsOpen] = useState(false);

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



    return(
        <Fragment>
            <Modal isOpen={modalIsOpen}>

                <div className="custom-modal">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{props.name}</p>
                        <button className="delete" aria-label="close" onClick={() => setModalIsOpen(false)}/>
                    </header>
                    <section className="modal-card-body">
                        <div className="image-box">
                            <img src="images/code1 (1).jpg" alt="" />
                        </div>
                        <div className="modal-details">
                            <div className="module-title-tag">
                                <h2 className="title is-4">{props.name}</h2>
                                <span className="tag is-info">{props.code}</span>
                                <ModuleIndicatorArea status={props.status}/>
                            </div>

                            <Tabs>
                                <TabList>
                                    <Tab>
                                        <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">info</i></span>
                                        <span>About</span>
                                    </Tab>
                                    <Tab>
                                        <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">show_chart</i></span>
                                        <span>Stats</span>
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <section className="main-box">
                                        <table className="table is-fullwidth">

                                            <tbody>
                                            <tr>
                                                <td>Module Name:</td>
                                                <td>{props.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Module coordinator</td>
                                                <td>{props.coordinator}</td>
                                            </tr>
                                            <tr>
                                                <td>Capacity</td>
                                                <td>{props.capacity}</td>
                                            </tr>
                                            <tr>
                                                <td>Module Status</td>
                                                <td>{props.status}</td>
                                            </tr>
                                            <tr>
                                                <td>Trimester</td>
                                                <td>{props.trimester}</td>
                                            </tr>
                                            <tr>
                                                <td>Module Description:</td>
                                                <td>{props.description}</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </section>


                                </TabPanel>
                                <TabPanel>
                                    <section id="module-charts" >
                                        <div id="tag-area">
                                            <span className="tag is-info">2019 Data</span>
                                            <span className="tag is-light">2018 Data</span>
                                            <span className="tag is-light">2017 Data</span>
                                            <span className="tag is-light">2016 Data</span>
                                        </div>
                                        <div>
                                            <div className="tile is-ancestor main-box">
                                                <div className="tile is-horizontal is-12">

                                                    <div className="tile is-parent box">
                                                        <article className="tile is-child">
                                                            <Pie data={props.student_genders_data} id="chart-area"/>
                                                        </article>
                                                    </div>
                                                    <div className="tile is-parent box">
                                                        <article className="tile is-child">
                                                            < Bar data={props.grade_data} id="myChart" width={100} height={50}/>
                                                        </article>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </section>

                </div>
            </Modal>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src="images/code1 (1).jpg" alt="" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4" >{props.name}</p>
                            <p className="subtitle is-6">{props.code}</p>

                        </div>
                    </div>

                    <div className="content">
                        <span className="small-text">By {props.coordinator}</span>
                    </div>
                </div>
                <footer className="card-footer">
                    <button className="card-footer-item" onClick={() => setModalIsOpen(true)}>View</button>
                    <button className="card-footer-item">Drop</button>
                    <button className="card-footer-item">Pick</button>
                    <button className="card-footer-item">Modify</button>
                </footer>
            </div>
        </Fragment>
    );
}

export default Module;