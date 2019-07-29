import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction } from '../../actions/default';
import { Grid } from '@material-ui/core';

interface IProductCardComponentProps {

}

interface IProductCardProps {
  dispatch: React.Dispatch<IAction>;
}

type IProductCardType = IProductCardComponentProps & IProductCardProps;

class ProductCard extends React.Component<IProductCardType, {}> {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

  }
  
  render() {
    return (
      <Grid>
        product Card
      </Grid>
    );
  }
}


export default compose<React.ComponentClass<IProductCardComponentProps>>(
  connect(),
)(ProductCard);