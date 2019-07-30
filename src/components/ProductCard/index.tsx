import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction } from '../../actions/default';
import { Grid, Typography, withStyles, Theme } from '@material-ui/core';
import { IProduct } from '../../interfaces/Product';
import { Record } from 'immutable';
import { WithStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';

interface IProductCardComponentProps {
  productData: Record<IProduct>;
}

interface IProductCardProps {
  dispatch: React.Dispatch<IAction>;
}

type IProductCardType = IProductCardComponentProps & IProductCardProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductCard extends React.Component<IProductCardType, {}> {
  public componentDidMount() {
    const {
      dispatch,
    } = this.props;
  }

  
  public render() {
    const {
      classes,
      productData,
    } = this.props;

    const mediumImage = productData.get('mediumImage') || '';
    const shortDesc = productData.get('shortDescription') || '';
    const customerRating = productData.get('customerRating') || '';
    const msrp = productData.get('msrp') || '';
    const salePrice = productData.get('salePrice') || '';

    const priceContainer = salePrice
      ? <><Typography>{salePrice}</Typography><Typography className={classes.crossedPrice}>{msrp}</   Typography></>
      : <><Typography>{msrp}</Typography></>;

    return (
      <Grid
        container={true}
        direction='column'
        wrap='nowrap'
      >
        <Grid>
          <img src={mediumImage} alt={shortDesc}/>
        </Grid>
        <Grid>
          <Typography>{shortDesc}</Typography>
          <Typography>{customerRating}</Typography>
          {priceContainer}
        </Grid>
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  crossedPrice: {
    textDecoration: 'line-through'
  }
})

export default compose<React.ComponentClass<IProductCardComponentProps>>(
  withStyles(styles),
  connect(),
)(ProductCard);