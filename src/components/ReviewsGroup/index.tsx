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
import classes from '*.module.css';

interface IReviewsGroupComponentProps {
  selectedReviewNumbers: Array<number>
}

interface IReviewsGroupProps extends IReviewsGroupComponentProps {
  selectedProductReview: Record<IReviewWithProductInfo>;
}

type IReviewsGroupType = IReviewsGroupProps & WithStyles<keyof ReturnType<typeof styles>>;

class ReviewsGroup extends React.Component<IReviewsGroupType, {}> {

  public render() {
    
		const {
			selectedProductReview,
			selectedReviewNumbers,
			classes,
		} = this.props;

    const reviews = selectedProductReview.get('reviews', List());
		const filteredReviews = selectedReviewNumbers.length === 0
			? reviews
			: reviews.filter((review) => {
				// yo why is number a string...
				const rating = review.getIn(['overallRating', 'rating']);
				return selectedReviewNumbers.includes(Number(rating))
			});

		const reviewsNum = filteredReviews.size;
		const reviewsGroup = filteredReviews.map((review, index) => {
			const title = review.get('title', '');
			const reviewer = review.get('reviewer', '');
			const rating = review.getIn(['overallRating', 'rating']);
			const reviewText = review.get('reviewText');
			const reviewDate = review.get('submissionTime');
			const d = new Date();
			const currentYear = d.getFullYear();
			const yearsAgo = currentYear - new Date(reviewDate).getFullYear();

			const whenReviewed = yearsAgo !== 0 
				? <Typography
						variant='body2'
					>
						{yearsAgo !== 1 ? `${yearsAgo} years ago` : `${yearsAgo} year ago`}
					</Typography>
				: null

			return (
				<Grid
					key={index}
					container={true}
					direction='column'
					wrap='nowrap'
				>
					<Grid
						container={true}
						direction='row'
						justify='flex-start'
						wrap='nowrap'
						className={classes.reviewRow}
					>
						<Grid
							className={classes.avatar}
						>
							<FontAwesomeIcon
								icon='user'
								size='3x'
								color='#c1c1c1'
							/>
						</Grid>

						<Grid
							container={true}
							direction='column'
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
									<Typography
										variant='body2'
										className={classes.reviewer}
									>
										{reviewer}
									</Typography>
									{whenReviewed}
								</Grid>
								<Typography
									align='left'
									variant='subtitle1'
								>
									{title}
								</Typography>
							</Grid>
							<Grid
								item={true}
							>
								<Typography
									variant='body2'
									align='left'
								>
									{reviewText}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Divider />
				</Grid>
			)
		});
  
    return (
      <React.Fragment>
        <Typography
					align='left'
				>
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
	reviewer: {
		margin: `0 ${theme.spacing(2)}px`,
		color: '#0075e8'
	},
	avatar: {
		margin: theme.spacing(2)
	},
	reviewRow: {
		margin: `${theme.spacing(4)}px 0`,
	}
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