import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Spinner from 'components/Spinner';
import { Divider, Header, Image } from 'semantic-ui-react';
import isEmpty from 'lodash/isEmpty';
import uuidv1 from 'uuid/v1';
import { ContentWrapper, SpinnerWrapper } from '../../styles/App';
import { MemberListHeader, MemberListRow, RoleTag } from '../../styles/MemberList';
import { ContentsTable, ContentsHeaderColumn, ContentsRowColumn } from '../../styles/ContentsTable';
import ErrorMessage from '../../components/ErrorMessage';

const headerItems = ['No', 'avatar', 'name', 'email', 'phone', 'roles'];

class MemberListContainer extends Component {
  render() {
    const { match } = this.props;
    const { team } = this.props.userData.me;
    if (isEmpty(team)) return <p>error: You don't belong to any team!</p>;

    const { id: teamId } = team;
    if (match.params.id !== teamId) return <p>error: You are not the leader of this team!</p>;

    return (
      <Query
        query={TEAM_MEMBERS_QUERY}
        variables={{
          teamId
        }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return (
              <SpinnerWrapper bgColor="#FFFFFF">
                <Spinner />
              </SpinnerWrapper>
            );
          }

          if (error) return <ErrorMessage error={error} />;

          return (
            <ContentWrapper>
              <Header>Team Member List</Header>
              <Divider />

              <ContentsTable>
                <MemberListHeader>
                  {headerItems.map(item => (
                    <ContentsHeaderColumn key={item}>{item}</ContentsHeaderColumn>
                  ))}
                </MemberListHeader>

                {data.users.map((user, i) => (
                  <MemberListRow key={user.id}>
                    <ContentsRowColumn>{i + 1}</ContentsRowColumn>
                    <ContentsRowColumn>
                      <Image src={user.avatar} size="mini" avatar />
                    </ContentsRowColumn>
                    <ContentsRowColumn>{user.name}</ContentsRowColumn>
                    <ContentsRowColumn>{user.email}</ContentsRowColumn>
                    <ContentsRowColumn>{user.phone}</ContentsRowColumn>
                    <ContentsRowColumn>
                      {user.roles.map(role => (
                        <RoleTag key={uuidv1()}>{role}</RoleTag>
                      ))}
                    </ContentsRowColumn>
                  </MemberListRow>
                ))}
              </ContentsTable>
            </ContentWrapper>
          );
        }}
      </Query>
    );
  }
}

const TEAM_MEMBERS_QUERY = gql`
  query TEAM_MEMBERS_QUERY($teamId: ID!) {
    users(where: { team: { id: $teamId } }) {
      id
      avatar
      name
      email
      phone
      roles
    }
  }
`;

export default MemberListContainer;