import React from 'react'
import styled from 'styled-components'
import {motion} from 'motion/react'
import Greeting from '../subComponents/Greeting'
import { greetings, profile } from '../data/profile'


const Box = styled(motion.div)`

position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);


width: 65vw;
height:55vh;
display: flex;


background: linear-gradient(
    to right,
    ${props => props.theme.body} 50%,
    ${props => props.theme.text} 50%) bottom,
    linear-gradient(
    to right,
    ${props => props.theme.body} 50%,
    ${props => props.theme.text} 50%) top;
    background-repeat: no-repeat;
background-size: 100% 2px;
    border-left: 2px solid ${props => props.theme.body};
    border-right: 2px solid ${props => props.theme.text};


    z-index:1;

@media (max-width: 760px) {
    width: 86vw;
    top: 46%;
}
`
const SubBox = styled.div`
width: 50%;
position: relative;
display: flex;
min-width: 0;

.pic{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%,0%);
    width: 100%;
    height: auto;
}

`

const Text = styled.div`
font-size: calc(1em + 1.5vw);
color: ${props => props.theme.body};
padding: 2rem;
cursor: pointer;
min-width: 0;

display: flex;
flex-direction: column;
justify-content: space-evenly;

h1 {
    display: block;
    font-size: calc(0.8rem + 1.9vw);
    font-weight: 700;
}

h3 { font-size: 1em; }

&>*:last-child{
    color: ${props => `rgba(${props.theme.bodyRgba},0.6)` };
    font-size: calc(0.5rem + 1.1vw);
    font-weight:300;
    line-height: 1.35;
}

.role {
    display: block;
    margin-bottom: 0.4em;
    color: ${props => `rgba(${props.theme.bodyRgba},0.85)` };
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.8em;
    letter-spacing: 0.02em;
}

/* masked line reveal */
.line { display: block; overflow: hidden; padding-bottom: 0.08em; }
.line > * { display: block; }

@media (max-width: 760px) {
    padding: 1rem 0.9rem;
    font-size: calc(0.7em + 2.2vw);
    h1 { font-size: calc(0.7rem + 2.6vw); }
    /* On narrow screens long greetings wrap; the hidden sizers keep
       the box at the tallest variant so nothing jumps. */
    h1 .stack, h1 .sizer, h1 .phrase { white-space: normal; }
    &>*:last-child { font-size: calc(0.55rem + 1.5vw); }
    .role { font-size: 0.85em; }
}
`

// Matches the mobile media query on Box (Motion sets height inline).
const introHeight = () =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches ? '62vh' : '55vh'

// Each line rises out of its mask once the frame has opened.
const rise = (delay) => ({
    initial: { y: '110%' },
    animate: { y: '0%' },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

const Intro = () => {
    return (
        <Box
        initial={{height:0}}
        animate={{height: introHeight()}}
        transition={{ type: 'spring', duration:2, delay:1 }}
        >
            <SubBox>
                <Text>
                    <span className="line">
                        <motion.h1 {...rise(1.7)}>
                            <Greeting items={greetings} startDelay={1.7} />
                        </motion.h1>
                    </span>
                    <span className="line">
                        <motion.h3 {...rise(1.85)}>I'm {profile.firstName} {profile.lastName}.</motion.h3>
                    </span>
                    <span className="line">
                        <motion.h6 {...rise(2)}>
                            <span className="role">{profile.roles.join(' | ')}</span>
                            {profile.intro}
                        </motion.h6>
                    </span>
                </Text>
            </SubBox>
            <SubBox>
                <motion.div
                initial={{opacity:0}}
        animate={{opacity: 1}}
        transition={{ duration:1, delay:2 }}
                >
                    <img className="pic" src={profile.portrait} alt={profile.portraitAlt} />
                </motion.div>
            </SubBox>
        </Box>
    )
}

export default Intro
