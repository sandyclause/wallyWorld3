import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { Grid, withStyles, Theme, Input } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import { createStructuredSelector } from 'reselect';

interface IProductDetailComponentProps {
  match?: any;
}

interface IProductDetailProps extends IProductDetailComponentProps {
}

type IProductDetailType = IProductDetailComponentProps & IProductDetailProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductDetail extends React.Component<IProductDetailType, {}> {

  public render() {
    const {
      classes
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
  return createStructuredSelector({

  })(state);
}

export default compose<React.ComponentClass<IProductDetailComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null),
)(ProductDetail);