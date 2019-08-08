import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { Grid, withStyles, Theme } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';

interface IFooterComponentProps {

}

interface IFooterProps {
  dispatch: React.Dispatch<IAction>;
}

type IFooterType = IFooterComponentProps & IFooterProps & WithStyles<keyof ReturnType<typeof styles>>;

class Footer extends React.Component<IFooterType, {}> {

  public render() {
    return (
      <Grid>
        footer
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({

})

export default compose<React.ComponentClass<IFooterComponentProps>>(
  withStyles(styles),
  connect(),
)(Footer);