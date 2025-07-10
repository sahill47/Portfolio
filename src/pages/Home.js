import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LogoLink } from '../components/logo/LogoLink';
import { Content } from '../components/content/Content';
import { Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DisplacementSphere from '../components/background/DisplacementSphere';
import { ThemeToggle } from '../components/theme/ThemeToggle';
import { Resume } from '../components/resume/Resume';
import { SocialIcons } from '../components/content/SocialIcons';
import { SpeedDials } from '../components/speedDial/SpeedDial';
import { SideNavbar } from '../components/nav/SideNavbar';
import { Works } from '../components/works/Works';
import { About } from '../components/about/About';
import {Contact} from '../components/contact/Contact';
import AdminPanel from '../components/adminPanel/Admin';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

export const Home = () => {
  const classes = useStyles();

  return (
    <Router>
      <Switch>
        <Route path="/admin" component={AdminPanel} />
        <Route path="/">
          <>
            <div className={classes.root} id="home">
              <DisplacementSphere />
              <LogoLink />
              <Content />
              <ThemeToggle />
              <Hidden smDown>
                <SocialIcons />
              </Hidden>
              <Hidden mdUp>
                <SpeedDials />
              </Hidden>
              <Resume />
            </div>
            <SideNavbar />
            <Works />
            <About />
            <Contact />
          </>
        </Route>
      </Switch>
    </Router>
  );
};
