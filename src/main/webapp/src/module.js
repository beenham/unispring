import React, { Fragment, useEffect, useState } from "react";
import Modal from "react-modal";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Bar, Pie } from "react-chartjs-2";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { getGraphData, getLoggedInUser } from "./util";
import axios from "axios";

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

function ModuleHistoricData(props) {
  return (
    <div>
      <div className="tile is-ancestor main-box">
        <div className="tile is-horizontal is-12">
          <div className="tile is-parent box">
            <article className="tile is-child">
              <Pie
                data={getGraphData(
                  props.genderStats,
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
                  props.gradeStats,
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
  );
}

export default function Module(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);

  const [historicModules, setHistoricModules] = useState([]);

  useEffect(() => {
    (async () => {
      if (!modalIsOpen) return;

      setHistoricModules(
        (
          await fetch("/api/modules/code/" + props.code).then(res => res.json())
        ).sort((a, b) => b.year - a.year)
      );
    })();
  }, [modalIsOpen]);

  function enrolModule() {
    if (["FULL", "TERMINATED"].includes(props.status)) return;

    axios
      .put("/api/modules/" + props.id + "/enrolment")
      .then(function(response) {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  }

  function dropModule() {
    if (["TERMINATED"].includes(props.status)) return;

    axios
      .delete("/api/modules/" + props.id + "/enrolment")
      .then(function(response) {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch(function(error) {
        console.log("error:", error);
      });
  }

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
                <span
                  className={
                    "tag " +
                    (props.status === "FULL" ? "is-danger" : "is-warning")
                  }
                >
                  {"Module " +
                    (props.status === "FULL" ? "Full" : "Terminated")}
                </span>
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
                            {props.coordinator.forename +
                              " " +
                              props.coordinator.surname}
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
                  <Tabs id="module-charts">
                    <TabList>
                      {historicModules.map(historicModule => {
                        return (
                          <Tab>
                            <div id="tag-area">
                              <span className="tag is-info">
                                {historicModule.year} Data
                              </span>
                            </div>
                          </Tab>
                        );
                      })}
                    </TabList>
                    {historicModules.map(historicModule => {
                      return (
                        <TabPanel>
                          <ModuleHistoricData {...historicModule} />
                        </TabPanel>
                      );
                    })}
                  </Tabs>
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
            <Tooltip
              title={
                "Choose this module" +
                (["FULL", "TERMINATED"].includes(props.status)
                  ? " (" + props.status + ")"
                  : "")
              }
              aria-label="Choose this module"
              arrow
            >
              <Button
                className="card-footer-item"
                onClick={() => enrolModule()}
              >
                <i className="material-icons-outlined">check_box</i>
              </Button>
            </Tooltip>
          )}
          {props.renderDrop && (
            <Tooltip
              title={
                "Drop this module" +
                (["TERMINATED"].includes(props.status)
                  ? " (" + props.status + ")"
                  : "")
              }
              aria-label="Drop this module"
              arrow
            >
              <Button className="card-footer-item" onClick={() => dropModule()}>
                <i className="material-icons-outlined">cancel</i>
              </Button>
            </Tooltip>
          )}
          {props.renderEdit && (
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
                      <img src={props.module_image} alt="" />
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
              <Tooltip
                title="Edit module information"
                aria-label="Edit module information"
                arrow
              >
                <Button
                  className="card-footer-item"
                  onClick={() => setModalIsOpenEdit(true)}
                >
                  <i className="material-icons-outlined">edit</i>
                </Button>
              </Tooltip>
            </Fragment>
          )}
        </footer>
      </div>
    </Fragment>
  );
}
