import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose, Dispatch } from 'redux';
import { Grid, withStyles, Theme, Input, Typography, CssBaseline, Divider } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { IMatch, IAction } from '../../Interfaces';
import {
  getIn,
  Record,
  List,
} from 'immutable';
import { GetSearchProduct, SelectProductAction, GetReviewsAction } from '../../actions/default';
import { makeSelectSelectedProductId, makeSelectProduct, makeSelectSelectedProductReview } from '../../selectors/default';
import { IProduct } from '../../interfaces/Product';
import {
  Carousel
} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactLoading from 'react-loading';
import Layout from '../Layout';
import { IReviewWithProductInfo } from '../../interfaces/review/review';
import Stars from '../../components/Stars';
let decode = require('decode-html');
let renderHTML = require('react-render-html')

interface IProductDetailComponentProps {
  match: IMatch;
}

interface IProductDetailProps extends IProductDetailComponentProps {
  routerProductId: number;
  dispatch: React.Dispatch<IAction>;
  selectedProductId: number;
  productData: Record<IProduct>;
  selectProduct: (routerProductId: number) => void;
  getSearchProduct: (routerProductId: number) => void;
  getReviews: (itemId: number) => void;
  selectedProductReview: Record<IReviewWithProductInfo>;
}

type IProductDetailType = IProductDetailComponentProps & IProductDetailProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductDetail extends React.Component<IProductDetailType, {}> {

  public componentDidMount() {
    const {
      routerProductId,
      dispatch,
      selectedProductId,
      selectProduct,
      getSearchProduct,
      getReviews,
    } = this.props;

    const routerProductIdAsNumber = Number(routerProductId);
    getReviews(routerProductIdAsNumber);

    if (selectedProductId !== routerProductIdAsNumber) {
      selectProduct(routerProductIdAsNumber);
      getSearchProduct(routerProductId);
    }
  }

  public render() {
    const {
      productData,
      classes,
      selectedProductId,
      selectedProductReview,
    } = this.props;

    console.log(productData)
    console.log(selectedProductReview)

    const productReviews = selectedProductReview.get('reviews', List());
    const title = productData.get('name');
    const reviewNumber = productData.get('numReviews');
    const sellerInfo = productData.get('sellerInfo');
    const price = productData.get('salePrice', '');
    const msrp = productData.get('msrp', '');
    const shortDesc = productData.get('shortDescription');
    const shortDescDecoded = shortDesc && renderHTML(decode(shortDesc));
    const customerRating = productData.get('customerRating');
    const longDesc = productData.get('longDescription');
    const longDescDecoded = longDesc && renderHTML(decode(longDesc));
    const imageEntities = productData.get('imageEntities');
    const largeImage = productData.get('largeImage');

    const msrpGroup = msrp && price
      ? <Grid
          container={true}
          direction='column'
          wrap='nowrap'
          justify='flex-start'
          alignItems='center'
          style={{border: '1px solid red'}}
        >
          <Grid
            container={true}
            direction='row'
            wrap='nowrap'
          >
            <span className={classes.priceSign}>$</span>
            <Typography
              variant='h3'
              color='primary'
            >
              {price}
            </Typography>
          </Grid>
          <Grid
            container={true}
            direction='row'
            wrap='nowrap'
          >
            <Typography>Was</Typography>
            <Typography
              variant='h5'
              className={classes.msrp}
            >
              ${msrp}
            </Typography>
          </Grid>
        </Grid>
      : 
        <Grid
          style={{border: '1px solid blue'}}
        >
          <Typography
            variant='h5'
          >
            ${msrp}{price}
          </Typography>
        </Grid>;

    const productImages = imageEntities 
    ? <Grid>
        <Carousel
          autoPlay={false}
          infiniteLoop={true}
          interval={4000}
          showStatus={false}
          showThumbs={true}
        >
          {
            imageEntities
              .reverse()
              .map((imageData, index) => {
                return <div
                  key={index}
                >
                  <img
                    src={imageData.get('largeImage')}
                    alt={`large image of ${productData.get('name')}`}
                  />
                </div>
              })
          }
        </Carousel>
      </Grid>
    : <Grid>
        <img
          src={largeImage}
          alt={`large image of ${productData.get('name')}`}
        />
      </Grid>

    return (
      <Layout>
        <Grid
          container={true}
          direction='column'
          className={classes.root}
        >
          {
            productData == null
              ? <ReactLoading type='spin' color='#007dc6' height={60} width={30} />
              : null
          }
          <CssBaseline />
          {/* picture and sideInfo containers */}
          <Grid
            container={true}
            direction='row'
            wrap='wrap'
            className={classes.pictureSideInfoContainer}
            spacing={4}
          >
            {/* picture container */}
            <Grid
              item={true}
              lg={6}
              md={6}
              sm={12}
            >
              {
                imageEntities || largeImage
                  ?
                    productImages
                  :
                    <ReactLoading type='spin' color='#007dc6' height={60} width={30} />
              }
            </Grid>

            {/* side infoContainer */}
            <Grid
              item={true}
              lg={6}
              md={6}
              sm={12}
            >
              {/* title container */}
              <Grid
                container={true}
                direction='column'
                className={classes.titleContainer}
              >
                <Typography
                  variant='h5'
                >
                  {title}
                </Typography>
                <Typography
                  variant='subtitle1'
                >
                  Sold and shipped by {sellerInfo}
                </Typography>
              </Grid>

              {/* review summary container */}
              <Grid
                container={true}
                direction='row'
                wrap='nowrap'
                alignContent='center'
                spacing={2}
                style={{width: 'auto'}}
              >
                <Grid
                  item={true}
                >
                  {
                    customerRating ? <Stars
                      starNum={customerRating}
                    /> : null
                  }
                </Grid>
                <Grid
                  item={true}
                >
                  {
                    reviewNumber
                      ? <Typography
                          variant='subtitle1'
                          color='primary'
                        >
                          {reviewNumber} Reviews
                        </Typography>
                      : null
                  }
                </Grid>
              </Grid>

              {/* price container */}
              <Grid
                container={true}
              >
                {msrpGroup}
              </Grid>
            </Grid>

          </Grid>
          
          <Divider />
          {/* description and features */}
          <Grid
            container={true}
            direction='column'
            wrap='nowrap'
          >
            <Grid
              container={true}
              className={classes.descriptionTitleContainer}
            >
              <Typography
                variant='h5'
                color='primary'
              >
                Description & Features
              </Typography>
            </Grid>

            {/* content */}
            <Grid
              container={true}
              direction='row'
              wrap='wrap'
              spacing={4}
              className={classes.contentText}
            >
              <Grid
                item={true}
                lg={6}
                md={6}
              >
                <Typography>
                  {
                    shortDescDecoded
                  }
                </Typography>
              </Grid>
              <Grid
                item={true}
                lg={6}
                md={6}
              >
                {
                  longDescDecoded
                }
              </Grid>
            </Grid>

            {/* variants */}
            {/* <Grid
              container={true}
              direction='row'
              wrap='wrap'
              justify='space-around'
            >
              {variants}
            </Grid> */}
          </Grid>
          {
            // <ProductReviewsContainer />
          }
        </Grid>
      </Layout>
    );
  }
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    padding: '0 20px',
  },
  priceSign: {
    fontSize: '1.6rem',
  },
  msrp: {
    textDecoration: 'line-through',
    paddingLeft: '5px'
  },
  titleContainer: {
    width: 'auto'
  },
  descriptionTitleContainer: {
    margin: '20px 0'
  },
  pictureSideInfoContainer: {
    margin: '50px 0'
  },
  contentText: {
    textAlign: 'left',
  }
})

const mapStateToProps = (state: any, props: IProductDetailComponentProps) => {
  const {
    match,
  } = props;

  const routerProductId = getIn(match, ['params', 'productId'], -1);

  return {
    routerProductId,
    ...createStructuredSelector({
      selectedProductId: makeSelectSelectedProductId(),
      productData: makeSelectProduct(),
      selectedProductReview: makeSelectSelectedProductReview(),
  })(state)
  };
}

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  selectProduct: (routerProductId: number) => {
    dispatch(new SelectProductAction({productId: routerProductId}))
  },
  getSearchProduct: (routerProductId: number) => {
    dispatch(new GetSearchProduct({productId: routerProductId}))
  },
  getReviews: (itemId: number) => {
    dispatch(new GetReviewsAction({itemId}))
  },
  dispatch
});

export default compose<React.ComponentClass<IProductDetailComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ProductDetail);