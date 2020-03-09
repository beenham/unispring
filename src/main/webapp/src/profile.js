
import React, {useEffect, useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

function Profile(){

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);
    const [gradeItems, setGradeItems] = useState([]);

    const fetchItems = async() =>{
        let data_json =  await fetch('http://localhost:8080/api/users/220').then(res => res.json());
        let grades_json =  await fetch('http://localhost:8080/api/students/210/grades').then(res => res.json());
        for (const item of grades_json._embedded.grades) {
            console.log("hello");
            let name = await fetch(item._links.module.href).then(res => res.json());
            item["module_name"] = name.name;
        }
        console.log(data_json);
        console.log(grades_json);
        setItems(data_json);
        setGradeItems(grades_json._embedded.grades);
    };

    return(
        <div id="infoPage">
        <div id="profile" className="main-box">
        <div className="box" id="profile-box">
            <article className="media">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <i className="material-icons">face</i>
                    </figure>
                </div>
                <div className="media-content">
                    <div className="content profile-title-info">

                        <h2>{items.forename} {items.surname}</h2>
                        <span className="tag is-info">{items.stage}</span>
                        <span className="tag is-warning is-light" id="edit-button">Edit Profile</span>
                        <br />

                    </div>
                    <Tabs>
                        <TabList>
                            <Tab>
                                <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">info</i></span>
                                <span>About</span>
                            </Tab>
                            <Tab>
                                <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">school</i></span>
                                <span>Grade</span>
                            </Tab>
                            <Tab>
                                <span className="icon is-small"><i className="material-icons module-icon" aria-hidden="true">euro_symbol</i></span>
                                <span>Fees</span>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <section>
                                <div className="main-box">
                                    <table className="table is-fullwidth">

                                        <tbody>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{items.forename} {items.surname}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{items.emailAddress}</td>
                                        </tr>
                                        <tr>
                                            <td>Stage:</td>
                                            <td>{items.stage}</td>
                                        </tr>
                                        <tr>
                                            <td>Bio:</td>
                                            <td>Im in fourth year and fyp is going shite</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </TabPanel>
                        <TabPanel>
                            <section>
                                <div className="main-box">
                                    <table className="table is-bordered is-fullwidth">
                                        <thead>
                                        <tr>
                                            <td>Subject</td>
                                            <td>Percentage</td>
                                            <td>Grade</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {gradeItems.map(item =>
                                                <tr>
                                                    <td>{item.module_name}</td>
                                                    <td>{item.percent}%</td>
                                                    <td>{item.grade}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </TabPanel>
                        <TabPanel>
                            <section>
                                <div id="profile-fees">
                                    <div className="fee-box">
                                        <h1>Amount due:</h1>
                                        <i className="material-icons" id="euro-symbol">euro_symbol</i>
                                        <h4>256.00</h4>
                                    </div>
                                    <div className="fee-box" id="fee-payment-box">
                                        <h1>Payment area</h1>
                                        <div className="field">
                                            <p className="control has-icons-left is-small has-icons-right">
                                                <input className="input is-small" type="text" placeholder="Name" />
                                                <span className="icon is-small is-left">
                                                   <i className="material-icons">person</i>
                                                  </span>
                                                <span className="icon is-small is-right">
                                                <i className="fas fa-check"/>
                                              </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control has-icons-left has-icons-right is-small">
                                                <input className="input is-small" type="number" placeholder="Card Number" />
                                                <span className="icon is-small is-left">
                                                   <i className="material-icons">credit_card</i>
                                                  </span>
                                                <span className="icon is-small is-right">
                                                <i className="fas fa-check"/>
                                              </span>
                                            </p>
                                        </div>

                                        <div className="grouped-elements">

                                            <div className="field ten-p">
                                                <p className="control has-icons-left has-icons-right is-small">
                                                    <input className="input is-small" type="Number" placeholder="Amount to pay" />
                                                    <span className="icon is-small is-left">
                                                      <i className="material-icons">euro_symbol</i>
                                                     </span>
                                                    <span className="icon is-small is-right">
                                                   <i className="fas fa-check"/>
                                                 </span>
                                                </p>
                                            </div>

                                            <div className="field ten-p">
                                                <p className="control has-icons-left has-icons-right is-small">
                                                    <input className="input is-small" type="date" placeholder="Expiration date" />
                                                    <span className="icon is-small is-left">
                                                      <i className="material-icons">date_range</i>
                                                     </span>
                                                    <span className="icon is-small is-right">
                                                   <i className="fas fa-check"/>
                                                 </span>
                                                </p>
                                            </div>

                                            <div className="field">
                                                <p className="control has-icons-left has-icons-right is-small">
                                                    <input className="input is-small" type="number" placeholder="CVV number" />
                                                    <span className="icon is-small is-left">
                                                      <i className="material-icons"> security</i>
                                                     </span>
                                                    <span className="icon is-small is-right">
                                                   <i className="fas fa-check"/>
                                                 </span>
                                                </p>
                                            </div>

                                        </div>

                                        <div className="field is-grouped is-grouped-right">
                                            <p className="control">
                                                <a className="button is-small is-primary">
                                                    Submit
                                                </a>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </TabPanel>
                    </Tabs>

                </div>
            </article>
        </div>
    </div>
        </div>);
}

export default Profile;