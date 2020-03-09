import React, { useEffect, useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import Chart from "react-google-charts";

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

function mapDistinctCount(data, property) {
  return data.reduce((acc, o) => {
    acc[o[property]] = (acc[o[property]] || 0) + 1;
    return acc;
  }, {});
}

async function getGraphData(data, property, colours) {
  data = mapDistinctCount(data, property);

  let keys = Object.keys(data).sort();
  let values = keys.map(key => data[key]);

  return {
    labels: keys,
    datasets: [
      {
        label: "No. of students who achieved this grade",
        data: values,
        backgroundColor: colours,
        borderColor: "#fff",
        borderWidth: 1
      }
    ]
  };
}

function DashboardStat(props) {
    return (
        <div className="level-item has-text-centered">
            <div className="dashboard-div">
                <p className="heading">{props.name}</p>
                <p className="title">{props.number}</p>
                <hr style={{backgroundColor: props.colour, width: (100 * props.number / props.max) + '%'}} />
            </div>
        </div>
    );
}

export default function Dashboard() {
  useEffect(() => {
    fetchStudents();
  }, []);

  const [items, setItems] = useState([]);

  const fetchStudents = async () => {
    let students = (await fetch(
      "/api/students/?size=" + (2 ** 31 - 1)
    ).then(res => res.json()))._embedded.students;
    let staff = (await fetch("/api/staff/?size=" + (2 ** 31 - 1)).then(res =>
      res.json()
    ))._embedded.staff;
    let grades = (await fetch("/api/grades/?size=" + (2 ** 31 - 1)).then(res =>
      res.json()
    ))._embedded.grades;

    let data = {};
    data.stagesBreakdown = mapDistinctCount(students, "stage");
    data.stagesMax = Math.max.apply(Math, Object.values(data.stagesBreakdown));
    data.studentGenderBreakDown = await getGraphData(
      students,
      "gender",
      colours.slice(0, 3)
    );
    data.staffGenderBreakDown = await getGraphData(
      staff,
      "gender",
      colours.slice(3, 6)
    );
    data.gradesBreakdown = await getGraphData(grades, "grade", colours);
    data.nationalityBreakdown = mapDistinctCount(students, "nationality");
    setItems(data);
  };

  return (
    <div id="infoPage">
      <div id="analytics">
        <section className="hero">
          <div className="hero-body">
            <div>
              <i className="material-icons">show_chart</i>
            </div>
            <div className="container">
              <h1 className="title">University of Springfield</h1>
              <h2 className="subtitle">Analytics</h2>
            </div>
          </div>
        </section>
        <nav className="level">
          {["ONE", "TWO", "THREE", "FOUR", "MASTERS", "DOCTORATE"].map(
            (stage, index) => {
              return (
                <DashboardStat
                  key={stage}
                  name={
                    (["MASTERS", "DOCTORATE"].includes(stage) ? "" : "Stage ") +
                    stage.charAt(0) +
                    stage.slice(1).toLowerCase()
                  }
                  number={(items.stagesBreakdown || {})[stage] || 0}
                  max={(items.stagesMax || 1)}
                  colour={border_colours[index]}
                />
              );
            }
          )}
        </nav>

        <div className="tile is-ancestor">
          <div className="tile is-vertical is-8">
            <div className="tile">
              <div className="tile is-parent">
                <article className="tile is-child box">
                  <p className="title is-6">Student Gender Breakdown</p>
                  <Pie data={items.studentGenderBreakDown} id="chart-area" />
                </article>
              </div>
              <div className="tile is-parent">
                <article className="tile is-child box">
                  <p className="title is-6">Staff Gender Breakdown</p>
                  <Doughnut data={items.staffGenderBreakDown} />
                </article>
              </div>
            </div>
            <div className="tile is-parent ">
              <article className="tile is-child box">
                <p className="title is-6">Student Nationality Breakdown</p>
                <Chart
                  id="dashboard-map"
                  width="100%"
                  height={"300px"}
                  chartType="GeoChart"
                  data={[
                    ["Nationality", "Count"],
                    ...Object.entries(items.nationalityBreakdown || {})
                  ]}
                  options={{
                    colorAxis: { colors: ["#0098E0", "#F1DD84", "#B86377"] },
                    datalessRegionColor: "#efefef",
                    defaultColor: "#efefef"
                  }}
                  mapsApiKey="AIzaSyCCEHBCiHsha1jc3w_JO4UaxA1iNH7AUGY"
                  rootProps={{ "data-testid": "1" }}
                />
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <div className="content">
                <p className="title is-6">
                  Average Grade Break Down (Undergraduate)
                </p>
                <Bar
                  data={items.gradesBreakdown}
                  id="myChart"
                  width={100}
                  height={150}
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
