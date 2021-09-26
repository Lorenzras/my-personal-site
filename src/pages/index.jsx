import * as React from 'react';
import { Helmet } from 'react-helmet';

import Container from '../components/containers/Container';
import AboutMe from '../components/sections/AboutMe';
import ContactMe from '../components/sections/ContactMe';
import Footer from '../components/sections/Footer';
import MyServices from '../components/sections/MyServices';
import Nav from '../components/sections/Nav';
import Projects from '../components/sections/Projects';

const IndexPage = () => (
  <div className="bg-gradient-to-t from-yellow-100 to-white">
    <Nav />
    <Container className="application">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lorenz Ras - About me</title>
        <link rel="canonical" href="https://www.lenzlab.com" />
      </Helmet>
      <AboutMe />
      <MyServices />
      <Projects />
      <ContactMe />

    </Container>
    <Footer />
  </div>
);

export default IndexPage;
