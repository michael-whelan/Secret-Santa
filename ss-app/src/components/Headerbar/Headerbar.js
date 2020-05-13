import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { useAuth0 } from "../../Auth";
import { Link } from "react-router-dom";
import "./Headerbar.css";

const Headerbar = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
	const user = useSelector((state) => state.auth.user);

	return (
		<Navbar expand="lg" variant="dark">
			<Navbar.Brand href="/">Secret Santa</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Link className="nav-link left" to="/">
						Home
					</Link>
					{isAuthenticated && user && (
						<span>
							<Link className="nav-link left" to="/groups">
								Groups
							</Link>
							<Link className="nav-link right" to="/profile">
								<img
									alt=""
									className="profile-picture"
									src={user.picture}
								/>
							</Link>
						</span>
					)}
					{!isAuthenticated && (
						<Button
							className="sign-in-btn"
							onClick={() => loginWithRedirect({})}
						>
							Log in
						</Button>
					)}
					{isAuthenticated && (
						<Button
							className="sign-out-btn"
							onClick={() => logout()}
						>
							Log out
						</Button>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Headerbar;
