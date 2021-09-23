import { StaticImage } from 'gatsby-plugin-image';
import { Element } from 'react-scroll';
import TitleMini from '../UI/TitleMini';

import H1 from '../headers/H1';
import Description from '../UI/Description';
import InnerContainer from '../containers/InnerContainer';
import B from '../UI/B';
import Col from '../containers/Col';
import Reveal, { reveal3 } from '../animations/Reveal';
import Typer from '../animations/Typer';

const AboutMe = () => (
  <Element name="aboutMe" className="-mt-24">
    <InnerContainer id="aboutMe">
      <Col>
        <TitleMini>ABOUT ME</TitleMini>
        <H1>
          Hello, I&apos;m Lorenz Ras
          <Typer />
        </H1>
        <Description maxWidth="screen-md">
          A fullstack developer that will
          <B> transform your ideas </B>
          into reality
          .
        </Description>
        <Reveal variants={reveal3}>
          <div className="flex justify-center">
            <StaticImage
              className="max-w-md mt-6 "
              src="../../assets/images/slide1.png"
              alt="a developer"
            />
          </div>
        </Reveal>
      </Col>
    </InnerContainer>
  </Element>
);

export default AboutMe;
