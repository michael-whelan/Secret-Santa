import React from 'react'
import "../App.css";



const SelectLabel = (props)=>{
	const {label,id} = props;
	return(
		<div className = "select-label" key = {props.arrKey} onClick={props.removeLabel.bind(props.arrKey)}>
			<label id = {id}>{label}</label>
		</div>
	);
}

export default SelectLabel