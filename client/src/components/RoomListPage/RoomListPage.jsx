import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Col, Row, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as authActionCreator from '../../actionCreators/authActionCreator';
import * as roomListActionCreator from '../../actionCreators/roomListActionCreator';

export class RoomListComponent extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getRoomList();
  }

  state = {
    rooms: this.props.roomList,
    editingRoom: null
  }

  createNewRoom () {
    this.props.openCreateRoomModal();
  }

  editRoom (room) {
    this.setState({ editingRoom: room });
    this.props.openEditRoomModal();
  }

  render() {
    let rooms = this.props.roomList;
    return (
      <Grid>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Row style={{margin: '0 50px'}}>
          <h2 style={{ padding: '15px 0', margin: '10px 0 30px 0' }}>
            Rooms
            <span className="glyphicon glyphicon-plus pull-right" style={{ margin: '5px', fontSize: '20px' }} onClick={() => {
              this.createNewRoom();
            }}></span>
          </h2>
          {rooms && rooms.map(room =>
            <div className="container-fluid well span6" style={{ backgroundImage: 'linear-gradient(to bottom,#f9f9f9 0,#fff 100%)'}}>
            <div className="row-fluid">
              <div className="col-xs-10">
                  <h3 style={{ marginTop: '5px', marginBottom: '15px' }}>{room.name}</h3>
                  <h5><b>Building:</b> {room.building}</h5>
              </div>

              <div className="col-xs-2">
                <span className="glyphicon glyphicon-trash pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.props.deleteRoom(room._id)}></span>
                <span className="glyphicon glyphicon-edit pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.editRoom(room)}></span>
              </div>
            </div>
          </div>
          )}
        </Row>
        {this.props.showCreateRoomModal &&
          <RoomModal
            tittle="Create new room"
            onHide={() => this.props.hideAllRoomModal()}
            handleSubmit={(values) => {
              this.props.createNewRoom(values);
            }}
            error={this.props.error}
          />
        }
        {this.props.showEditRoomModal &&
          <RoomModal
            tittle="Edit room"
            onHide={() => this.props.hideAllRoomModal()}
            handleSubmit={(values) => {
              this.props.editRoom(this.state.editingRoom._id, values);
            }}
            room={this.state.editingRoom}
            error={this.props.error}
          />
        }
      </Grid>
    );
  }
}

class RoomModal extends Component {
  state = {
    name: this.props.room?.name,
    building: this.props.room?.building
  }
  render() {
    const { onHide, handleSubmit, tittle } = this.props;

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
            <label>Building:</label>
            <input type="text" className="form-control" id="building" placeholder="Enter building" name="building" value={this.state.building} onChange={(e) => this.setState({ building: e.target.value })}/>
          </div>
        </form>
        {this.props.error && <div role="alert" className="alert alert-danger" style={{ marginTop: 0, marginBottom: '10px' }}>Error: {this.props.error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button bsStyle="danger" onClick={onHide}>cancel</Button>
        <Button bsStyle="primary" onClick={() => handleSubmit(this.state)}>
          save
        </Button>
      </Modal.Footer>
    </Modal>;
  }
}

RoomListComponent.propTypes = {
  getUserInfo: PropTypes.func,
  getRoomList: PropTypes.func,
  editRoom: PropTypes.func,
  createNewRoom: PropTypes.func,
  deleteRoom: PropTypes.func,
  hideAllRoomModal: PropTypes.func,
  openCreateRoomModal: PropTypes.func,
  openCreateRoomModal: PropTypes.func,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  roomList: PropTypes.shape({
    data: PropTypes.string
  }),
  showEditRoomModal: PropTypes.shape({
    data: PropTypes.string
  }),
  showCreateRoomModal: PropTypes.shape({
    data: PropTypes.string
  }),
  error: PropTypes.shape({
    data: PropTypes.string
  })
};

RoomListComponent.defaultProps = {
  getUserInfo: () => { },
  getRoomList: () => { },
  editRoom: () => { },
  deleteRoom: () => { },
  createNewRoom: () => { },
  hideAllRoomModal: () => { },
  openCreateRoomModal: () => { },
  openEditRoomModal: () => { },
  history: null,
  roomList: null,
  showEditRoomModal: null,
  showCreateRoomModal: null,
  error: null,
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    roomList: state.roomList.roomList,
    error: state.roomList.error,
    showEditRoomModal: state.roomList.showEditRoomModal,
    showCreateRoomModal: state.roomList.showCreateRoomModal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserInfo: authActionCreator.getUserInfo,
    getRoomList: roomListActionCreator.getRoomList,
    editRoom: roomListActionCreator.editRoom,
    deleteRoom: roomListActionCreator.deleteRoom,
    createNewRoom: roomListActionCreator.createNewRoom,
    hideAllRoomModal: roomListActionCreator.hideAllRoomModal,
    openCreateRoomModal: roomListActionCreator.openCreateRoomModal,
    openEditRoomModal: roomListActionCreator.openEditRoomModal,
  }, dispatch);
};

const RoomList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomListComponent));

export default RoomList;

