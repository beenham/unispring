import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Bar, Pie } from "react-chartjs-2";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { getGraphData } from "./util";

let colours = [
    "rgb(0, 152, 224, 0.8)",
    "rgb(94, 188, 219, 0.8)",
    "rgb(241, 221, 132, 0.8)",
    "rgb(245, 181, 135, 0.8)",
    "rgb(247, 137, 121, 0.8)",
    "rgb(184, 99, 119, 0.8)"
];
let border_colours = [
    "#0098E0",
    "#3C778B",
    "#F1DD84",
    "#F5B587",
    "#F78979",
    "#B86377"
];

function ModuleIndicator(props) {
  return <span className={props.className}>{props.text}</span>;
}

function ModuleIndicatorArea(props) {
  return (
    <ModuleIndicator
      className={
        "tag " + (props.status === "FULL" ? "is-danger" : "is-warning")
      }
      text={"Module " + (props.status === "FULL" ? "Full" : "Terminated")}
    />
  );
}

function ModuleButton(props) {
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  return (
    <Fragment>
      <Modal isOpen={modalIsOpenEdit}>
        <div className="custom-modal">
          <header className="modal-card-head">
            <p className="modal-card-title">{props.name}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModalIsOpenEdit(false)}
            />
          </header>
          <section className="modal-card-body">
            <div className="image-box">
              <img src="../images/code1 (2).jpg" alt="" />
            </div>
            <div className="modal-details">
              <div className="module-title-tag">
                <h2 className="title is-4">{props.name}</h2>
                <span className="tag is-info">{props.code}</span>
              </div>
            </div>
          </section>
        </div>
      </Modal>
      <Tooltip title={props.title} aria-label={props.title} arrow>
        <Button
          className="card-footer-item"
          onClick={() => setModalIsOpenEdit(true)}
        >
          <i className="material-icons-outlined">{props.icon}</i>
        </Button>
      </Tooltip>
    </Fragment>
  );
}

export default function Module(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [coordinator, setCoordinator] = useState({ forename: "", surname: "" });

  useEffect(() => {
    (async () => {
      setStudents(
        (await fetch(props._links.students.href).then(res => res.json()))
          ._embedded.students
      );

      setGrades(
        (await fetch(props._links.grades.href).then(res => res.json()))
          ._embedded.grades
      );

      setCoordinator(
        await fetch(props._links.coordinator.href).then(res => res.json())
      );
    })();
  }, [modalIsOpen]);

  return (
    <Fragment>
      <Modal isOpen={modalIsOpen}>
        <div className="custom-modal">
          <header className="modal-card-head">
            <p className="modal-card-title">{props.name}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => setModalIsOpen(false)}
            />
          </header>
          <section className="modal-card-body">
            <div className="image-box">
              <img src={props.module_image} alt="" />
            </div>
            <div className="modal-details">
              <div className="module-title-tag">
                <h2 className="title is-4">{props.name}</h2>
                <span className="tag is-info">{props.code}</span>
                <ModuleIndicatorArea status={props.status} />
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
                        show_chart
                      </i>
                    </span>
                    <span>Stats</span>
                  </Tab>
                </TabList>

                <TabPanel>
                  <section className="main-box">
                    <table className="table is-fullwidth">
                      <tbody>
                        <tr>
                          <td>Module Name:</td>
                          <td>
                            {props.name} ({props.year})
                          </td>
                        </tr>
                        <tr>
                          <td>Module coordinator</td>
                          <td>
                            {coordinator.forename + " " + coordinator.surname}
                          </td>
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
                  <section id="module-charts">
                    <div id="tag-area">
                      <span className="tag is-info">2020 Data</span>
                    </div>
                    <div>
                      <div className="tile is-ancestor main-box">
                        <div className="tile is-horizontal is-12">
                          <div className="tile is-parent box">
                            <article className="tile is-child">
                              <Pie
                                data={getGraphData(
                                  students,
                                  "gender",
                                  colours,
                                  "Number of students by gender"
                                )}
                                id="chart-area"
                              />
                            </article>
                          </div>
                          <div className="tile is-parent box">
                            <article className="tile is-child">
                              <Bar
                                data={getGraphData(
                                  grades,
                                  "grade",
                                  colours,
                                  "Number of students that achieved each grade"
                                )}
                                id="myChart"
                                width={100}
                                height={50}
                              />
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
            <img src={props.module_image} alt="" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-6">
                {props.name} ({props.year})
              </p>
              <p className="subtitle is-6">{props.code}</p>
            </div>
          </div>
        </div>
        <footer className="card-footer">
          <Tooltip
            title="View Module details"
            aria-label="View Module details"
            arrow
          >
            <Button
              className="card-footer-item"
              onClick={() => setModalIsOpen(true)}
            >
              <i className="material-icons-outlined">visibility</i>
            </Button>
          </Tooltip>
          {props.renderPick && (
            <ModuleButton
              title="Choose this module"
              icon="check_box"
              code={props.code}
              name={props.name}
              year={props.year}
            />
          )}
          {props.renderDrop && (
            <ModuleButton
              title="Drop this module"
              icon="cancel"
              code={props.code}
              name={props.name}
              year={props.year}
            />
          )}
          {props.renderEdit && (
            <ModuleButton
              title="Edit module information"
              icon="edit"
              code={props.code}
              name={props.name}
              year={props.year}
            />
          )}
        </footer>
      </div>
    </Fragment>
  );
}
