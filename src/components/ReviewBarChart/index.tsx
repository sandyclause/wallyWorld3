import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Grid,
  Typography,
	withStyles,
	Chip,
  Theme,
} from '@material-ui/core';
import { compose } from 'redux';
// import ReviewBarChart from '../../components/ReviewBarChart';
// import ReviewsGroup from '../../components/ReviewsGroup';
import { WithStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';
import { IReviewWithProductInfo } from '../../interfaces/review/review';
import { Record, fromJS, Map, List } from 'immutable';
import Stars from '../Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IReviewBarChartComponentProps {
	reviewsData: Record<IReviewWithProductInfo>;
	grabNumber: (number: number) => void;
}

interface IReviewBarChartProps extends IReviewBarChartComponentProps {
}

type IReviewBarChartType = IReviewBarChartProps & WithStyles<keyof ReturnType<typeof styles>>;


class ReviewBarChart extends React.Component<IReviewBarChartType, {}> {

  public render() {
		const {
      reviewsData,
      classes,
      grabNumber,
    } = this.props;
    
    const reviews = reviewsData && reviewsData.get('reviews');
    const reviewStats = reviewsData && reviewsData.get('reviewStatistics', Map());
    const totalReviewcCount = reviewStats.get('totalReviewCount', '');

    const ratingDistributions = reviewStats && reviewStats.get('ratingDistributions', List());

    const immutableParsedReviews: any = ratingDistributions.size !== 0 
      ? ratingDistributions.reduce((acc, rating, index) => {
					const withValues = acc.setIn([rating.get('ratingValue')], rating.get('count'));
          return withValues;
        }, Map()) 
		  : null;
		
		console.log(immutableParsedReviews)
    
    const ratingBars = immutableParsedReviews && immutableParsedReviews.reverse().map((review: number, key: string) => {
      return (
        <Grid
          className={classes.ratingBars}
          container={true}
          direction='row'
          wrap='nowrap'
          key={key}
          onClick={() => grabNumber(Number(key))}
        >
          <Grid
            className={classes.starIcon}
            container={true}
            direction='row'
            wrap='nowrap'
            justify='center'
            alignItems='center'
          >
            <Typography>
              {key}
            </Typography>
            <FontAwesomeIcon
              icon='star'
            />
          </Grid>
          <Grid
            container={true}
            key={key}
            direction='row'
            wrap='nowrap'
            className={classes.barContainer}
          >
            <Grid
              item={true}
              className={classes.bar}
              style={{width: `${review / Number(totalReviewcCount) * 100}%`}}
            >
            </Grid>
          </Grid>
          <Grid
            container={true}
            justify='center'
            alignItems='center'
            className={classes.starCount}
          >
            <Typography>
              {review}
            </Typography>
          </Grid>
        </Grid>
      )
    }).valueSeq().toArray();
    
    const averageOverallRating = reviewStats.get('averageOverallRating', '');

    // api review stats of 'averageOverallRating' sometimes returns a string of null
    const averageRating = reviewsData && averageOverallRating !== 'null'
      ? <Grid
          container={true}
          direction='row'
          wrap='nowrap'
        >
          <Typography>
            Average Customer Ratings
          </Typography>
          <Typography>
            Overall
          </Typography>
          <Stars
            starNum={averageOverallRating}
          />
          <Typography>
            {averageOverallRating}
          </Typography>
        </Grid>
      : null;

    return (
      <Grid
				container={true}
				direction='row'
        wrap='wrap'
        className={classes.root}
        spacing={4}
			>
        <Grid
          container={true}
          item={true}
          lg={6}
          md={6}
          direction='column'
          wrap='nowrap'
        >
          <Typography>
            Rating Snapshot
          </Typography>
          <Typography>
            Select a row below to filter reviews.
          </Typography>
          {ratingBars}
        </Grid>
        <Grid
          item={true}
          lg={6}
          md={6}
        >
          {averageRating}
        </Grid>
      </Grid>
    )
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    padding: `${theme.spacing(3)}px 0`,
  },
  ratingBars: {
    border: '1px solid red',
    cursor: 'pointer',
  },
  barContainer: {
    minWidth: '300px',
    background: 'lightgrey',
    margin: 10
  },
  bar: {
    background: 'lightblue',
    height: theme.spacing(),
  },
  starIcon: {
    width: 40
  },
  starCount: {
    width: 40
  }
})

export default compose<React.ComponentClass<IReviewBarChartComponentProps>>(
  withStyles(styles),
)(ReviewBarChart);