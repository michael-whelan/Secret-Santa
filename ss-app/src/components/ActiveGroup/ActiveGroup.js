import React from "react";
import "./ActiveGroup.css";
import ListGroup from "react-bootstrap/ListGroup";
import PersonContainer from "../../containers/PersonContainer";
import ModalContainer from "../../containers/ModalContainer";

const ActiveGroup = ({ groupDetails = {}, people = [] }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const logStuff=(p)=>{
        console.log(p)
    }
	return (
		<div className="main-area">
            <ModalContainer/>
			<div className="activegroup">
				<div className="activegroup-header">
					<h2>{groupDetails.group_name}</h2>
				</div>
				<ListGroup>
					{people.map((people, index) => (
						<PersonContainer
							key={index}
							{...people}
							clickAction={logStuff}
						/>
					))}
				</ListGroup>
			</div>
		</div>
	);
};

export default ActiveGroup;
