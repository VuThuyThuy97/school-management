import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Col, Row, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as authActionCreator from '../../actionCreators/authActionCreator';
import * as teacherClassListActionCreator from '../../actionCreators/teacherClassListActionCreator';
import { editClassSuccess } from '../../actions/classList';
var moment = require('moment'); 

export class TeacherClassListComponent extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getAllClassByUser();
  }


  state = {
    classes: this.props.classList
  }


  render() {
    let classes = this.state.classes || this.props.classList;
    return (
      <Grid>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Row style={{margin: '0 50px'}}>
          <h2 style={{ padding: '15px 0', margin: '10px 0 30px 0' }}>
            Classes
            <span className="pull-right" style={{ margin: '5px', fontSize: '20px' }}>
            <select style={{ height: '30px', borderColor: '#ccc', borderRadius: '5px', fontSize: '15px', backgroundColor: 'white' }} onChange={(ev) => {
              const filter = ev.target.value;
              let filterdClasses = this.props.classList;
              if (filter === 'today') {
                filterdClasses = this.props.classList.filter(c => moment().isSame(c.startTime, 'd'));
              } else if (filter === 'past') {
                filterdClasses = this.props.classList.filter(c => moment().isAfter(c.startTime, 'd'));
              } else if (filter === 'future') {
                filterdClasses = this.props.classList.filter(c => moment().isBefore(c.startTime, 'd'));
              }
              this.setState({ classes: filterdClasses })
            }}>
              <option selected value="all">All</option>
              <option value="today">Today</option>
              <option value="past">Past</option>
              <option value="future">Future</option>
            </select>
            </span>
          </h2>
          {classes && classes.map(c =>
            <div className="container-fluid well span6" style={{ backgroundImage: 'linear-gradient(to bottom,#f9f9f9 0,#fff 100%)'}}>
              <div className="row-fluid">
                <div className="col-xs-10">
                    <h3 style={{ marginTop: '5px', marginBottom: '15px' }}>{c.name}</h3>
                    <h5><b>Room:</b> {c.room?.name}</h5>
                    <h5><b>Start time:</b> {moment(c.startTime).format('MMMM Do YYYY, h:mm a')}</h5>
                    <h5><b>End time:</b> {moment(c.endTime).format('MMMM Do YYYY, h:mm a')}</h5>
                </div>
              </div>
            </div>
          )}
        </Row>
      </Grid>
    );
  }
}

TeacherClassListComponent.propTypes = {
  getUserInfo: PropTypes.func,
  getAllClassByUser: PropTypes.func,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  classList: PropTypes.shape({
    data: PropTypes.string
  })
};

TeacherClassListComponent.defaultProps = {
  getUserInfo: () => { },
  getAllClassByUser: () => { },
  history: null,
  classList: null,
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    classList: state.teacherClassList.teacherClassList
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserInfo: authActionCreator.getUserInfo,
    getAllClassByUser: teacherClassListActionCreator.getAllClassByUser,
  }, dispatch);
};

const ClassList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherClassListComponent));

export default ClassList;

