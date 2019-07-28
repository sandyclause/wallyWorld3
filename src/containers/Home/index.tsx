import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { IAction } from '../../Interfaces';
import { GetTrendsAction } from '../../actions/default';

interface IHomePageComponentProps {

}

interface IHomePageProps {
  dispatch: React.Dispatch<IAction>;
}

type IHomePageType = IHomePageComponentProps & IHomePageProps;

class HomePage extends React.Component<IHomePageType, {}> {
  componentDidMount() {
    const {
      dispatch,
    } = this.props;

    dispatch(new GetTrendsAction())
  }
  
  render() {
    return (
      <div>
        <h1>
          test
        </h1>
      </div>
    );
  }
}


export default compose<React.ComponentClass<IHomePageComponentProps>>(
  connect(),
)(HomePage);