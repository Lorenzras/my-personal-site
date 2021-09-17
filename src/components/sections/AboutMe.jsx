import { StaticImage } from 'gatsby-plugin-image';
import TitleMini from '../UI/TitleMini';
import Col from '../containers/Col';
import H1 from '../headers/H1';
import TextTyped from '../UI/TextTyped';
import Description from '../UI/Description';
import InnerContainer from '../containers/InnerContainer';
import B from '../UI/B';

const AboutMe = () => (
  <InnerContainer id="aboutMe">
    <Col>
      <TitleMini>ABOUT ME</TitleMini>
      <H1>
        Hello, I&apos;m
        <TextTyped> Lorenz Ras </TextTyped>
        <br />
        I’m working as a Software Engineer.
      </H1>
      <Description maxWidth="screen-md">
        A fullstack developer that will
        <B> transform your ideas </B>
        into reality
        .
      </Description>
      <StaticImage
        className="max-w-md mx-auto mt-6"
        src="../../assets/images/slide1.png"
        alt="a developer"
      />
    </Col>
  </InnerContainer>
);

export default AboutMe;
