import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";

export default class FormDialog extends Component {
	constructor(props){
		super(props);
		this.state = {open: false, message:""};
		this.groupName = "null";
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	createGroup = event => {
		event.preventDefault();
		var config = {
			headers : {'X-User-ID': this.state.user.uuid,
			'Content-Type': 'application/json'
			}
		};

		var data = {
			'groupname':this.groupName
		};

		axios.post('http://localhost:8080/creategroup', data,config)
		.then(res => {
			if(res.status === 200){
				if(res.data.success){
					this.handleClose();
					//continue to deal with new group
				}

				this.props.getGroups();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	handleTyping = e =>{
		var inputValue = e.target.value;
		this.groupName = inputValue;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.openDialog !== this.state.open) {
			this.setState({ open: nextProps.openDialog });
		}
		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}

	render() {
	return (
		<div>
		<Dialog
			open={this.state.open}
			onClose={this.handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
			<DialogContent>
			<DialogContentText>
				{this.state.message}
			</DialogContentText>
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label={this.props.inputName}
				type="email"
				fullWidth
				onChange = {this.handleTyping}
			/>
			</DialogContent>
			<DialogActions>
			<Button onClick={this.handleClose} color="primary">
				Cancel
			</Button>
			<Button onClick={this.createGroup} color="primary">
				{this.props.btnName}
			</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
	}
}