import React, { Fragment, useEffect, useState } from "react";
import Module from "./module";
import { getLoggedInUser } from "./util";

export default function ModuleArea() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    (async () => {
      const userModuleIds = (
        await fetch("/api/modules/enrolled/").then(res => {
          if (res.status !== 200) window.location.replace("/login");
          return res.json();
        })
      )
        .filter(module => module.year === 2020)
        .map(module => module.code);

      const modules = await fetch("/api/modules/year/2020").then(res => {
        if (res.status !== 200) window.location.replace("/login");
        return res.json();
      });
      let moduleNumber = 1;
      for (const module of modules) {
        module.enrolled = userModuleIds.includes(module.code);
        module.module_image = "../images/code (" + moduleNumber + ").jpg";
        moduleNumber++;
      }
      setModules(modules);
    })();
  }, []);

  return (
    <div id="infoPage">
      <div className="main-box" id="modules">
        {[true, false].map((enrolled, index) => {
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
                      {enrolled ? "Your Modules" : "Other Modules"}
                    </h2>
                  </div>
                </div>
              </section>

              <div className="module-area">
                {modules
                  .filter(module => module.enrolled === enrolled)
                  .map(module => (
                    <Module
                      {...module}
                      renderPick={!enrolled}
                      renderEdit={false}
                      renderDrop={enrolled}
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
