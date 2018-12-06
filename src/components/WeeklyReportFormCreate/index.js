import React from 'react';
import { Formik } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import { Persist } from 'formik-persist';
import { Form, Message } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import TextArea from '../TextArea';
import AsyncButton from '../AsyncButton';
import { CenterWrapper } from '../../styles/App';
import ErrorMessage from '../ErrorMessage';

const DailyReportSchema = Yup.object().shape({
  issue: Yup.string().required('Issue is required'),
  solution: Yup.string().required('Solution option is required'),
  summary: Yup.string().required('Summary is required')
});

const WeeklyReportFormCreate = () => (
  <Mutation
    mutation={CREATE_WEEKLY_REPORT_MUTATION}
  >
    {(createWeeklyReport, { loading, error }) => {

      if (error) return <ErrorMessage error={error} />;

      return (
        <CenterWrapper>
          <Formik
            initialValues={{
              issue: '',
              solution: '',
              description: '',
              summary: '',
            }}
            enableReinitialize
            validationSchema={DailyReportSchema}
            onSubmit={async (values, { setSubmitting, setStatus, setErrors, resetForm }) => {
              const { issue, solution, description, summary } = values;

              try {
                await createWeeklyReport({
                  variables: {
                    issue,
                    solution,
                    description,
                    summary
                  }
                });
                resetForm({});
                setStatus({ success: true });
              } catch (error) {
                setStatus({ success: false });
                setSubmitting(false);
                setErrors({ submit: error.message });
              }
            }}
            render={({ values, handleSubmit, handleChange, touched, errors, status }) => (
              <Form
                onSubmit={handleSubmit}
                loading={loading}
                success={status ? status.success : false}
              >

                <TextArea
                  type="textarea"
                  label="Issue"
                  name="issue"
                  value={values.issue || ''}
                  error={touched.issue && errors.issue}
                  onChange={handleChange}
                />

                <TextArea
                  type="textarea"
                  label="Solution"
                  name="solution"
                  value={values.solution || ''}
                  error={touched.solution && errors.solution}
                  onChange={handleChange}
                />

                <TextArea
                  type="textarea"
                  label="Today Achievement"
                  name="description"
                  value={values.description || ''}
                  error={touched.description && errors.description}
                  onChange={handleChange}
                />

                <TextArea
                  type="textarea"
                  label="Summary"
                  name="summary"
                  value={values.summary || ''}
                  error={touched.summary && errors.summary}
                  onChange={handleChange}
                />

                <Message
                  success
                  header='Create Successfully!'
                  content="Your weekly report has been created."
                />

                <AsyncButton
                  buttonName="Create"
                  type="submit"
                  loading={loading}
                />
                <Persist name="create-weekly-report-form" debounce="1000"/>
              </Form>
            )}
          />
        </CenterWrapper>
      )
    }}
  </Mutation>
);

const CREATE_WEEKLY_REPORT_MUTATION = gql`

  mutation CREATE_WEEKLY_REPORT_MUTATION (
  $issue: String!
  $solution: String!
  $description: String!
  $summary: String!
  ) {
    createWeeklyReport(
      issue: $issue
      solution: $solution
      description: $description
      summary: $summary
    ) {
      id
      issue
      solution
      description
      summary
      createdAt
    }
  }
`;

export default WeeklyReportFormCreate;
