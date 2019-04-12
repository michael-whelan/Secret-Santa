import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IntegrationAutosuggest from '../AutoSuggest/Autocomplete.js';
import SelectLabel from '../SelectLabel/SelectLabel.js';
import axios from 'axios';

export default class FormDialog extends Component {
	constructor(props) {
		super(props);
		this.state = { open: false, message: '', slabelList: [] };
		this.groupName = 'null';
		console.log(props.notList);
	}

	handleClickOpen = () => {
		console.log('open');
		this.setState({ open: true });
	};

	handleClose = () => {
		console.log('close');
		//this.setState({this.props.openDialog : false});
		this.props.closeDialog();
		//		this.setState({ open: false });
	};

	handleTyping = e => {
		var inputValue = e.target.value;
		const arrPos = parseInt(e.target.id);
		this.props.elemList[arrPos].writeTo = inputValue;
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.openDialog !== this.state.open) {
			this.setState({ open: nextProps.openDialog });
		}
		if (nextProps.user !== this.state.user) {
			this.setState({ user: nextProps.user });
		}
	}

	/*removable?? */
	updateNots = (id, notList) => {
		var authOptions = {
			method: 'put',
			url: 'http://localhost:8080/updatepersonnots',
			headers: {
				'X-User-ID': this.state.user.uuid,
				'Access-Control-Allow-Origin': '*',
			},
			data: {
				id: id,
				col: 'nots',
				newVal: notList,
			},
			json: true,
		};
		axios(authOptions)
			.then(res => {
				if (res.status === 200) {
					//updated person
					if (res.data.success) {
						console.log(res.data.message);
					}
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	createTextField = (index, elem) => {
		return (
			<TextField
				autoFocus
				margin="dense"
				key={index.toString()}
				id={index.toString()}
				label={elem.label}
				type={elem.type}
				fullWidth
				onChange={this.handleTyping}
			/>
		);
	};

	createSelectLabel = elem => {
		console.log('owner', this.props.ownerId, elem.label, elem.key);
		const lblLen = this.state.slabelList.length;
		const sLabel = (
			<SelectLabel
				label={elem.label}
				key={elem.key}
				arrKey={lblLen}
				id={elem.key}
				removeLabel={this.removeSelectLabel}
			/>
		);
		var newArray = this.state.slabelList.slice();
		newArray.push(sLabel);
		this.setState({ slabelList: newArray });
		//this.props.update
	};

	removeSelectLabel = index => {
		var newArray = this.state.slabelList.slice();
		newArray.splice(index, 1);
		this.setState({ slabelList: newArray });
	};

	createAutoComplete = (index, elem) => {
		console.log('createAutoComplete');
		return (
			<>
				<IntegrationAutosuggest
					placeHolder={this.props.placeHolder}
					key={index}
					suggestions={elem.suggestions}
					genLabel={this.createSelectLabel}
				/>
				<div name="labelHolder">{this.state.slabelList}</div>
			</>
		);
	};
	//<IntegrationDownshift/>
	createInput = () => {
		var gen_elems = [];
		const { elemList } = this.props;
		for (var i = 0; i < elemList.length; ++i) {
			var elem = null;
			if (elemList[i].type === 'text') {
				elem = this.createTextField(i, elemList[i]);
			} else if (elemList[i].type === 'textSuggest') {
				elem = this.createAutoComplete(i, elemList[i]);
			}
			gen_elems.push(elem);
		}
		return gen_elems;
	};

	render() {
		console.log('render dialog');
		return (
			<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					{this.props.title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>{this.state.message}</DialogContentText>
					{/*this.createInput() temp*/}
				</DialogContent>
				<DialogActions>
					{this.props.showCancel && (
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
					)}
					<Button onClick={this.props.btnAction} color="primary">
						{this.props.btnName}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
