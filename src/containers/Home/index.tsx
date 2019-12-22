import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction } from '../../actions/default';
import { Grid } from '@material-ui/core';
import TrendsGroup from '../TrendsGroup';
import Layout from '../Layout';

interface IHomePageComponentProps {

}

interface IHomePageProps extends IHomePageComponentProps {
  dispatch: React.Dispatch<IAction>;
}

type IHomePageType = IHomePageComponentProps & IHomePageProps;

class HomePage extends React.Component<IHomePageType, {}> {
  public componentDidMount() {
    const {
      dispatch,
    } = this.props;

    // dispatch(new GetTrendsAction())
  }
  
  public render() {
    return (
      <Layout>
        <Grid>
          <h1>
            WIP lol
          </h1>
          <TrendsGroup />
        </Grid>
      </Layout>
    );
  }
}


export default compose<React.ComponentClass<IHomePageComponentProps>>(
  connect(),
)(HomePage);