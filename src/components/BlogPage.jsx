import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import img from "../assets/Images/patrick-tomasso-Oaqk7qqNh_c-unsplash.jpg"
import LogoComponent from '../subComponents/LogoComponent'
import SocialIcons  from '../subComponents/SocialIcons'
import PowerButton  from '../subComponents/PowerButton'

import {Blogs} from '../data/BlogData';
import BlogComponent from './BlogComponent'
import AnchorComponent from '../subComponents/Anchor'
import BigTitle from "../subComponents/BigTitlte"
import BackHomeLink from "../subComponents/BackHomeLink"
import { motion } from 'motion/react'


const MainContainer = styled(motion.div)`
background-image: url(${img});
background-size: cover;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: center;
`
const Container = styled.div`
background-color: ${props => `rgba(${props.theme.bodyRgba},0.8)`};
width: 100%;
min-height: 100vh;

position: relative;
padding-bottom: 5rem;
`

const Center = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding-top: 10rem;
`

const Empty = styled(motion.div)`
width: calc(10rem + 15vw);
min-height: 14rem;
padding: 1.5rem;
color: ${props => props.theme.text};
border: 2px solid ${props => props.theme.text};
backdrop-filter: blur(2px);
box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 1rem;
z-index: 5;

h2 { font-family: 'Karla', sans-serif; font-weight: 700; font-size: calc(1rem + 1vw); }
p { font-family: 'Ubuntu Mono', monospace; }

@media (max-width: 760px) { width: 80vw; }
`

const HomeLink = styled(BackHomeLink)`
display: flex;
justify-content: center;
margin-top: 2.5rem;
position: relative;
z-index: 5;
`

const Grid = styled.div`
display: grid;
grid-template-columns: repeat(2, minmax(calc(10rem + 15vw), 1fr));

@media (max-width: 760px) { grid-template-columns: 1fr; }
grid-gap: calc(1rem + 2vw);
`

// Framer-motion config
const container = {

    hidden: {opacity:0},
    show: {
      opacity:1,
  
      transition:{
        staggerChildren: 0.5,
        duration: 0.5,
      }
    }
  
  }

const BlogPage = () => {

    const [numbers, setNumbers] = useState(0);

    useEffect(() => {
        let num = (window.innerHeight - 70)/30;
        setNumbers(parseInt(num));
    }, [])


    return (
        <MainContainer
        variants={container}
        initial='hidden'
        animate='show'
        exit={{
            opacity:0, transition:{duration: 0.5}
        }}
        >
            <Container>
                <LogoComponent />
                <PowerButton />
                <SocialIcons />
                <AnchorComponent number={numbers}/>
<Center>
{Blogs.length > 0 ? (
<Grid>

{
    Blogs.map(blog => {
        return <BlogComponent key={blog.id} blog={blog} />
    })
}
</Grid>
) : (
<Empty
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
>
    <h2>Notes coming soon.</h2>
    <p>Write-ups on what I'm building and learning will appear here.</p>
</Empty>
)}

</Center>
<HomeLink delay={1} />
<BigTitle text="BLOG" top="5rem" left="5rem" />
            </Container>
        </MainContainer>
    )
}

export default BlogPage
