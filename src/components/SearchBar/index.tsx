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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <div className={classes.inputContainer}>
            <Input
              placeholder="Search Product"
              className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={this.handleChange}
            />
            <button className={classes.button}>
              <FontAwesomeIcon
                className={classes.searchIcon}
                icon='search'
              />
            </button>
          </div>
        </form>
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  input: {
    borderBottom: '1px solid',
    borderBottomColor: 'B4B4B4',
    border: '1px solid',
    borderColor: '#0072CE',
    color: '#333',
    padding: 15,
    width: '100%',
    height: '100%',
  },
  button: {
    width: '48px',
    borderColor: '#0072CE',
    backgroundColor: '#0072CE',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
    border: 'none',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  searchIcon: {
    width: 24,
    height: 24,
    color: 'white',
  }
})

export default compose<React.ComponentClass<IHeaderComponentProps>>(
  withStyles(styles),
  connect(),
)(Header);