import React, { Component } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import DailyReportFormUpdate from 'components/DailyReportFormUpdate';
import { graphql } from 'react-apollo';
import { ContentWrapper } from '../../styles/App';
import { SINGLE_REPORT_QUERY } from './DailyReportDetailContainer';
import Spinner from '../../components/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

class UpdateDailyReportContainer extends Component {
  render() {

    const { loading, error, dailyReport } = this.props.data;

    if (loading) return <Spinner/>;

    if (error) return <ErrorMessage error={error} />;

    console.log(dailyReport);

    return (
      <ContentWrapper>
        <Header>
          Update Daily Report
        </Header>
        <Divider/>
        <DailyReportFormUpdate
          dailyReport={dailyReport}
          {...this.props}
        />
      </ContentWrapper>
    );
  }
}

export default graphql(SINGLE_REPORT_QUERY, {
  options: (props) => ({ variables: { id: props.match.params.id } })
})(UpdateDailyReportContainer);