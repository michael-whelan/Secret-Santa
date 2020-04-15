import React from 'react';
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';



const SideBar = ({ title }) => <ListGroup.Item>{title}</ListGroup.Item>;


SideBar.propTypes = {
  title: PropTypes.string.isRequired
};

export default SideBar;