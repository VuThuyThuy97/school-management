import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Col, Row, Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as authActionCreator from '../../actionCreators/authActionCreator';
import * as userListActionCreator from '../../actionCreators/userListActionCreator';
import * as roomListActionCreator from '../../actionCreators/roomListActionCreator';
import * as classListActionCreator from '../../actionCreators/classListActionCreator';
var moment = require('moment'); 

export class ClassListComponent extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getUserList();
    this.props.getRoomList();
    this.props.getClassList();
  }

  state = {
    classes: this.props.classList,
    editingClass: null
  }

  createNewClass () {
    this.props.openCreateClassModal();
  }

  editClass (c) {
    this.setState({ editingClass: c });
    this.props.openEditClassModal();
  }

  render() {
    let classes = this.props.classList;
    let teachers = this.props.userList?.map(u => { return { value: u._id, label: u.name }});
    let rooms = this.props.roomList?.map(r =>{ return { value: r._id, label: r.name }});
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
            <span className="glyphicon glyphicon-plus pull-right" style={{ margin: '5px', fontSize: '20px' }} onClick={() => {
              this.createNewClass();
            }}></span>
          </h2>
          {classes && classes.map(c =>
            <div className="container-fluid well span6" style={{ backgroundImage: 'linear-gradient(to bottom,#f9f9f9 0,#fff 100%)'}}>
              <div className="row-fluid">
                <div className="col-xs-10">
                    <h3 style={{ marginTop: '5px', marginBottom: '15px' }}>{c.name}</h3>
                    <h5><b>Teacher:</b> {c.teacher?.name}</h5>
                    <h5><b>Room:</b> {c.room?.name}</h5>
                    <h5><b>Start time:</b> {moment(c.startTime).format('MMMM Do YYYY, h:mm a')}</h5>
                    <h5><b>End time:</b> {moment(c.endTime).format('MMMM Do YYYY, h:mm a')}</h5>
                </div>

                <div className="col-xs-2">
                  <span className="glyphicon glyphicon-trash pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.props.deleteClass(c._id)}></span>
                  <span className="glyphicon glyphicon-edit pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.editClass(c)}></span>
                </div>
              </div>
            </div>
          )}
        </Row>
        {this.props.showCreateClassModal &&
          <ClassModal
            tittle="Create new class"
            onHide={() => this.props.hideAllClassModal()}
            handleSubmit={(values) => {
              this.props.createNewClass(values);
            }}
            teachers={teachers}
            rooms={rooms}
            error={this.props.error}
          />
        }
        {this.props.showEditClassModal &&
          <ClassModal
            tittle="Edit class"
            onHide={() => this.props.hideAllClassModal()}
            handleSubmit={(values) => {
              this.props.editClass(this.state.editingClass._id, values);
            }}
            editingClass={this.state.editingClass}
            teachers={teachers}
            rooms={rooms}
            error={this.props.error}
          />
        }
      </Grid>
    );
  }
}

class ClassModal extends Component {
  state = {
    name: this.props.editingClass?.name,
    teacher: this.props.editingClass ? this.props.teachers.find(t => t.value === this.props.editingClass.teacher?._id) : null,
    room: this.props.editingClass ? this.props.rooms.find(r => r.value === this.props.editingClass.room?._id) : null,
    startTime: this.props.editingClass ? moment(this.props.editingClass.startTime).format('YYYY-MM-DDThh:mm') : null,
    endTime: this.props.editingClass ? moment(this.props.editingClass.endTime).format('YYYY-MM-DDThh:mm') : null
  }
  render() {
    const { onHide, handleSubmit, tittle, teachers, rooms } = this.props;

    return <Modal show onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{tittle}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: '120px' }}>
        <form name="qryform" id="qryform" method="post" action="mail.php" onsubmit="return(validate());" novalidate="novalidate">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
          </div>
          <div className="form-group">
            <label>Teacher:</label>
            <Select
              value={this.state.teacher}
              onChange={(opt) => this.setState({teacher: opt})}
              options={teachers}
            />
          </div>
          <div className="form-group">
            <label>Room:</label>
            <Select
              value={this.state.room}
              onChange={(opt) => this.setState({room: opt})}
              options={rooms}
            />
          </div>
          <div className="form-group">
            <label>Start time:</label>
            <input type="datetime-local" value={this.state.startTime} id="startTime" name="startTime" style={{ display: 'block' }} onChange={(ev => this.setState({ startTime: ev.target.value }))}/>
          </div>
          <div className="form-group">
            <label>End time:</label>
            <input type="datetime-local" value={this.state.endTime} id="endTime" name="endTime" style={{ display: 'block' }} onChange={(ev => this.setState({ endTime: ev.target.value }))}/>
          </div>
        </form>
        {this.props.error && <div role="alert" className="alert alert-danger" style={{ marginTop: 0, marginBottom: '10px' }}>Error: {this.props.error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={onHide}>cancel</Button>
        <Button bsStyle="primary" onClick={() => handleSubmit({ name: this.state.name, teacher: this.state.teacher?.value, room: this.state.room?.value, startTime: moment(this.state.startTime).format(), endTime: moment(this.state.endTime).format()})}>
          save
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}

ClassListComponent.propTypes = {
  getUserInfo: PropTypes.func,
  getClassList: PropTypes.func,
  editClass: PropTypes.func,
  createNewClass: PropTypes.func,
  deleteClass: PropTypes.func,
  hideAllClassModal: PropTypes.func,
  openCreateClassModal: PropTypes.func,
  openCreateClassModal: PropTypes.func,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  classList: PropTypes.shape({
    data: PropTypes.string
  }),
  showEditClassModal: PropTypes.shape({
    data: PropTypes.string
  }),
  showEditClassModal: PropTypes.shape({
    data: PropTypes.string
  }),
  error: PropTypes.shape({
    data: PropTypes.string
  })
};

ClassListComponent.defaultProps = {
  getUserInfo: () => { },
  getUserList: () => { },
  getRoomList: () => { },
  getClassList: () => { },
  editClass: () => { },
  deleteClass: () => { },
  createNewClass: () => { },
  hideAllClassModal: () => { },
  openCreateClassModal: () => { },
  openEditClassModal: () => { },
  history: null,
  userList: null,
  roomList: null,
  showEditClassModal: null,
  showCreateClassModal: null,
  error: null,
  classList: null
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    userList: state.userList.userList,
    roomList: state.roomList.roomList,
    classList: state.classList.classList,
    error: state.classList.error,
    showEditClassModal: state.classList.showEditClassModal,
    showCreateClassModal: state.classList.showCreateClassModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserInfo: authActionCreator.getUserInfo,
    getUserList: userListActionCreator.getUserList,
    getRoomList: roomListActionCreator.getRoomList,
    getClassList: classListActionCreator.getClassList,
    editClass: classListActionCreator.editClass,
    deleteClass: classListActionCreator.deleteClass,
    hideAllClassModal: classListActionCreator.hideAllClassModal,
    openCreateClassModal: classListActionCreator.openCreateClassModal,
    openEditClassModal: classListActionCreator.openEditClassModal,
    createNewClass: classListActionCreator.createNewClass
  }, dispatch);
};

const ClassList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassListComponent));

export default ClassList;

