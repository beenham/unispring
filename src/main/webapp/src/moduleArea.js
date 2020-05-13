import React, { Fragment, useEffect, useState } from "react";
import Module from "./module";
import { getLoggedInUser } from "./util";

export default function ModuleArea() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    (async () => {
      let isStudent = getLoggedInUser().stage !== undefined;

      let moduleLink = isStudent ? "/api/modules/enrolled/" : "/api/modules/coordinating/";

      // console.log(isStudent , moduleLink);

      const modules = await fetch(moduleLink).then(res => {
        if (res.status !== 200) window.location.replace("/login");
        return res.json();
      });

      let moduleNumber = 1;
      for (const module of modules) {
        module.enrolled = true;
        module.module_image = "../images/code (" + (moduleNumber % 10 + 1) + ").jpg";
        moduleNumber++;
      }

      if (isStudent) {
        const otherModules = await fetch("/api/modules/year/2020").then(res => {
          if (res.status !== 200) window.location.replace("/login");
          return res.json();
        });

        for (const module of otherModules) {
          let found = false;
          for(let i = 0; i < modules.length; i++) {
            if (modules[i].code === module.code) {
              found = true;
              break;
            }
          }

          if (found) {
            otherModules.pop.apply(otherModules, module);
            continue;
          }

          module.enrolled = false;
          module.module_image = "../images/code (" + (moduleNumber % 10 + 1) + ").jpg";
          moduleNumber++;
        }
        modules.push.apply(modules, otherModules);
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
