import React, { Fragment, useEffect, useState } from "react";
import Module from "./module";
import { getGraphData, getLoggedInUser, isLoggedIn } from "./util";

export default function ModuleArea() {
  const [userModules, setUserModules] = useState([]);
  const [otherModules, setOtherModules] = useState([]);

  useEffect(() => {
    (async () => {
      const userModules = (
        await fetch(
          "/api/students/" +
            getLoggedInUser().id +
            "/modules?size=" +
            (2 ** 31 - 1)
        ).then(res => res.json())
      )._embedded.modules.filter(module => module.year.value === 2020);
      const userModuleIds = userModules.map(module => module.code);

      const otherModules = (
        await fetch(
          "/api/modules/search/year?year=2020&size=" + (2 ** 31 - 1)
        ).then(res => res.json())
      )._embedded.modules.filter(
        module => !userModuleIds.includes(module.code)
      );

      for (const module of [...userModules, ...otherModules]) {
        module.module_image = "../images/code (" + 1 + ").jpg";
        module.year = module.year.value;
      }

      setUserModules(userModules);
      setOtherModules(otherModules);
    })();
  }, []);

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
                  <Module {...item}
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
