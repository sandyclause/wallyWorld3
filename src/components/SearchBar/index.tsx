import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { Grid, withStyles, Theme, Input } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import walmartLogo from '../../images/walmartLogo.svg';
import { push } from 'connected-react-router';
import { GetSearchProducts } from '../../actions/default';

interface IHeaderComponentProps {

}

interface IHeaderProps extends IHeaderComponentProps {
  dispatch: React.Dispatch<IAction>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLInputElement>) => void;
}

interface IHeaderState {
  input: string;
}

type IHeaderType = IHeaderComponentProps & IHeaderProps & WithStyles<keyof ReturnType<typeof styles>>;

class Header extends React.Component<IHeaderType, IHeaderState> {
  public state: IHeaderState = {
    input: '',
  }

  public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      input: e.currentTarget.value
    });
  }

  public handleSubmit = (e: any) => {
    const {
      dispatch,
    } = this.props;
    e.preventDefault();
    const query = this.state.input;
    dispatch(new GetSearchProducts({query}));
    dispatch(push(`/search/${query}`));
  }

  public render() {
    const {
      classes
    } = this.props;

    return (
      <Grid className={classes.container}>
        <form onSubmit={this.handleSubmit}>
          <Input
            placeholder="Search Product"
            className={classes.input}
            inputProps={{
              'aria-label': 'Description',
            }}
            onChange={this.handleChange}
          />
          <button>Search</button>
        </form>
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({

})

export default compose<React.ComponentClass<IHeaderComponentProps>>(
  withStyles(styles),
  connect(),
)(Header);