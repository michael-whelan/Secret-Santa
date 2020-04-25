import { connect } from "react-redux";
import ModalPopup from "../components/Modal/Modal";
import { updatePerson } from "../store/Modal/actions";

const mapStateToProps = (state) => {
	return {
		people: state.activeGroup.people,
	};
};

const mapDispatchToProps = {
	doSubmit: updatePerson,
};


const ModalContainer = connect(mapStateToProps, mapDispatchToProps)(ModalPopup);

export default ModalContainer;
