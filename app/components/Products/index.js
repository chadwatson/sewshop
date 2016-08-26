import React from 'react';
import reactImmutableProptypes from 'react-immutable-proptypes';

import UiList from 'components/UiList';
import Wrapper from 'components/Wrapper';
import SquareImage from 'components/SquareImage';
import FadeIn from 'components/FadeIn';
import Link from 'components/Link';
import { path as productPath } from 'containers/ProductPage/constants';

import styles from './index.css';

const transitionDelay = 100;
const transitionSpeedInterval = 200;

const Products = ({ products }) => (
  <Wrapper size="large">
    <section className={styles.root}>
      <UiList className={styles.list}>
        {products.map((product, i) => (
          <li className={styles.item} key={i}>
            <FadeIn
              delay={`${i * transitionDelay}ms`}
              speedInterval={i * transitionSpeedInterval}
            >
              <Link to={`${productPath}/${product.get('id')}`} title={product.get('title')}>
                <article className={styles.itemBlock}>
                  <SquareImage image={product.get('images').first()} alt={product.get('title')}>
                    <div className={styles.itemMeta}>
                      {product.get('price') ? <div className={styles.itemPrice}>${product.get('price')}</div> : null}
                      <h1 className={styles.itemTitle}>{product.get('title')}</h1>
                    </div>
                  </SquareImage>
                </article>
              </Link>
            </FadeIn>
          </li>
        ))}
      </UiList>
    </section>
  </Wrapper>
);

Products.propTypes = {
  products: reactImmutableProptypes.list,
};

export default Products;
