import React from "react";
import { useAuth0 } from "../../Auth";
import "./Profile.css";
import ListGroup from "react-bootstrap/ListGroup";

const Profile = () => {
	const { loading, user } = useAuth0();

	if (loading || !user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="profile">
			<img src={user.picture} alt="Profile" />

			<h2>{user.name}</h2>
			<p>{user.email}</p>
			<ListGroup>
				{Object.keys(user).map(function (key) {
					return (
						<div key={key}>
							<span>{key}</span>: <span>{user[key]}</span>
						</div>
					);
				})}
			</ListGroup>
		</div>
	);
};

export default Profile;
