import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import WeeklyReportFormCreate from 'components/WeeklyReportFormCreate';
import { ContentWrapper } from '../../styles/App';

class CreateWeeklyReportContainer extends Component {
  render() {
    return (
      <ContentWrapper>
        <Header>
          New Weekly Report
        </Header>
        <Divider/>
        <WeeklyReportFormCreate />
      </ContentWrapper>
    );
  }
}

export default CreateWeeklyReportContainer;