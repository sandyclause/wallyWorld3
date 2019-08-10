import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction, SelectProductAction } from '../../actions/default';
import { Grid, Typography, withStyles, Theme, Paper, Tooltip } from '@material-ui/core';
import { IProduct } from '../../interfaces/Product';
import { Record } from 'immutable';
import { WithStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';
import { push } from 'connected-react-router';

interface IProductCardComponentProps {
  productData: Record<IProduct>;
}

interface IProductCardProps {
  dispatch: React.Dispatch<IAction>;
  handleclick: () => void;
}

export const wordLimiter = (text: string, limit: number) => {

  const limitedString = text.substring(0, limit);
  const newString = limitedString.concat('...');
  return newString;
}

type IProductCardType = IProductCardComponentProps & IProductCardProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductCard extends React.Component<IProductCardType, {}> {
  public componentDidMount() {
    const {
      dispatch,
    } = this.props;
  }

  public handleClick = () => {
    const {
      dispatch,
      productData,
    } = this.props;

    const productId = productData.get('itemId');
    dispatch( new SelectProductAction({productId}));
    dispatch(push(`/productDetail/${productId}`));
  }

  public render() {
    const {
      classes,
      productData,
    } = this.props;

    const mediumImage = productData.get('mediumImage') || '';
    const name = productData.get('name') || '';
    const limitedName = wordLimiter(name, 80);
    const nameComp = <Tooltip
        className={classes.tooltipContainer}
        classes={{
          tooltip: classes.tooltip
        }}
        title={name}
        placement='top'
      >
        <Typography>{limitedName}</Typography>
      </Tooltip>

    const customerRating = productData.get('customerRating') || '';
    const msrp = productData.get('msrp') || '';
    const salePrice = productData.get('salePrice') || '';

    const priceContainer = salePrice && msrp
      ? <Grid
          container={true}
          direction='row'
          wrap='nowrap'
          justify='center'
        >
          <Typography className={classes.salePrice}>${salePrice}</Typography>
          &nbsp;&nbsp;
          <Typography className={classes.crossedPrice}>${msrp}</Typography>
        </Grid>
      : <Grid>
      <Typography>${salePrice}</Typography>
    </Grid>

    return (
      <Paper
        onClick={this.handleClick}
      >
        <Grid
          className={classes.root}
          container={true}
          direction='column'
          wrap='nowrap'
        >
          <Grid>
            <img src={mediumImage} alt={name}/>
          </Grid>
          <Grid
            className={classes.infoContainer}
            container={true}
            direction='column'
            wrap='nowrap'
          >
            {nameComp}
            <Typography>{customerRating}</Typography>
            {priceContainer}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    border: '1px solid red',
    maxWidth: '240px',
    cursor: 'pointer',
  },
  crossedPrice: {
    textDecoration: 'line-through',
    fontSize: '1.2rem',
  },
  salePrice: {
    fontWeight: 500,
    fontSize: '1.2rem',
  },
  infoContainer: {
  },
  tooltip: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  tooltipContainer: {
  }
})

export default compose<React.ComponentClass<IProductCardComponentProps>>(
  withStyles(styles),
  connect(),
)(ProductCard);