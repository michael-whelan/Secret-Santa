import React from "react";
import { Switch, Route } from "react-router-dom";
import "./Home.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import accLogo from "../../icons/account-100.png";
import formLogo from "../../icons/icons8-form.png";
import sendLogo from "../../icons/icons8-send.png";

const Home = () => {
	return (
		<div className="home">
			<div className="column">
				<Jumbotron className="jumbo" fluid>
					<h1>1</h1>
					<h2>Sign up</h2>
					<img src={accLogo} />
					<p>Register with your email address</p>
				</Jumbotron>
			</div>
			<div className="column">
				<Jumbotron className="jumbo" fluid>
					<h1>2</h1>
					<h2>Create a Group</h2>
					<img src={formLogo} />
					<p>Set a group name and add all your recipients</p>
				</Jumbotron>
			</div>
			<div className="column">
				<Jumbotron className="jumbo" fluid>
					<h1>3</h1>
					<h2>Press Send</h2>
					<img src={sendLogo} />
					<p>Once your group is full hit the send button.</p>
				</Jumbotron>
			</div>
		</div>
	);
};

export default Home;
