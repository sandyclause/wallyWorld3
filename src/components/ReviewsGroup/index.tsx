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
  Divider,
} from '@material-ui/core';
import { compose } from 'redux';
import { WithStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';
import { IReviewWithProductInfo } from '../../interfaces/review/review';
import { Record, fromJS, Map, List } from 'immutable';
import Stars from '../Stars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { makeSelectReviews, makeSelectSelectedProductReview } from '../../selectors/default';
import { createStructuredSelector } from 'reselect';

interface IReviewsGroupComponentProps {
  selectedReviewNumber: number
}

interface IReviewsGroupProps extends IReviewsGroupComponentProps {
  selectedProductReview: Record<IReviewWithProductInfo>;
}

type IReviewsGroupType = IReviewsGroupProps & WithStyles<keyof ReturnType<typeof styles>>;


class ReviewsGroup extends React.Component<IReviewsGroupType, {}> {

  public render() {
    
		const {
			selectedProductReview,
			selectedReviewNumber,
		} = this.props;

    const reviews = selectedProductReview.get('reviews', List());
		const filteredReviews = selectedReviewNumber === -1
			? reviews
			: reviews.filter((review) => {
        // yo why is number a string...
				return review.getIn(['overallRating', 'rating']) === String(selectedReviewNumber);
      });

		const reviewsNum = filteredReviews.size;
		const reviewsGroup = filteredReviews.map((review, index) => {
			const title = review.get('title', '');
			const reviewer = review.get('reviewer', '');
			const rating = review.getIn(['overallRating', 'rating']);
			const reviewText = review.get('reviewText');
			return (
				<Grid
					key={index}
					container={true}
					direction='column'
					wrap='nowrap'
				>
					<Grid
						container={true}
						direction='column'
						wrap='nowrap'
					>
						<Grid
							container={true}
							direction='row'
							wrap='nowrap'
						>
							<Stars
								starNum={rating}
							/>
							{reviewer}
						</Grid>
						<Typography>
							{title}
						</Typography>
					</Grid>
					<Grid
						item={true}
					>
						{reviewText}
					</Grid>
					<Divider />
				</Grid>
			)
		});
  
    return (
      <React.Fragment>
        <Typography>
          {reviewsNum} reviews
        </Typography>
        {
          reviewsGroup
        }
      </React.Fragment>
    )
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
  },
})

const mapStateToProps = (state: any) => {
  return {
    ...createStructuredSelector({
      selectedProductReview: makeSelectSelectedProductReview()
    })(state)
  }
}

export default compose<React.ComponentClass<IReviewsGroupComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null)
)(ReviewsGroup);