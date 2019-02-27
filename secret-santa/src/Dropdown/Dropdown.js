import React from 'react';
import './Dropdown.css';


class Dropdown extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			displayMenu: false,
			selection: "Choose",
			dropList: this.props.dropList
		};
		this.showDropdownMenu = this.showDropdownMenu.bind(this);
		this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
	};

	showDropdownMenu = event => {
		event.preventDefault();
		this.setState({ displayMenu: true }, () => {
			document.addEventListener('click', this.hideDropdownMenu);
		});
	}

	hideDropdownMenu = () => {
		this.setState({ displayMenu: false }, () => {
			document.removeEventListener('click', this.hideDropdownMenu);
		});
	}

	handleSelect = event => {
		console.log(event.target.title)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dropList !== this.state.dropList) {
			this.setState({ dropList: nextProps.dropList});
		}
	}


	//{"type":"text", "label":"Not person 1:", "writeTo": "", "suggestions": this.people,"suggestion_show": "name"},
	createLi = ()=> {
		var list = [];
		if(this.state.dropList===null){
			return list;
		}
		const dropList = this.state.dropList.suggestions;
		const name =  this.state.dropList.suggestion_show;
		for(var i =0; i < dropList.length; ++i){
			var li = <li
				key = {i.toString()}
				id={i.toString()}
				title={dropList[i][name]}
				onClick={this.handleSelect}
			>
				{dropList[i][name]}
			</li>
			list.push(li);
		}
		return list;
	}



	render() {
		var items = this.createLi();
		return (
			<div	className="dropdown" style = {{background:"red",width:"200px"}} >
			<div className="button" onClick={this.showDropdownMenu}>{this.state.selection}</div>

				{ this.state.displayMenu ? (
				<ul>
					{items}
				</ul>
			):
			(
				null
			)
			}

			</div>

		);
	}
}

export default Dropdown;