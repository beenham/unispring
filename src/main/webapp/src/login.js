import React from "react";

import axios from "axios";
import {isLoggedIn, setLoggedInUser} from "./util";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailAddress: "",
			password: ""
		};
	}

	handleClick(event) {
		let payload = {
			emailAddress: this.state.emailAddress,
			password: this.state.password
		};
		console.log(payload);
		axios
			.post("/api/auth/login", payload)
			.then(response => {
				if (response.status === 200) {
					setLoggedInUser(response.data);
					window.location.replace("/modules");
				}
				// else if(response.data.code == 204){
				//     console.log("Username password do not match");
				//     alert("username password do not match")
				// }
				// else{
				//     console.log("Username does not exists");
				//     alert("Username does not exist");
				// }
			})
			.catch(function (error) {
				console.log("error:", error);
			});
	}

	render() {
		return (
			<div id="login-bg">
				<div id="log-in-reg">
					<div id="header-links">
						<h1 className="title is-2 is-centered">
							University of Springfield
						</h1>
						<div className="buttons has-addons is-centered">
							<a className="button" id="register-button" href="/register">
								Register
							</a>
						</div>
					</div>
					<div id="login-area">
						<form action="/api/auth/login" method="post">
							<h1 className="title">Login</h1>
							<div className="field">
								<p className="control has-icons-left is-small has-icons-right">
									<input
										className="input is-small"
										type="email"
										placeholder="Email"
										name="emailAddress"
										onChange={e =>
											this.setState({
												emailAddress: e.target.value
											})
										}
									/>
									<span className="icon is-small is-left">
										<i className="material-icons-outlined">email</i>
									</span>
								</p>
							</div>
							<div className="field">
								<p className="control has-icons-left is-small">
									<input
										className="input is-small"
										type="password"
										placeholder="Password"
										name="password"
										onChange={e =>
											this.setState({
												password: e.target.value
											})
										}
									/>
									<span className="icon is-small is-left">
										<i className="material-icons-outlined">lock</i>
									</span>
								</p>
							</div>
							<div className="field" id="button-area">
								<button
									className="button is-small"
									type="button"
									onClick={event => this.handleClick(event)}
								>
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
