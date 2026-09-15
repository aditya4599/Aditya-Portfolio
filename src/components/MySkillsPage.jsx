import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion } from 'motion/react'
import {lightTheme} from './Themes';
import { Design, Develope} from './AllSvgs';
import { SkillCards } from '../data/SkillsData';


import LogoComponent from '../subComponents/LogoComponent';
import SocialIcons from '../subComponents/SocialIcons';
import PowerButton from '../subComponents/PowerButton';
import ParticleComponent from '../subComponents/ParticleComponent';
import BigTitle from '../subComponents/BigTitlte'
import BackHomeLink from '../subComponents/BackHomeLink'

const Box = styled.div`
box-sizing: border-box;
background-color: ${props => props.theme.body};
width: 100vw;
min-height:100vh;
position: relative;
display: flex;
justify-content: space-evenly;
align-items: center;
padding: 6rem 0 5rem;

@media (max-width: 860px) {
    flex-direction: column;
    gap: 2.5rem;
    padding: 7rem 1.25rem 6rem 3.5rem;
}
`

const Main = styled(motion.section)`
box-sizing: border-box;
border: 2px solid ${props => props.theme.text};
color: ${props => props.theme.text};
background-color: ${props => props.theme.body};
padding: 2rem;
width: 30vw;
min-height: 60vh;
z-index:3;
line-height: 1.5;
cursor: pointer;

font-family: 'Ubuntu Mono',monospace;
display: flex;
flex-direction: column;
justify-content: flex-start;
gap: 1.1rem;
transition: color 0.25s ease, background-color 0.25s ease;

&:hover{
    color: ${props => props.theme.body};
    background-color: ${props => props.theme.text};
}

@media (max-width: 1100px) { width: 40vw; }
@media (max-width: 860px) {
    width: 100%;
    min-height: auto;
    padding: 1.5rem;
}
`

const Title = styled.h2`
display: flex;
justify-content: center;
align-items: center;
font-size: calc(1em + 1vw);
text-align: center;

${Main}:hover &{
    &>*{
        fill:${props => props.theme.body};
    }
}

&>*:first-child{
margin-right: 1rem;
flex-shrink: 0;
}
`

const Description = styled(motion.div)`
color: ${props => props.theme.text};
font-size: calc(0.55em + 0.8vw);
padding: 0.5rem 0;
transition: color 0.25s ease;


${Main}:hover &{

        color:${props => props.theme.body};

}

strong{
    display: block;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
}
ul,p{
    margin-left: 2rem;
}

@media (max-width: 860px) {
    font-size: calc(0.8rem + 0.6vw);
    ul,p { margin-left: 1.2rem; }
}
`

// Sits in the Box's bottom padding, so it stays below the cards however
// tall they grow.
const HomeLink = styled(BackHomeLink)`
position: absolute;
left: 0;
right: 0;
bottom: 1.5rem;
z-index: 3;
display: flex;
justify-content: center;
`

const icons = { design: Design, develop: Develope }

// Cards rise in one after the other; their sections follow.
const card = {
    hidden: { opacity: 0, y: 60 },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.4 + i * 0.2,
            when: 'beforeChildren',
            staggerChildren: 0.12,
        },
    }),
}
const section = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const MySkillsPage = () => {
    return (
        <ThemeProvider theme={lightTheme}>
<Box>

<LogoComponent theme='light'/>
<SocialIcons theme='light'/>
<PowerButton />
<ParticleComponent theme='light' />
            {SkillCards.map((c, i) => {
                const Icon = icons[c.icon] ?? Develope
                return (
            <Main
                key={c.id}
                custom={i}
                variants={card}
                initial="hidden"
                animate="show"
                aria-labelledby={`skills-${c.id}`}
            >
<Title id={`skills-${c.id}`}>
    <Icon width={40} height={40} aria-hidden="true" /> {c.title}
</Title>
<Description variants={section}>
{c.line}
</Description>
{c.sections.map((s) => (
<Description key={s.heading} variants={section}>
<strong>{s.heading}</strong>
<p>
{s.items.join(', ')}
</p>
</Description>
))}

            </Main>
                )
            })}

            <BigTitle text="SKILLS" top="80%" right="30%" />
            <HomeLink delay={1.2} />

        </Box>

        </ThemeProvider>

    )
}

export default MySkillsPage
