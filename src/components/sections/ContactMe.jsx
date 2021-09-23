import { Element } from 'react-scroll';
import InnerContainer from '../containers/InnerContainer';
import Col from '../containers/Col';
import TitleMini from '../UI/TitleMini';
import H2 from '../headers/H2';
import Description from '../UI/Description';
import B from '../UI/B';
import Reveal, { reveal3 } from '../animations/Reveal';

const ContactDetails = () => (

  <div className="grid grid-cols-1 lg:grid-cols-3 text-center z-50">
    <Reveal variants={reveal3}>
      <div className="place-self-center mt-8"><a className="text-xl font-bold no-underline hover:underline" href="tel:+817014529707">(+81) 70-1452-9707</a></div>
    </Reveal>
    <Reveal variants={reveal3}>
      <div className="place-self-center mt-8"><a className="text-2xl font-bold no-underline hover:underline" href="mailto:contact@lenzlab.com">contact@lenzlab.com</a></div>
    </Reveal>
    <Reveal variants={reveal3}>
      <div className="place-self-center mt-8">Japan, Toyohashi, Aichi-ken</div>
    </Reveal>
  </div>

);

const ContactMe = () => (

  <Element name="contactMe">
    <InnerContainer id="contactMe">
      <Col>
        <TitleMini>CONTACT ME</TitleMini>
        <H2>
          I Am Here To Help
        </H2>
        <Description maxWidth="screen-md">
          I’m always interested in hearing about new projects and opportunities.
          <br />
          You can
          <B> tell me about the problems </B>
          you are trying to solve.
          I&apos;d love to listen and see if there&apos;s anything I can do to help you.
        </Description>

      </Col>
      <ContactDetails />

    </InnerContainer>

  </Element>
);

export default ContactMe;
