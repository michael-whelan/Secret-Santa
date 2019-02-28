import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IntegrationDownshift from '../AutoSuggest/Autocomplete.js'

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

	handleTyping = e =>{
		var inputValue = e.target.value;
		const arrPos = parseInt(e.target.id);
		this.props.elemList[arrPos].writeTo = inputValue;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.openDialog !== this.state.open) {
			console.log("opne sesame");
			this.setState({ open: nextProps.openDialog });
		}
		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}

	createTextField = (index,elem) => {
		return (<TextField
			autoFocus
			margin="dense"
			key = {index.toString()}
			id={index.toString()}
			label={elem.label}
			type={elem.type}
			fullWidth
			onChange = {this.handleTyping}
		/>
		);
	}

	createAutoComplete = (index,elem) =>{
		console.log(elem.suggestions);
		return(<IntegrationDownshift suggestions={elem.suggestions}/>);
	}
//<IntegrationDownshift/>
	createInput = () => {
		var gen_elems = [];
		const {elemList} = this.props;
		console.log(elemList)
		for(var i =0; i < elemList.length; ++i){
			var elem = null;
			if (elemList[i].type === "text"){
				elem = this.createTextField(i,elemList[i]);
			}
			else if(elemList[i].type === "textSuggest"){
				elem = this.createAutoComplete(i,elemList[i]);
			}
			gen_elems.push(elem);
		}
		return gen_elems;
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
				{this.createInput()}
			</DialogContent>
			<DialogActions>
			<Button onClick={this.handleClose} color="primary">
				Cancel
			</Button>
			<Button onClick={this.props.btnAction} color="primary">
				{this.props.btnName}
			</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
	}
}