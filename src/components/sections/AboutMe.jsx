import { StaticImage } from 'gatsby-plugin-image';
import TitleMini from '../UI/TitleMini';
import Col from '../containers/Col';
import H1 from '../headers/H1';
import TextTyped from '../UI/TextTyped';
import Description from '../UI/Description';

const AboutMe = () => (
  <div className="pt-6">
    <Col>
      <TitleMini>ABOUT ME</TitleMini>
      <H1>
        Hello, I&apos;m
        <TextTyped> Lorenz Ras </TextTyped>
        <br />
        I’m working as a Programmer.
      </H1>
      <Description maxWidth="screen-md">
        I am a developer that will transform your ideas into reality.
        <br />
        Proficient in
        <strong> backend </strong>
        frameworks such as Code Igniter and Laravel.
        <br />
        Familiar with modern
        <strong> frontend </strong>
        frameworks suchs React, Vue, Blade, and Angular.
      </Description>
      <StaticImage
        className="max-w-md mx-auto mt-6"
        src="../../assets/images/slide1.png"
        alt="a developer"
      />
    </Col>
  </div>
);

export default AboutMe;
