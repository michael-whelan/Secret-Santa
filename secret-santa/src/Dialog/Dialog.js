import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends Component {
	constructor(props){
		super(props);
		this.state = {open: false};
		this.groupName = "null";
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	createGroup = () => {
		event.preventDefault();
		
		var config = {
			headers : {'X-User-Name': this.state.email,
			'X-User-Pass': this.state.password,
			'Access-Control-Allow-Origin': '*',
			},
			data : {
				'groupname':this.groupName
			} 
		};
		axios.post('http://localhost:8080/creategroup', config)
		.then(res => {
			if(res.status == 200){
				const userState = this.props.user;
				userState.user = {"uuid":res.data.uuid,"email":this.state.email};
				this.props.stateUpdate("home");
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
				{this.props.text}
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