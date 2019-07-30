import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction } from '../../actions/default';
import { Grid, withStyles } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import {
  StyleRules, Theme
} from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { makeSelectTrendProducts } from '../../selectors/default';
import { IProduct } from '../../interfaces/Product';
import { Record, List } from 'immutable';
import ProductCard from '../../components/ProductCard';

interface ITrendsGroupComponentProps {

}

interface ITrendsGroupProps {
  dispatch: React.Dispatch<IAction>;
  trendProducts: List<Record<IProduct>>;
}

type ITrendsGroupType = ITrendsGroupComponentProps & ITrendsGroupProps & WithStyles<keyof ReturnType<typeof styles>>;

class TrendsGroup extends React.Component<ITrendsGroupType, {}> {

  public componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch(new GetTrendsAction());
  }

  public render() {
    const {
      trendProducts
    } = this.props;

    console.log(trendProducts)
    
    return (
      <Grid
        container={true}
        direction='row'
        wrap='wrap'
        justify='space-between'
      >
        {
          trendProducts && trendProducts.map((product: Record<IProduct>, index: number) => {
            return  <ProductCard
                      key={index}
                      productData={product}
                    />
          }).valueSeq().toArray()
        }
      </Grid>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({

})

const mapStateToProps = (originalState: any, originalOwnProps: ITrendsGroupComponentProps) => {
  return createStructuredSelector({
    trendProducts: makeSelectTrendProducts(),
  })(originalState);
}

export default compose<React.ComponentClass<ITrendsGroupComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null),
)(TrendsGroup);