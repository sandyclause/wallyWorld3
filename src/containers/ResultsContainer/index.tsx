import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { Grid, withStyles, Theme } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import walmartLogo from '../../images/walmartLogo.svg';
import { push } from 'connected-react-router';
import SearchBar from '../../components/SearchBar';
import ProductCard from '../../components/ProductCard';
import { createStructuredSelector } from 'reselect';
import { makeSelectSearchResults } from '../../selectors/default';
import { Record, List } from 'immutable';
import { IProduct } from '../../interfaces/Product';
import Layout from '../Layout';

interface IResultsContainerComponentProps {

}

interface IResultsContainerProps extends IResultsContainerComponentProps {
  dispatch: React.Dispatch<IAction>;
  searchData: List<Record<IProduct>>;
}

type IResultsContainerType = IResultsContainerComponentProps & IResultsContainerProps & WithStyles<keyof ReturnType<typeof styles>>;

class ResultsContainer extends React.Component<IResultsContainerType, {}> {

  public render() {
    const {
      searchData,
    } = this.props;

    return (
      <Layout>
        <Grid
          container={true}
          direction='row'
          wrap='wrap'
          justify='space-between'
        >
          <p>results container</p>
          {
            searchData && searchData.map((product: Record<IProduct>, index: number) => {
              return <ProductCard productData={product} key={index} />
            }).valueSeq().toArray()
          }
        </Grid>
      </Layout>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  logo: {
    cursor: 'pointer'
  },

})

const mapStateToProps = (originalState: any, originalOwnProps: IResultsContainerComponentProps) => {
  return createStructuredSelector({
    searchData: makeSelectSearchResults(),
  })(originalState);
}

export default compose<React.ComponentClass<IResultsContainerComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null),
)(ResultsContainer);