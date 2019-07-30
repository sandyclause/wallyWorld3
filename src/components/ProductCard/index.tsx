import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction } from '../../actions/default';
import { Grid, Typography } from '@material-ui/core';
import { IProduct } from '../../interfaces/Product';
import { Record } from 'immutable';

interface IProductCardComponentProps {
  productData: Record<IProduct>;
}

interface IProductCardProps {
  dispatch: React.Dispatch<IAction>;
}

type IProductCardType = IProductCardComponentProps & IProductCardProps;

class ProductCard extends React.Component<IProductCardType, {}> {
  public componentDidMount() {
    const {
      dispatch,
    } = this.props;
  }

  
  public render() {
    const {
      productData,
    } = this.props;

    const mediumImage = productData.get('mediumImage') || '';
    const shortDesc = productData.get('shortDescription') || '';
    const customerRating = productData.get('customerRating') || '';
    const msrp = productData.get('msrp') || '';
    const salePrice = productData.get('salePrice') || '';

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
          <p>{msrp}</p>
        </Grid>
      </Grid>
    );
  }
}


export default compose<React.ComponentClass<IProductCardComponentProps>>(
  connect(),
)(ProductCard);