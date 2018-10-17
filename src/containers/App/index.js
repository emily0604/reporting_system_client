import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import { MainWrapper } from './styles';

const loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('components/Home'),
  loading
});

const Dashboard = Loadable({
  loader: () => import('components/Dashboard'),
  loading
});

const Auth = Loadable({
  loader: () => import('components/Auth'),
  loading
});

const DailyReports = Loadable({
  loader: () => import('containers/Member/DailyReports'),
  loading
});

const App = () => (
  <div className="App">
    <MainWrapper>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/daily_reports" component={DailyReports} />
      </Switch>
    </MainWrapper>
  </div>
);

export default App;
