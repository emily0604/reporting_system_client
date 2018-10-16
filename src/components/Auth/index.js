import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

class Auth extends Component {

  state = {
    login: false,
    googleCode: ''
  };

  success = response => {
    console.log(response);
  };

  error = response => {
    console.error(response);
  };

  loading = () => {
    console.log('loading');
  };

  logout = () => {
    console.log('logout');
  };

  render() {
    const { login, googleCode } = this.state;

    return (
      <div>
        {login ? (
          <div>
            {googleCode}
            <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
          </div>
        ): (
          <Mutation mutation={LOGIN_MUTATION} variables={{ googleCode }}>
            {(authenticate, { data }) => (
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/adwords https://www.googleapis.com/auth/plus.profile.agerange.read https://www.googleapis.com/auth/plus.profile.language.read https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics openid email profile"
                onSuccess={
                  (response) => authenticate({
                    variables: { googleCode: response.code }
                  })
                }
                onFailure={this.error}
                onRequest={this.loading}
                approvalPrompt="force"
                responseType="code"
                // uxMode="redirect"
                // redirectUri="http://google.com"
                // disabled`
                // prompt="consent"
                // className='button'
                // style={{ color: 'red' }}
              >
                <span>Login with Google</span>
              </GoogleLogin>
            )}

          </Mutation>

        )}
      </div>
    );
  }
}

const LOGIN_MUTATION = gql`
    mutation LoginMutation($googleCode: String!) {
        authenticate(googleCode: $googleCode) {
            user {
                name
                googleId
                avatar
                email
            }
        }
    }
`;

export default Auth;
