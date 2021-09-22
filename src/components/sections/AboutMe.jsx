import { StaticImage } from 'gatsby-plugin-image';
import { Element } from 'react-scroll';
import TitleMini from '../UI/TitleMini';

import H1 from '../headers/H1';
import TextTyped from '../UI/TextTyped';
import Description from '../UI/Description';
import InnerContainer from '../containers/InnerContainer';
import B from '../UI/B';
import Col from '../containers/Col';
import Reveal, { reveal3 } from '../animations/Reveal';

const AboutMe = () => (
  <Element name="aboutMe" className="-mt-24">
    <InnerContainer id="aboutMe">
      <Col>
        <TitleMini>ABOUT ME</TitleMini>
        <H1>
          Hello, I&apos;m
          <TextTyped> Lorenz Ras </TextTyped>
          <br />
          I’m a Software Engineer.
        </H1>
        <Description maxWidth="screen-md">
          A fullstack developer that will
          <B> transform your ideas </B>
          into reality
          .
        </Description>
        <Reveal variants={reveal3}>
          <StaticImage
            className="max-w-md mx-auto mt-6"
            src="../../assets/images/slide1.png"
            alt="a developer"
          />
        </Reveal>
      </Col>
    </InnerContainer>
  </Element>
);

export default AboutMe;
