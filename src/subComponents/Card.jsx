import { motion } from 'motion/react';
import React from 'react'
import styled from 'styled-components';
import { Github } from '../components/AllSvgs';
import { isUsableUrl } from '../data/profile';



const Box = styled(motion.li)`
width: 18rem;
min-height: 46vh;
background-color: ${props => props.theme.text};
color:${props => props.theme.body};
padding: 1.5rem 2rem;
margin-right: 8rem;
border-radius: 0 50px 0 50px;
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 1rem;
border: 1px solid ${props => props.theme.body};
transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;

&:last-child { margin-right: 0; }

&:hover, &:focus-within{
background-color: ${props => props.theme.body};
color:${props => props.theme.text};
border: 1px solid ${props => props.theme.text};

}

@media (max-width: 760px) {
    width: min(18rem, 78vw);
    margin-right: 2.5rem;
    padding: 1.25rem 1.5rem;
}
`
const Head = styled.div`
display: flex;
justify-content: space-between;
align-items: baseline;
gap: 1rem;
font-family: 'Ubuntu Mono', monospace;
font-size: calc(0.75em + 0.25vw);
opacity: 0.75;

span:last-child { text-align: right; }
`

const Title = styled.h2`
font-size: calc(1em + 0.5vw);
line-height: 1.15;
`

const Description = styled.h2`
font-size: calc(0.8em + 0.3vw);
font-family: 'Karla',sans-serif;
font-weight: 500;
line-height: 1.4;
`
const Tags = styled.div`
border-top: 2px solid ${props =>props.theme.body};
padding-top: 0.5rem;
display:flex;
flex-wrap:wrap;
${Box}:hover &, ${Box}:focus-within &{
border-top: 2px solid ${props =>props.theme.text};
}
`
const Tag = styled.span`
margin-right:1rem;
font-size:calc(0.8em + 0.3vw);
`

const Footer = styled.footer`
display: flex;
justify-content: space-between;
align-items: center;
min-height: 2.6rem;
`

const Link = styled.a`
background-color: ${props =>props.theme.body};
color: ${props =>props.theme.text};
text-decoration: none;
padding:0.5rem calc(2rem + 2vw);
border-radius: 0 0 0 50px;
font-size:calc(1em + 0.5vw);

${Box}:hover &, ${Box}:focus-within &{
    background-color: ${props =>props.theme.text};
    color: ${props =>props.theme.body};

}
`

const Git = styled.a`
color: inherit;
text-decoration: none;
margin-left: auto;
${Box}:hover &, ${Box}:focus-within &{
    &>*{
        fill:${props =>props.theme.text};
    }
}

`

// Framer motion configuration — cards rise and settle in sequence.
const Item = {
    hidden:{
        y: 140,
        rotate: 6,
        opacity: 0,
    },
    show:{
        y: 0,
        rotate: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: 1.1,
            bounce: 0.25,
        }
    }
}

const Card = (props) => {

    const {id, name, description, status, tags, demo, github} = props.data;
    const hasDemo = isUsableUrl(demo);
    const hasGit = isUsableUrl(github);

    return (
        <Box key={id} variants={Item} whileHover={{ y: -10 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
            <Head>
                <span>{String((props.index ?? 0) + 1).padStart(2, '0')}</span>
                {status && <span>{status}</span>}
            </Head>
            <Title>{name}</Title>
            <Description>
                {description}
            </Description>
            <Tags>
            {
                    tags.map((t,id) => {
                        return <Tag key={id}>#{t}</Tag>
                    })
                }
            </Tags>
            <Footer>
                {hasDemo && (
                <Link href={demo} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${name} (opens in a new tab)`}>
                    Visit
                </Link>
                )}
                {hasGit && (
                <Git  href={github}  target="_blank" rel="noopener noreferrer" aria-label={`${name} on GitHub (opens in a new tab)`}>
                    <Github width={30} height={30} />
                </Git>
                )}
            </Footer>
        </Box>
    )
}

export default Card
