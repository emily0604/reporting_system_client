import React, { Component, Fragment } from 'react';
import { Button, Icon, Loader, Segment } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { TextError } from '../../styles/App';
import ErrorMessage from '../ErrorMessage';
import { CreateTaskFormWrapper, TaskContainerWrapper, TaskItem, SelectProject, TaskInput } from '../../styles/CreateTaskForm';

class CreateTaskForm extends Component {

  handleTaskChange = (idx) => (e) => {
    const { tasks, handleTaskChange } = this.props;
    const newTasks = tasks.map((task, tidx) => {
      if (idx !== tidx) return task;
      return { ...task, [e.target.name]: e.target.value };
    });

    handleTaskChange(newTasks);
  };

  handleAddNewTask = () => {
    const { handleAddNewTask } = this.props;
    const newTask = { projectId: '', url: '', logtime: '' };
    handleAddNewTask(newTask);
  };

  handleRemoveTask = (idx) => () => {
    const { tasks, handleRemoveTask } = this.props;
    const tasksAfterRemove = tasks.filter((t, tidx) => idx !== tidx);
    handleRemoveTask(tasksAfterRemove);
  };

  render() {
    const { tasks, errors } = this.props;
    return (
      <CreateTaskFormWrapper>
        <Button
          type="button"
          compact
          color='blue'
          size='tiny'
          onClick={this.handleAddNewTask}
        ><Icon name='add square'/>
          Add new task
        </Button>

        {tasks.length > 0 && (
          <Segment>
            <Query query={GET_PROJECT_OF_MEMBER}>
              {({ data, loading, error }) => {
                if (loading) return <Loader size='tiny' active inline='centered'/>;
                if (error) return <ErrorMessage error={error}/>;
                const { projects } = data.me;

                return (
                  <Fragment>
                    {tasks.map((task, idx) => (
                      // eslint-disable-next-line
                      <TaskContainerWrapper key={idx}>
                        <TaskItem>
                          <SelectProject
                            name="projectId"
                            value={task.projectId}
                            onChange={this.handleTaskChange(idx)}
                          >
                            <option>Select Project...</option>
                            {projects.map(project => (
                              <option
                                key={project.id}
                                value={project.id}
                              >
                                {project.title}
                              </option>
                            ))}
                          </SelectProject>

                          <TaskInput
                            type="text"
                            name="url"
                            value={task.url}
                            placeholder="Url"
                            autoComplete="off"
                            onChange={this.handleTaskChange(idx)}
                          />

                          <TaskInput
                            small
                            type="number"
                            name="logtime"
                            value={task.logtime}
                            placeholder="Logtime"
                            autoComplete="off"
                            onChange={this.handleTaskChange(idx)}
                          />

                          <Button type="button" onClick={this.handleRemoveTask(idx)} icon>
                            <Icon name='remove circle'/>
                          </Button>
                        </TaskItem>
                        {errors.tasks[idx] && (
                          <TextError>{errors.tasks[idx]}</TextError>
                        )}
                      </TaskContainerWrapper>
                    ))}
                  </Fragment>
                )
              }}
            </Query>
          </Segment>
        )}
      </CreateTaskFormWrapper>
    );
  }
}

const GET_PROJECT_OF_MEMBER = gql`
  query {
    me {
      id
      projects {
        id
        title
      }
    }
  }
`;

export default CreateTaskForm;