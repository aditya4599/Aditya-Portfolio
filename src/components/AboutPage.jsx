import React from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import {DarkTheme} from './Themes';


import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte'
import astronaut from '../assets/Images/spaceman.png'
import { motion } from 'motion/react'
import BackHomeLink from '../subComponents/BackHomeLink'
import { aboutParagraphs } from '../data/profile'

const Box = styled.div`
background-color: ${props => props.theme.body};
width: 100vw;
min-height:100vh;
position: relative;
overflow: hidden;
padding: 10rem 0 6rem;
box-sizing: border-box;

@media (max-width: 760px) {
    padding: 7rem 1.25rem 6rem;
}
`
const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }

`
const Spaceman = styled(motion.div)`
position: absolute;
top: 15%;
right: 15%;
width: 20vw;
img{
    width: 150%;
    height: auto;
    animation: ${float} 6s ease infinite;
}

@media (prefers-reduced-motion: reduce) {
    img { animation: none; }
}
@media (max-width: 760px) {
    width: 24vw;
    top: auto;
    bottom: 3%;
    right: 6%;
    z-index: 0;
}
`
const Main =  styled(motion.div)`
  border: 2px solid ${(props) => props.theme.text};
  color: ${(props) => props.theme.text};
  padding: 2rem;
  width: 50vw;
  min-height: 60vh;
  box-sizing: border-box;
  z-index: 3;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: calc(0.6rem + 1vw);
 backdrop-filter: blur(4px);
  
  position: relative;
  margin-left: calc(5rem + 5vw);
  font-family: 'Ubuntu Mono', monospace;
  font-style: italic;

  .copy { display: block; }
  .copy p + p { margin-top: 1.1em; }

  @media (max-width: 760px) {
    width: auto;
    min-height: 0;
    margin-left: 0;
    padding: 1.4rem;
    font-size: calc(0.75rem + 1.1vw);
  }
`

const HomeLink = styled(BackHomeLink)`
position: absolute;
left: 0;
right: 0;
bottom: 1.5rem;
z-index: 3;
display: flex;
justify-content: center;
`

// Frame draws itself open, then the paragraphs rise in one by one.
const frame = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.5, when: 'beforeChildren', staggerChildren: 0.18 },
  },
}
const para = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}




const AboutPage = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
<Box>

<LogoComponent theme='dark'/>
<SocialIcons theme='dark'/>
<PowerButton />
<ParticleComponent theme='dark' />

        <Spaceman
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
        >
            <img src={astronaut} alt="" />
        </Spaceman>    
        <Main variants={frame} initial="hidden" animate="show">
            <div className="copy">
                {aboutParagraphs.map((p) => (
                    <motion.p key={p.slice(0, 24)} variants={para}>{p}</motion.p>
                ))}
            </div>
        </Main>

        <BigTitle text="ABOUT" top="10%" left="5%" />
        <HomeLink delay={1.6} />


        </Box>

        </ThemeProvider>
        
    )
}

export default AboutPage
