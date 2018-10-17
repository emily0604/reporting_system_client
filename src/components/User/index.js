import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      avatar
      roles
    }
  }
`;

class User extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Query {...this.props} query={CURRENT_USER_QUERY}>
        {payload => this.props.children(payload)}
      </Query>
    );
  }
}

export default User;
export { CURRENT_USER_QUERY };