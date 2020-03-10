import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import axios from "axios";
import { getLoggedInUser } from "./util";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const user = getLoggedInUser();

    const [grades, setGrades] = useState([]);
    const [fees, setFees] = useState("256");

    useEffect(() => {
      (async () => {
        const grades = (
          await fetch(user_data._links.grades.href).then(res => res.json())
        )._embedded.grades;
        for (const grade of grades) {
          let module = await fetch(item._links.module.href).then(res =>
            res.json()
          );
          item["module_name"] = module.name;
          item["module_year"] = module.year.value;
        }

        setGrades(grades);
        setFees(user.feesPaid ? "Fees Paid" : "256");
      })();
    });

    function payFees() {
      axios
        .post("/api/auth/profile/" + localStorage.user + "/payfees")
        .then(function(response) {
          if (response.status === 200) {
            window.location.replace("/profile");
          }
        })
        .catch(function(error) {
          console.log("error:", error);
        });
    }

    return (
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
                  <h2>
                    {user.forename} {user.surname}
                  </h2>
                  <span className="tag is-info">{user.stage}</span>
                  <span className="tag is-warning is-light" id="edit-button">
                    Edit Profile
                  </span>
                  <br />
                </div>
                <Tabs>
                  <TabList>
                    <Tab>
                      <span className="icon is-small">
                        <i
                          className="material-icons module-icon"
                          aria-hidden="true"
                        >
                          info
                        </i>
                      </span>
                      <span>About</span>
                    </Tab>
                    <Tab>
                      <span className="icon is-small">
                        <i
                          className="material-icons module-icon"
                          aria-hidden="true"
                        >
                          school
                        </i>
                      </span>
                      <span>Grade</span>
                    </Tab>
                    <Tab>
                      <span className="icon is-small">
                        <i
                          className="material-icons module-icon"
                          aria-hidden="true"
                        >
                          euro_symbol
                        </i>
                      </span>
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
                              <td>
                                {user.forename} {user.surname}
                              </td>
                            </tr>
                            <tr>
                              <td>Email:</td>
                              <td>{user.emailAddress}</td>
                            </tr>
                            <tr>
                              <td>Stage:</td>
                              <td>{user.stage}</td>
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
                            {grades.map(item => (
                              <tr>
                                <td>
                                  {item.module_name} ({item.module_year})
                                </td>
                                <td>{item.percent}%</td>
                                <td>{item.grade}</td>
                              </tr>
                            ))}
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
                          <i className="material-icons" id="euro-symbol">
                            euro_symbol
                          </i>
                          <h4>{fees}</h4>
                        </div>
                        <div className="fee-box" id="fee-payment-box">
                          <h1>Payment area</h1>
                          <div className="field">
                            <p className="control has-icons-left is-small has-icons-right">
                              <input
                                className="input is-small"
                                type="text"
                                placeholder="Name"
                              />
                              <span className="icon is-small is-left">
                                <i className="material-icons">person</i>
                              </span>
                              <span className="icon is-small is-right">
                                <i className="fas fa-check" />
                              </span>
                            </p>
                          </div>
                          <div className="field">
                            <p className="control has-icons-left has-icons-right is-small">
                              <input
                                className="input is-small"
                                type="number"
                                placeholder="Card Number"
                              />
                              <span className="icon is-small is-left">
                                <i className="material-icons">credit_card</i>
                              </span>
                              <span className="icon is-small is-right">
                                <i className="fas fa-check" />
                              </span>
                            </p>
                          </div>

                          <div className="grouped-elements">
                            <div className="field ten-p">
                              <p className="control has-icons-left has-icons-right is-small">
                                <input
                                  className="input is-small"
                                  type="Number"
                                  placeholder="Amount to pay"
                                />
                                <span className="icon is-small is-left">
                                  <i className="material-icons">euro_symbol</i>
                                </span>
                                <span className="icon is-small is-right">
                                  <i className="fas fa-check" />
                                </span>
                              </p>
                            </div>

                            <div className="field ten-p">
                              <p className="control has-icons-left has-icons-right is-small">
                                <input
                                  className="input is-small"
                                  type="date"
                                  placeholder="Expiration date"
                                />
                                <span className="icon is-small is-left">
                                  <i className="material-icons">date_range</i>
                                </span>
                                <span className="icon is-small is-right">
                                  <i className="fas fa-check" />
                                </span>
                              </p>
                            </div>

                            <div className="field">
                              <p className="control has-icons-left has-icons-right is-small">
                                <input
                                  className="input is-small"
                                  type="number"
                                  placeholder="CVV number"
                                />
                                <span className="icon is-small is-left">
                                  <i className="material-icons"> security</i>
                                </span>
                                <span className="icon is-small is-right">
                                  <i className="fas fa-check" />
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="field is-grouped is-grouped-right">
                            <p className="control">
                              <a
                                onClick={() => {
                                  payFees();
                                }}
                                href="#"
                                className="button is-small is-primary"
                              >
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
      </div>
    );
  }
}
