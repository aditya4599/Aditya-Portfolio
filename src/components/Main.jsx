import { motion } from 'motion/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import LogoComponent from '../subComponents/LogoComponent'
import PowerButton from '../subComponents/PowerButton'
import SocialIcons from '../subComponents/SocialIcons'
import { YinYang } from './AllSvgs'
import Intro from './Intro'
import { useMusic } from '../audio/useMusic'



const MainContainer = styled.div`
background: ${props => props.theme.body};
width: 100vw;
height: 100vh;
overflow:hidden;

position: relative;

h2,h3,h4,h5,h6{
  font-family:'Karla', sans-serif ;
  font-weight:500;
}
`

const Container = styled.div`
padding: 2rem;
`

const BLOG = styled(NavLink)`
color: ${props => props.theme.text};
position: absolute;
top: 50%;
right: calc(1rem + 2vw);
transform: rotate(90deg) translate(-50%, -50%);
text-decoration: none;
z-index:1;

@media (max-width: 760px) {
    right: 0.6rem;
    h2 { font-size: 1.05rem; }
}
`
const SAYHI = styled(NavLink)`
color: ${props => props.$click ? props.theme.body : props.theme.text};

position: absolute;
top: 50%;
left: calc(1rem + 2vw);
transform: translate(-50%, -50%) rotate(-90deg) ;
text-decoration: none;
z-index:1;
white-space: nowrap;

@media (max-width: 760px) {
    left: 1.3rem;
    h2 { font-size: 1.05rem; }
}
`

const BottomBar = styled.div`
position: absolute;
bottom: 1rem;
left: 0;
right: 0;
width: 100%;

display: flex;
justify-content: space-evenly;

@media (max-width: 760px) {
    padding-left: 2.25rem;
    padding-right: 0.5rem;
    box-sizing: border-box;
    justify-content: space-between;
    h2 { font-size: 1.05rem; }
}
`

// Bottom links sit across the black/off-white split once the intro is
// open. Off-white text with "difference" blending renders black on the
// light half and off-white on the dark half, so every label (including
// the one in the middle, which straddles the split) stays readable.
const BottomLink = styled(NavLink)`
color: ${props => props.theme.body};
mix-blend-mode: difference;
text-decoration: none;
z-index:1;
`

const rotate = keyframes`
from{
    transform: rotate(0);
}
to{
    transform: rotate(360deg);
}
`

const Center = styled.button`
position: absolute;
top: ${props => props.$click ? '85%' :'50%'  };
left: ${props => props.$click ? '92%' :'50%'  };
transform: translate(-50%,-50%);
border: none;
outline: none;
background-color: transparent;
cursor: pointer;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
transition: all 1s ease;

&>:first-child{
    animation: ${rotate} infinite 1.5s linear;
}

&>:last-child{
    display: ${props => props.$click ? 'none' :'inline-block'  };
    padding-top: 1rem;
}

@media (prefers-reduced-motion: reduce) {
    &>:first-child{ animation: none; }
}
`

const DarkDiv = styled.div`
position: absolute;
top: 0;
background-color: #000;
bottom: 0;
right: 50%;
width: ${props => props.$click ? '50%' : '0%'};
height: ${props => props.$click ? '100%' : '0%'};
z-index:1;
transition: height 0.5s ease, width 1s ease 0.5s;
`


const Main = () => {

    const [click, setClick] = useState(false);
    const { start } = useMusic();

    // The yin-yang opens/closes the intro and is the ONLY control that
    // starts the music. start() does nothing once the song has started,
    // so it never restarts or rewinds; after a failed attempt it retries.
    const handleClick = () => {
        setClick(c => !c);
        start();
    };

    return (
        <MainContainer>
         <DarkDiv   $click={click}/>
            <Container>
            <PowerButton />
            <LogoComponent theme={click ? 'dark' :'light'}/>
            <SocialIcons theme={click ? 'dark' :'light'} />

            <Center
                $click={click}
                onClick={handleClick}
                aria-expanded={click}
                aria-label={click ? 'Close introduction' : 'Open introduction'}
            >
                <YinYang width={click ? 120 : 200} height={click ? 120 : 200} fill='currentColor' />
                <span>click here</span>
            </Center>

            <BLOG to="/blog">
                <motion.h2
                initial={{
                    y:-200,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                animate={{
                    y:0,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    Blog
                </motion.h2>
            </BLOG>
            <SAYHI to="/say-hi" $click={click}>
                <motion.h2
                initial={{
                    y:-200,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                animate={{
                    y:0,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                 whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    Say Hi
                </motion.h2>
            </SAYHI>
            <BottomBar>
            <BottomLink to="/projects">
                <motion.h2
                initial={{
                    y:200,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                animate={{
                    y:0,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                 whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    Projects.
                </motion.h2>
            </BottomLink>
            <BottomLink to="/about">
                <motion.h2
                initial={{
                    y:200,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                animate={{
                    y:0,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                 whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    About.
                </motion.h2>
            </BottomLink>
            <BottomLink to="/skills">
                <motion.h2
                initial={{
                    y:200,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                animate={{
                    y:0,
                    transition: { type:'spring', duration: 1.5, delay:1}
                }}
                 whileHover={{scale: 1.1}}
                whileTap={{scale: 0.9}}
                >
                    My Skills.
                </motion.h2>
            </BottomLink>

            </BottomBar>

            </Container>
            {click ? <Intro click={click} /> : null }
        </MainContainer>
    )
}

export default Main
