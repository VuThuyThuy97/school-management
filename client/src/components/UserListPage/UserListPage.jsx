import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Col, Row, Modal, Button } from 'react-bootstrap';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as authActionCreator from '../../actionCreators/authActionCreator';
import * as userListActionCreator from '../../actionCreators/userListActionCreator';

export class UserListComponent extends Component {
  componentWillMount() {
    this.props.getUserInfo();
    this.props.getUserList();
  }

  state = {
    users: this.props.userList,
    editingUser: null
  }

  createNewUser () {
    this.props.openCreateUserModal();
  }

  editUser (user) {
    this.setState({ editingUser: user });
    this.props.openEditUserModal();
  }

  render() {
    let users = this.props.userList;
    return (
      <Grid>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Row style={{margin: '0 50px'}}>
          <h2 style={{ padding: '15px 0', margin: '10px 0 30px 0' }}>
            Users
            <span className="glyphicon glyphicon-plus pull-right" style={{ margin: '5px', fontSize: '20px' }} onClick={() => {
              this.createNewUser();
            }}></span>
          </h2>
          {users && users.map(user =>
            <div className="container-fluid well span6" style={{ backgroundImage: 'linear-gradient(to bottom,#f9f9f9 0,#fff 100%)'}}>
              <div className="row-fluid">
                <div className="col-xs-2" >
                  <img src={"http://localhost:4000/avatar/" + user.img} className="img-circle" style={{ width: '140px', height: '140px' }}/>
                </div>

                <div className="col-xs-8" style={{ paddingLeft: '30px' }}>
                    <h3>{user.name}</h3>
                    <h6><b>Username:</b> {user.username}</h6>
                    <h6><b>Subject:</b> {user.subject}</h6>
                    <h6><b>Email:</b> {user.email}</h6>
                    <h6><b>Phone:</b> {user.phone}</h6>
                </div>

                <div className="col-xs-2">
                  <span className="glyphicon glyphicon-trash pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.props.deleteUser(user._id)}></span>
                  <span className="glyphicon glyphicon-edit pull-right" style={{ margin: '5px', color: 'blue' }} onClick={() => this.editUser(user)}></span>
                </div>
              </div>
            </div>
          )}
        </Row>
        {this.props.showCreateUserModal &&
          <UserModal
            tittle="Create new user"
            onHide={() => this.props.hideAllUserModal()}
            handleSubmit={(values) => {
              this.props.createNewUser(values);
            }}
            isCreatingNew
            error={this.props.error}
          />
        }
        {this.props.showEditUserModal &&
          <UserModal
            tittle="Edit user"
            onHide={() => this.props.hideAllUserModal()}
            handleSubmit={(values) => {
              this.props.editUser(this.state.editingUser._id, values);
            }}
            user={this.state.editingUser}
            error={this.props.error}
          />
        }
      </Grid>
    );
  }
}

class UserModal extends Component {
  state = {
    username: this.props.user?.username,
    name: this.props.user?.name,
    password: '',
    subject: this.props.user?.subject,
    email: this.props.user?.email,
    phone: this.props.user?.phone,
    img: this.props.user?.img,
  }
  render() {
    const { onHide, handleSubmit, tittle, isCreatingNew} = this.props;

    return <Modal show onHide={onHide} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{tittle}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: '120px' }}>
        <form name="qryform" id="qryform" method="post" action="mail.php" onsubmit="return(validate());" novalidate="novalidate">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" className="form-control" id="username" placeholder="Enter Username" name="username" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}/>
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>
          </div>
          {isCreatingNew && 
            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
            </div>
          }
          <div className="form-group">
            <label>Subject:</label>
            <input type="text" className="form-control" id="subject" placeholder="Enter Subject" name="subject" value={this.state.subject} onChange={(e) => this.setState({ subject: e.target.value })}/>
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
          </div>
          
          <div className="form-group">
            <label>Phone No.:</label>
            <input type="text" className="form-control" id="phone" placeholder="Enter Phone no." name="phone" value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })}/>
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

UserListComponent.propTypes = {
  getUserInfo: PropTypes.func,
  getUserList: PropTypes.func,
  editUser: PropTypes.func,
  createNewUser: PropTypes.func,
  deleteUser: PropTypes.func,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  userList: PropTypes.shape({
    data: PropTypes.string
  }),
  showEditUserModal: PropTypes.shape({
    data: PropTypes.string
  }),
  showCreateUserModal: PropTypes.shape({
    data: PropTypes.string
  }),
  hideAllUserModal: PropTypes.shape({
    data: PropTypes.string
  }),
  error: PropTypes.shape({
    data: PropTypes.string
  })
};

UserListComponent.defaultProps = {
  getUserInfo: () => { },
  getUserList: () => { },
  editUser: () => { },
  deleteUser: () => { },
  createNewUser: () => { },
  openEditUserModal: () => { },
  openCreateUserModal: () => { },
  hideAllUserModal: () => { },
  history: null,
  error: null,
  userList: null,
  showEditUserModal: null,
  showCreateUserModal: null
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    userList: state.userList.userList,
    error: state.userList.error,
    showEditUserModal: state.userList.showEditUserModal,
    showCreateUserModal: state.userList.showCreateUserModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserInfo: authActionCreator.getUserInfo,
    getUserList: userListActionCreator.getUserList,
    editUser: userListActionCreator.editUser,
    deleteUser: userListActionCreator.deleteUser,
    createNewUser: userListActionCreator.createNewUser,
    openEditUserModal: userListActionCreator.openEditUserModal,
    openCreateUserModal: userListActionCreator.openCreateUserModal,
    hideAllUserModal: userListActionCreator.hideAllUserModal
  }, dispatch);
};

const UserList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserListComponent));

export default UserList;

