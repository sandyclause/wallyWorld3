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
import ReviewsGroup from '../../components/ReviewsGroup';

interface IProductReviewsContainerComponentProps {
}

interface IProductReviewsContainerProps extends IProductReviewsContainerComponentProps {
  selectedProductReview: Record<IReviewWithProductInfo>;
}

interface IProductReviewsContainerState {
  selectedReviewNumbers: Array<number>;
}

type IProductReviewsContainerType = IProductReviewsContainerProps & WithStyles<keyof ReturnType<typeof styles>>;


class ProductReviewsContainer extends React.Component<IProductReviewsContainerType, IProductReviewsContainerState> {
	public state = {
		selectedReviewNumbers: [],
	}

	public setSelectedReviewNumber = (number: number) => {
    const {
      selectedReviewNumbers
    } = this.state;

    const stateCopy: number[] = [...selectedReviewNumbers]
    stateCopy.push(number);

		this.setState({
			selectedReviewNumbers: stateCopy,
		}, () => console.log(this.state.selectedReviewNumbers))
	}

	public handleDelete = (number?: number) => {
    const {
      selectedReviewNumbers
    } = this.state;

    if (number) {
      const stateCopy: number[] = [...selectedReviewNumbers];
      const arrayIndex = stateCopy.indexOf(number)
  
      stateCopy.splice(arrayIndex, 1);
      
      return this.setState({
        selectedReviewNumbers: stateCopy,
      }, () => console.log(selectedReviewNumbers))
    }


		this.setState({
			selectedReviewNumbers: [],
		}, () => console.log(selectedReviewNumbers))
	}

  public render() {
		const {
			selectedProductReview,
			classes,
		} = this.props;

		const {
			selectedReviewNumbers
		} = this.state;

		const ReviewFilters = () => {
			return (
				selectedReviewNumbers.length !== 0
					?	<Grid>
              {
                selectedReviewNumbers.map((number: number, index) => {
                  return <Chip
                          label={number}
                          onDelete={() => this.handleDelete(number)}
                          className={classes.chip}
                          color="primary"
                          key={index}
                        />
                })
              }
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
				<ReviewsGroup
					selectedReviewNumbers={this.state.selectedReviewNumbers}
				/>
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