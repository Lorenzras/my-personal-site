import Col from '../containers/Col';
import InnerContainer from '../containers/InnerContainer';
import H2 from '../headers/H2';
import IconCard from '../UI/IconCard';
import TitleMini from '../UI/TitleMini';

const MyServices = () => (
  <InnerContainer>
    <Col>
      <TitleMini>WHAT I DO</TitleMini>
    </Col>
    <H2>Specializing In</H2>
    <div className="grid grid-cols-1 md:grid-cols-2 justify-center">

      <IconCard
        imageFile="blank.png"
        title="Website Deployment"
        description="Deploy websites to AWS Amplify, AWS EC2, Netflify and other shared hosting services"
      />

    </div>
  </InnerContainer>
);

export default MyServices;
