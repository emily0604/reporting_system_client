import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import User from 'components/User';
import SignOut from '../SignOut';
import { SideBarWrapper } from '../../styles/Sidebar';
import Spinner from '../Spinner';

const SideBar = () => (
  <User>
    {({ data, loading, error }) => (
      <Fragment>
        {loading && <Spinner />}
        {error && <div>Error: {error.message}</div>}

        <SideBarWrapper>
          <ul>
            <li>
              <img src={data.me.avatar} alt="avatar profile"/>
              <Link to="/profile/edit">Edit Profile</Link>
            </li>
            <li><Link to="/reports/new">Create Daily Report</Link></li>
            <li><Link to="/reports">Daily Reports</Link></li>
            <li><SignOut/></li>
          </ul>
        </SideBarWrapper>
      </Fragment>
    )}
  </User>
);

export default SideBar;
