import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { Grid, withStyles, Theme, Input } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { IMatch, IAction } from '../../Interfaces';
import {
  getIn,
  Record,
  List,
} from 'immutable';
import { GetSearchProduct, SelectProductAction } from '../../actions/default';
import { makeSelectSelectedProductId } from '../../selectors/default';

interface IProductDetailComponentProps {
  match: IMatch;
}

interface IProductDetailProps extends IProductDetailComponentProps {
  routerProductId: number;
  dispatch: React.Dispatch<IAction>;
  selectedProductId: number;
}

type IProductDetailType = IProductDetailComponentProps & IProductDetailProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductDetail extends React.Component<IProductDetailType, {}> {

  public componentDidMount() {
    const {
      routerProductId,
      dispatch,
      selectedProductId,
    } = this.props;

    console.log(routerProductId, selectedProductId)
    if (selectedProductId !== routerProductId) {
      dispatch(new SelectProductAction({productId: routerProductId}))
      dispatch(new GetSearchProduct({productId: routerProductId}))
    }
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

  console.log(match)
  const routerProductId = getIn(match, ['params', 'productId'], -1);

  return {
    routerProductId,
    ...createStructuredSelector({
      selectedProductId: makeSelectSelectedProductId(),
  })(state)
  };
}

export default compose<React.ComponentClass<IProductDetailComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null),
)(ProductDetail);