import TitleMini from '../UI/TitleMini';
import Col from '../containers/Col';
import H1 from '../headers/H1';
import TextTyped from '../UI/TextTyped';

const AboutMe = () => (
  <div className="pt-6">
    <Col>
      <TitleMini>ABOUT ME</TitleMini>
      <H1>
        Hello, I&apos;m
        <TextTyped> Lorenz Ras </TextTyped>
        <br />
        I’m working as a Programmer
      </H1>
    </Col>
  </div>
);

export default AboutMe;
