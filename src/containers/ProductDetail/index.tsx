import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { Grid, withStyles, Theme, Input } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { IMatch } from '../../Interfaces';
import {
  getIn,
  Record,
  List,
} from 'immutable';

interface IProductDetailComponentProps {
  match: IMatch;
}

interface IProductDetailProps extends IProductDetailComponentProps {
  productId: number;
}

type IProductDetailType = IProductDetailComponentProps & IProductDetailProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductDetail extends React.Component<IProductDetailType, {}> {

  public componentDidMount() {
    const {
      productId,
    } = this.props;

    console.log(productId)
  }

  public render() {
    const {
      classes,
    } = this.props;

    return (
      <Grid>
        product detail
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({

})

const mapStateToProps = (state: any, props: IProductDetailComponentProps) => {
  const {
    match,
  } = props;

  const productId = getIn(match, ['params', 'productId'], -1);

  return {
    productId,
    ...createStructuredSelector({

  })(state)
  };
}

export default compose<React.ComponentClass<IProductDetailComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null),
)(ProductDetail);