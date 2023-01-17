import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PopupWindow from './PopupWindow';
import { toQuery } from '../params';
import { Button, Col, Row } from 'react-bootstrap';


class GitHubLogin extends Component {
  static propTypes = {
    buttonText: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    onRequest: PropTypes.func,
    onSuccess: PropTypes.func,
    onFailure: PropTypes.func,
    redirectUri: PropTypes.string,
    scope: PropTypes.string,
  }

  static defaultProps = {
    buttonText: 'Sign in with GitHub',
    redirectUri: '',
    scope: 'read:user',
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  }

  onBtnClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });
    const popup = this.popup = PopupWindow.open(
      'github-oauth-authorize',
      `https://github.com/login/oauth/authorize?${search}`,
      { height: 1000, width: 600 }
    );

    this.onRequest();
    popup.then(
      data => this.onSuccess(data),
      error => this.onFailure(error)
    );
  }

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    if (!data.code) {
      return this.onFailure(new Error('\'code\' not found'));
    }

    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  retrieveUserIdentity = (data) => {
    // const { personalAccessToken } = this.props;
    // const params = { client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, code: data.code }

    // fetch('https://api.github.com/user', {
    //   headers: {
    //     'Accept': 'application/vnd.github+jso',
    //     'Authorization': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': 'X-Requested-With'
    //   }
    // }).then(res => {
    //   this.props.onSuccess(res);
    // }).catch(err => this.props.onFailure(err));

    
  }

  render() {
    const { className, buttonText, children } = this.props;
    const attrs = { onClick: this.onBtnClick };

    if (className) {
      attrs.className = className;
    }

    return (
            <Row>
              <Col>
                <Button {...attrs}>{ children || buttonText }</Button>
              </Col>
            </Row>
          );
  }
}

export default GitHubLogin;