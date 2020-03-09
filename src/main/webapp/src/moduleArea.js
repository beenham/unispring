import React, { Fragment, useEffect, useState } from "react";
import Module from "./module";
import { getGraphData, mapDistinctCount } from "./util";

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

export default function ModuleArea() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [userModules, setUserModules] = useState([]);
  const [otherModules, setOtherModules] = useState([]);

  const fetchItems = async () => {
    let userModules = (
      await fetch("/api/students/220/modules?size=" + (2 ** 31 - 1)).then(res =>
        res.json()
      )
    )._embedded.modules;//.filter(module => module.year.value === 2020);
    let userModuleIds = userModules.map(module => module.code);

    let otherModules = (
      await fetch(
        "/api/modules/search/year?year=2020&size=" + (2 ** 31 - 1)
      ).then(res => res.json())
    )._embedded.modules.filter(module => !userModuleIds.includes(module.code));

    for (const module of [...userModules, ...otherModules]) {
      const students = (
        await fetch(module._links.students.href).then(res => res.json())
      )._embedded.students;
      module.student_genders_graph = getGraphData(
        students,
        "gender",
        colours,
        "Number of students by gender"
      );

      const grades = (
        await fetch(module._links.grades.href).then(res => res.json())
      )._embedded.grades;
      module.grade_graph = getGraphData(
        grades,
        "grade",
        colours,
        "Number of students that achieved each grade"
      );

      module.coordinator = await fetch(
        module._links.coordinator.href
      ).then(res => res.json());
      module.module_image = "../images/code (" + 1 + ").jpg";
    }

    setUserModules(userModules);
    setOtherModules(otherModules);
  };

  return (
    <div id="infoPage">
      <div className="main-box" id="modules">
        {[userModules, otherModules].map((modules, index) => {
          return (
            <Fragment key={index}>
              <section className="hero">
                <div className="hero-body">
                  <div>
                    <i className="material-icons">apps</i>
                  </div>
                  <div className="container">
                    <h1 className="title">University of Springfield</h1>
                    <h2 className="subtitle">
                      {index === 0 ? "Your Modules" : "Other Modules"}
                    </h2>
                  </div>
                </div>
              </section>

              <div className="module-area">
                {modules.map(item => (
                  <Module
                    key={item.id}
                    name={item.name}
                    code={item.code}
                    coordinator={item.coordinator}
                    description={item.description}
                    status={item.status}
                    capacity={item.capacity}
                    trimester={item.trimester}
                    student_genders_graph={item.student_genders_graph}
                    grade_graph={item.grade_graph}
                    module_image={item.module_image}
                    renderPick={index !== 0}
                    renderEdit={false}
                    renderDrop={index === 0}
                  />
                ))}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
