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
// import ReviewsGroup from '../../components/ReviewsGroup';
import { WithStyles } from '@material-ui/styles';
import { StyleRules } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { makeSelectSelectedProductReview } from '../../selectors/default';
import { IReviewWithProductInfo } from '../../interfaces/review/review';
import { Record } from 'immutable';
import ReviewBarChart from '../../components/ReviewBarChart';

interface IProductReviewsContainerComponentProps {
}

interface IProductReviewsContainerProps extends IProductReviewsContainerComponentProps {
  selectedProductReview: Record<IReviewWithProductInfo>;
}

interface IProductReviewsContainerState {
  selectedReviewNumber: number;
}

type IProductReviewsContainerType = IProductReviewsContainerProps & WithStyles<keyof ReturnType<typeof styles>>;


class ProductReviewsContainer extends React.Component<IProductReviewsContainerType, IProductReviewsContainerState> {
	public state = {
		selectedReviewNumber: -1,
	}

	public setSelectedReviewNumber = (number: number) => {
		this.setState({
			selectedReviewNumber: number,
		})
	}

	public handleDelete = () => {
		this.setState({
			selectedReviewNumber: -1,
		})
	}

  public render() {
		const {
			selectedProductReview,
			classes,
		} = this.props;

		const {
			selectedReviewNumber
		} = this.state;

		const ReviewFilters = () => {
			return (
				selectedReviewNumber !== -1
					?	<Grid>
							<Chip
								label={selectedReviewNumber}
								onDelete={this.handleDelete}
								className={classes.chip}
								color="primary"
							/>
							<Chip
								label='Clear All'
								onDelete={this.handleDelete}
								className={classes.chip}
								color="primary"
							/>
						</Grid>
				: null
			)
		}
  
    return (
      <Grid
				container={true}
				direction='column'
				wrap='nowrap'
			>
				<Typography
					variant='h6'
				>
					Reviews
				</Typography>
				{/* review bar chart */}
				<ReviewBarChart
					reviewsData={selectedProductReview}
					grabNumber={this.setSelectedReviewNumber}
				/>

				{/* review filter chips */}
				<ReviewFilters />

				{/* review */}
				{/* <ReviewsGroup
					selectedReviewNumber={this.state.selectedReviewNumber}
				/> */}
      </Grid>
    )
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {

	},
	chip: {

	}
})

const mapStateToProps = (state: any) => {

  return {
    ...createStructuredSelector({
      selectedProductReview: makeSelectSelectedProductReview(),
  })(state)
  };
}

export default compose<React.ComponentClass<IProductReviewsContainerComponentProps>>(
  connect(mapStateToProps, null),
  withStyles(styles),
)(ProductReviewsContainer);