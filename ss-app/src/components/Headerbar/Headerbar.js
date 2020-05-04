import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "../../Auth";
import { Link } from "react-router-dom";

const Headerbar = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	// const signIn = () => {
	// 	dispatch(parseHash());
	// };
	const user = useSelector((state) => state.auth.user);
	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#features">Features</Nav.Link>
					<Nav.Link href="#pricing">Pricing</Nav.Link>
					{!isAuthenticated && (
						<button onClick={() => loginWithRedirect({})}>
							Log in
						</button>
					)}

					{isAuthenticated && (
						<button onClick={() => logout()}>Log out</button>
					)}
					{isAuthenticated && (
						<span>
							<Link to="/">Home</Link>&nbsp;
							<Link to="/profile">Profile</Link>
						</span>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Headerbar;
