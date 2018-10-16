import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query {
      me {
          id
          name
          email
          avatar
          role
      }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {({ loading, error, data}) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error</div>;

      const profile = data.me;

      return (
        <div>
          <p>{profile.name}</p>
          <p>{profile.email}</p>
          <img src={profile.avatar} alt="" style={{ width: '64px', height: '64px'}}/>
        </div>
      )
    }}
  </Query>
);

export default User;
export { CURRENT_USER_QUERY };