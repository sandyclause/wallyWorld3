import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Theme, WithStyles,
} from '@material-ui/core';
import { compose } from '@material-ui/system';
import { withStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IStarsComponentProps {
  starNum: string,
}

interface IStarsProps extends IStarsComponentProps {
}

const styles = (theme: Theme) => ({
});


type StarsProps = IStarsProps & WithStyles<keyof ReturnType<typeof styles>>;

const Stars: React.FC<StarsProps> = (props: any) => {
  const {
    starNum
  } = props;
  
  let starsArray = [];

  for (let i = 0; i < starNum; i++) {
    if ((starNum - i) < 1) {
      starsArray.push(
        <FontAwesomeIcon
          key={i}
          icon='star-half-alt'
        />
      )
    } 
    else {
      starsArray.push(
        <FontAwesomeIcon
          key={i}
          icon={['fas', 'star']}
        />
      )
    }
  }

  let starsFinal = starsArray;
  
  const missingStar = 5 - starsArray.length;
  for (let i = (5 - missingStar); i < 5; i++) {
    starsFinal.push(
      <FontAwesomeIcon
        key={i + Date.now()}
        icon={['far', 'star']}
      />
    )
  }

  return (
    <Grid
      container={true}
      style={{width: 'auto'}}
      direction='row'
      wrap='nowrap'
    >
      {
        starsFinal.map((star) => {
          return star;
        })
      }
    </Grid>
  )
};

export default compose(
  withStyles(styles)
)(Stars);