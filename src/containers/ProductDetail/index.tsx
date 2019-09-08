import * as React from 'react';
import {
  connect,
} from 'react-redux';
import { compose } from 'redux';
import { Grid, withStyles, Theme, Input, Typography, CssBaseline, Divider } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/styles';
import { createStructuredSelector } from 'reselect';
import { IMatch, IAction } from '../../Interfaces';
import {
  getIn,
  Record,
  List,
} from 'immutable';
import { GetSearchProduct, SelectProductAction } from '../../actions/default';
import { makeSelectSelectedProductId, makeSelectProduct } from '../../selectors/default';
import { IProduct } from '../../interfaces/Product';
import {
  Carousel
} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReactLoading from 'react-loading';
import Layout from '../Layout';

interface IProductDetailComponentProps {
  match: IMatch;
}

interface IProductDetailProps extends IProductDetailComponentProps {
  routerProductId: number;
  dispatch: React.Dispatch<IAction>;
  selectedProductId: number;
  productData: Record<IProduct>;
}

type IProductDetailType = IProductDetailComponentProps & IProductDetailProps & WithStyles<keyof ReturnType<typeof styles>>;

class ProductDetail extends React.Component<IProductDetailType, {}> {

  public componentDidMount() {
    const {
      routerProductId,
      dispatch,
      selectedProductId,
    } = this.props;

    console.log(selectedProductId, routerProductId)
    if (selectedProductId !== Number(routerProductId)) {
      console.log('not equal')
      dispatch(new SelectProductAction({productId: Number(routerProductId)}))
      dispatch(new GetSearchProduct({productId: routerProductId}))
    }
  }

  public render() {
    const {
      productData,
      classes,
      selectedProductId,
    } = this.props;

    console.log(productData)
    console.log(selectedProductId)

    const title = productData.get('name');
    const numRating = productData.get('numReviews');
    const sellerInfo = productData.get('sellerInfo');
    const price = productData.get('salePrice', '');
    const msrp = productData.get('msrp', '');
    const shortDesc = productData.get('shortDescription');
    const customerRating = productData.get('customerRating');
    const longDesc = productData.get('longDescription');
    const longDescDecoded = productData.get('longDescription');
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
                {/* <Grid
                  item={true}
                >
                  {
                    customerRating ? <Stars
                      starNum={customerRating}
                    /> : null
                  }
                </Grid> */}
                <Grid
                  item={true}
                >
                  <Typography
                    variant='subtitle1'
                    color='primary'
                  >
                    {numRating} Reviews
                  </Typography>
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
            >
              <Grid
                item={true}
                lg={6}
                md={6}
              >
                <Typography>
                  {
                    shortDesc
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
  })(state)
  };
}

export default compose<React.ComponentClass<IProductDetailComponentProps>>(
  withStyles(styles),
  connect(mapStateToProps, null),
)(ProductDetail);