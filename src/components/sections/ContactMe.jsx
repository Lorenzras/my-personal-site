import InnerContainer from '../containers/InnerContainer';
import Col from '../containers/Col';
import TitleMini from '../UI/TitleMini';
import H2 from '../headers/H2';
import Description from '../UI/Description';
import B from '../UI/B';

const ContactDetails = () => (

  <div className="grid grid-cols-3 mt-8 text-center">
    <div className="font-bold text-3xl"><a className="font-bold no-underline hover:underline" href="tel:+817014529707">(+81) 70-1452-9707</a></div>
    <div className="place-self-center"><a className="font-bold no-underline hover:underline" href="mailto:lenzras@gmail.com">lenzras@gmail.com</a></div>
    <div className="place-self-center">Japan, Toyohashi, Aichi-ken</div>
  </div>
);

const ContactMe = () => (
  <InnerContainer id="contactMe">
    <Col>
      <TitleMini>CONTACT ME</TitleMini>
      <H2>
        Are you ready to word together?
      </H2>
      <Description maxWidth="screen-md">
        I’m always interested in hearing about new projects and opportunities.
        <br />
        You can
        <B> tell me about the problems </B>
        you are trying to solve.
        I&apos;d love to listen and see if there&apos;s anything I can do to help you.
      </Description>
      <ContactDetails />
    </Col>
  </InnerContainer>
);

export default ContactMe;
