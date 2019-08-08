import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { Grid, withStyles, Theme } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import walmartLogo from '../../images/walmartLogo.svg';
import { push } from 'connected-react-router';
import SearchBar from '../../components/SearchBar';

interface IHeaderComponentProps {

}

interface IHeaderProps {
  dispatch: React.Dispatch<IAction>;
}

type IHeaderType = IHeaderComponentProps & IHeaderProps & WithStyles<keyof ReturnType<typeof styles>>;

class Header extends React.Component<IHeaderType, {}> {

  public handleHome = () => {
    const {
      dispatch,
    } = this.props;

    dispatch(push('/'));
  }

  public render() {
    const {
      classes
    } = this.props;

    const logo = <Grid
        onClick={this.handleHome}
        className={classes.logo}
      >
        <img src={walmartLogo} alt='walmart logo'/>
      </Grid>
    
    return (
      <Grid style={{border: '1px solid red'}}>
        <Grid
          container={true}
          direction='row'
          wrap='nowrap'
        >
          {logo}
          <SearchBar />
        </Grid>
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  logo: {
    cursor: 'pointer'
  },

})

export default compose<React.ComponentClass<IHeaderComponentProps>>(
  withStyles(styles),
  connect(),
)(Header);