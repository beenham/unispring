import React, {useEffect, useState} from "react";
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import Chart from "react-google-charts";
import {getGraphData, mapDistinctCount} from "./util";

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

function DashboardStat(props) {
	return (
		<div className="level-item has-text-centered">
			<div className="dashboard-div">
				<p className="heading">{props.name}</p>
				<p className="title">{props.number}</p>
				<hr
					style={{
						backgroundColor: props.colour,
						width: (100 * props.number) / props.max + "%"
					}}
				/>
			</div>
		</div>
	);
}

export default function Dashboard() {
    const [data, setData] = useState([]);

	useEffect(async () => {
        const students = (
            await fetch("/api/students/?size=" + (2 ** 31 - 1)).then(res =>
                res.json()
            )
        )._embedded.students;
        const staff = (
            await fetch("/api/staff/?size=" + (2 ** 31 - 1)).then(res => res.json())
        )._embedded.staff;
        const grades = (
            await fetch("/api/grades/?size=" + (2 ** 31 - 1)).then(res => res.json())
        )._embedded.grades;

        const data = {};
        data.stagesBreakdown = mapDistinctCount(students, "stage");
        data.stagesMax = Math.max.apply(Math, Object.values(data.stagesBreakdown));
        data.studentGenderBreakDown = getGraphData(
            students,
            "gender",
            colours.slice(0, 3),
            "Number of students by gender"
        );
        data.staffGenderBreakDown = getGraphData(
            staff,
            "gender",
            colours.slice(3, 6),
            "Number of staff by gender"
        );
        data.gradesBreakdown = getGraphData(
            grades,
            "grade",
            colours,
            "Number of students that achieved each grade"
        );
        data.nationalityBreakdown = mapDistinctCount(students, "nationality");

        setData(data);
	});

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
									number={(data.stagesBreakdown || {})[stage] || 0}
									max={data.stagesMax || 1}
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
									<Pie data={data.studentGenderBreakDown} id="chart-area"/>
								</article>
							</div>
							<div className="tile is-parent">
								<article className="tile is-child box">
									<p className="title is-6">Staff Gender Breakdown</p>
									<Doughnut data={data.staffGenderBreakDown}/>
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
										...Object.entries(data.nationalityBreakdown || {})
									]}
									options={{
										colorAxis: {colors: ["#0098E0", "#F1DD84", "#B86377"]},
										datalessRegionColor: "#efefef",
										defaultColor: "#efefef"
									}}
									mapsApiKey="AIzaSyCCEHBCiHsha1jc3w_JO4UaxA1iNH7AUGY"
									rootProps={{"data-testid": "1"}}
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
									data={data.gradesBreakdown}
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
