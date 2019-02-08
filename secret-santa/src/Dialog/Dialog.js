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
	}

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

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
			/>
			</DialogContent>
			<DialogActions>
			<Button onClick={this.handleClose} color="primary">
				Cancel
			</Button>
			<Button onClick={this.handleClose} color="primary">
				{this.props.btnName}
			</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
	}
}