import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import Header from '../Header';
import Footer from '../Footer';

interface ILayoutComponentProps {
  children: any;
}

interface ILayoutProps {
}

type ILayoutType = ILayoutComponentProps & ILayoutProps;

class Layout extends React.Component<ILayoutType, {}> {
  public render() {
    return (
      <>
        <Header />
          {this.props.children}
        <Footer />
      </>
    );
  }
}


export default compose<React.ComponentClass<ILayoutComponentProps>>(
  connect(),
)(Layout);