import React from 'react';
import styled from 'react-emotion';
import User from 'components/User';
import SignOut from '../SignOut';

const HomeContainer = styled.div`
  color: hotpink;
`;

const Home = () => (
  <HomeContainer>
    <User>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading ...</div>;
        if (error) return `Error: ${error.message}`;
        const profile = data.me;
        return (
          <div>
            <p>{profile.naprofile}</p>
            <p>{profile.email}</p>
            <img
              alt="profile"
              src={profile.avatar}
              style={{ width: '64px', height: '64px' }}
            />
            <SignOut/>
          </div>
        );
      }}
    </User>
  </HomeContainer>
);

export default Home;
