import * as React from 'react';
import { Helmet } from 'react-helmet';
import Container from '../components/containers/Container';
import AboutMe from '../components/sections/AboutMe';
import MyServices from '../components/sections/MyServices';
import Nav from '../components/sections/Nav';

const IndexPage = () => (
  <>
    <Nav />
    <Container className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lorenz Ras - About me</title>
        <link rel="canonical" href="https://www.lenzlab.com" />
      </Helmet>

      <AboutMe />

      <MyServices />

    </Container>
  </>
);

export default IndexPage;
