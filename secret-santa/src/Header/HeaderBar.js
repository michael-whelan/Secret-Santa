import React, { Component } from "react";
import "../App.css";

export default class HeaderBar extends Component {
  constructor(props) {
	super(props);
  }

  validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
	this.setState({
	  [event.target.type]: event.target.value
	});
  }

  handleSubmit = event => {
	event.preventDefault();

  }

  render() {
	return (
		<div className="header">

		</div>
	);
  }
}