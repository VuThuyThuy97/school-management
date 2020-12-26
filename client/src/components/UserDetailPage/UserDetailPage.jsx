import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Col, Row, Button } from 'react-bootstrap';
import NavigationBar from '../NavigationBar/NavigationBar';
import * as authActionCreator from '../../actionCreators/authActionCreator';
import * as userDetailActionCreator from '../../actionCreators/userDetailActionCreator';
import api from '../../utils/api';

export class UserDetailComponent extends Component {

  state = {
    name: null,
    username: null,
    email: null,
    phone: null,
    password: null,
    img: null,
    subject: null,
  }

  componentWillMount() {
    this.props.getUserInfo();
  }

  render() {

    let user = {
      name: this.state.name !== null ? this.state.name : this.props.user?.name,
      username: this.state.username !== null ? this.state.username : this.props.user?.username,
      email: this.state.email !== null ? this.state.email : this.props.user?.email,
      phone: this.state.phone !== null ? this.state.phone : this.props.user?.phone,
      subject: this.state.subject !== null ? this.state.subject : this.props.user?.subject,
      password: this.state.password !== null ? this.state.password : null,
      img: this.state.img !== null ? this.state.img : this.props.user?.img,
    }

    return (
      <Grid>
        <Row>
          <Col>
            <NavigationBar />
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ padding: '0 200px '}}>
            <div className="preview text-center">
                <img className="preview-img" src={`http://localhost:4000/avatar/${(this.state.img || this.props.user?.img || 'default.jpg')}?${new Date()}`} alt="Preview Image" width="200" height="200"/>
                <div className="browse-button">
                    <i className="glyphicon glyphicon-pencil"></i>
                    <input className="browse-input" type="file" name="UploadedFile" id="UploadedFile" onChange={async (ev) => {
                      let formData = new FormData(); 
                      formData.append( 
                        "avatar", 
                        ev.target.files[0]
                      ); 
                      this.setState({ imgChanged: true, img: this.state.img})
                      api.changeProfilePicture(this.props.user._id, formData).then(() => this.props.getUserInfo());
                    }}/>
                </div>
                <div className="error" style={!this.props.error ? { visibility: 'hidden' } : {}}>Error: {this.props.error}</div>
            </div>
              <div className="form-group">
                <label>Username:</label>
                <input type="text" className="form-control" id="username" placeholder="Enter Username" name="username" value={user.username} onChange={(e) => this.setState({ username: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" value={user.name} onChange={(e) => this.setState({ name: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={user.password} onChange={(e) => this.setState({ password: e.target.value })}/>
              </div>
              {!this.props.user?.isAdmin && <div className="form-group">
                <label>Subject:</label>
                <input type="text" className="form-control" id="subject" placeholder="Enter Subject" name="subject" value={user.subject} onChange={(e) => this.setState({ subject: e.target.value })}/>
              </div>}

              <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Enter Email" name="email" value={user.email} onChange={(e) => this.setState({ email: e.target.value })}/>
              </div>
              
              <div className="form-group">
                <label>Phone No.:</label>
                <input type="text" className="form-control" id="phone" placeholder="Enter Phone no." name="phone" value={user.phone} onChange={(e) => this.setState({ phone: e.target.value })}/>
              </div>
              <Button className="outline-primary pull-right btn-primary" style={{ marginTop: '20px' }} onClick={()=> this.props.updateUserInfo(this.props.user._id, user)}>Save</Button>{' '}
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserDetailComponent.propTypes = {
  getUserInfo: PropTypes.func,
  updateUserInfo: PropTypes.func,
  history: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.shape({
    data: PropTypes.string
  }),
  error: PropTypes.shape({
    data: PropTypes.string
  })
};

UserDetailComponent.defaultProps = {
  getUserInfo: () => { },
  updateUserInfo: () => { },
  history: null,
  user: null,
  error: null
};

const mapStateToProps = (state) => {
  return {
    pageStatus: state.auth.pageStatus,
    user: state.auth.user,
    error: state.userDetail?.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getUserInfo: authActionCreator.getUserInfo,
    updateUserInfo: userDetailActionCreator.updateUserInfo,
  }, dispatch);
};

const UserDetail = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailComponent));

export default UserDetail;

