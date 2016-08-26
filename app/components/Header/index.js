import React from 'react';
import { Link } from 'react-router';

import { brandColors } from 'containers/App/constants';

import Triangles from 'components/Triangles';
import Wrapper from 'components/Wrapper';
import Logo from 'components/Logo';

import styles from './index.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <svg viewBox="0 0 100 2" className={styles.triangles}>
        <Triangles colors={brandColors} amount={80} />
      </svg>
      <Wrapper size="large">
        <h1 className={styles.logo}>
          <Link to="/">
            <Logo width="100%" />
          </Link>
        </h1>
      </Wrapper>
    </header>
  );
}
