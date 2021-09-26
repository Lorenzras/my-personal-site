import Typewriter from 'typewriter-effect';

const delay = 500;

const roles = [
  ' Software Engineer.',
  'n RPA Developer.',
  ' Backend Developer.',
  ' Frontend Developer.',
  ' Filipino based in Japan.',
  ' Gamer.',
  'yes, I mean, I also translate Japanese documents into English. ',
];

const Typer = () => (

  <Typewriter
    options={{
      loop: true,
      deleteSpeed: 10,
    }}
    onInit={(typewriter) => {
      typewriter
        .typeString('I\'m a')

        .typeString(roles[0])
        .pauseFor(delay)
        .deleteChars(roles[0].length)

        .typeString(roles[1])
        .pauseFor(delay)
        .deleteChars(roles[1].length)
        .pauseFor(delay)

        .typeString(roles[2])
        .pauseFor(delay)
        .deleteChars(roles[2].length)
        .pauseFor(delay)

        .typeString(roles[3])
        .pauseFor(delay)
        .deleteChars(roles[3].length)
        .pauseFor(delay)

        .typeString(roles[4])
        .pauseFor(delay)
        .deleteChars(roles[4].length)
        .pauseFor(delay)

        .typeString(' Gamer')
        .pauseFor(delay)
        .deleteAll()
        .typeString(' Scroll down for more. ;)')
        .pauseFor(5000)
        .start();
    }}
  />
);

export default Typer;
