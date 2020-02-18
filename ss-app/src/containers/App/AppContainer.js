import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import App from '../../components/App/App';
//import { fetchHiers } from '../../store/hierarchy';
//import { fetchGameTypes } from '../../store/currentitem';

const AppContainer = () => {
	const [initialData, setInitialData] = useState(false);
	return initialData ? <App /> : <div>Loading...</div>;
};

export default AppContainer;
