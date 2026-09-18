import React, { useId, useRef, useState } from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { AnimatePresence, motion } from 'motion/react'
import { lightTheme } from './Themes'
import { Github, Instagram, LinkedIn, YinYang } from './AllSvgs'
import { profile } from '../data/profile'

import LogoComponent from '../subComponents/LogoComponent'
import SocialIcons from '../subComponents/SocialIcons'
import PowerButton from '../subComponents/PowerButton'
import ParticleComponent from '../subComponents/ParticleComponent'
import BigTitle from '../subComponents/BigTitlte'
import BackHomeLink from '../subComponents/BackHomeLink'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MESSAGE_MIN = 10
const MESSAGE_MAX = 2000
const EASE = [0.16, 1, 0.3, 1]

const MailGlyph = (props) => (
    <svg aria-hidden="true" viewBox="0 0 24 24" {...props}>
        <path
            fill={props.fill}
            d="M3 4.5h18A1.5 1.5 0 0 1 22.5 6v12a1.5 1.5 0 0 1-1.5 1.5H3A1.5 1.5 0 0 1 1.5 18V6A1.5 1.5 0 0 1 3 4.5Zm.5 2.6V17.5h17V7.1l-8.5 6.1-8.5-6.1Zm1.9-.6L12 11.2l6.6-4.7H5.4Z"
        />
    </svg>
)

const handleFromUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const contactLinks = [
    { key: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: MailGlyph, external: false },
    { key: 'linkedin', label: 'LinkedIn', value: handleFromUrl(profile.linkedin), href: profile.linkedin, Icon: LinkedIn, external: true },
    { key: 'github', label: 'GitHub', value: handleFromUrl(profile.github), href: profile.github, Icon: Github, external: true },
    { key: 'instagram', label: 'Instagram', value: handleFromUrl(profile.instagram), href: profile.instagram, Icon: Instagram, external: true },
].filter((l) => Boolean(l.value))

function validate({ email, message }) {
    const errors = {}
    const e = email.trim()
    const m = message.trim()
    if (!e) errors.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(e) || e.length > 254) errors.email = 'That email address doesn’t look right.'
    if (!m) errors.message = 'Please write a short message.'
    else if (m.length < MESSAGE_MIN) errors.message = `A little more, please — at least ${MESSAGE_MIN} characters.`
    else if (m.length > MESSAGE_MAX) errors.message = `Please keep it under ${MESSAGE_MAX} characters.`
    return errors
}

const SayHiPage = () => {
    const ids = useId()
    const mountedAt = useRef(Date.now())
    const [values, setValues] = useState({ email: '', message: '', website: '' })
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState('idle') // idle | sending | success | error
    const [serverError, setServerError] = useState('')
    const emailRef = useRef(null)
    const messageRef = useRef(null)

    const onChange = (e) => {
        const { name, value } = e.target
        setValues((v) => ({ ...v, [name]: value }))
        if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (status === 'sending') return

        const found = validate(values)
        setErrors(found)
        if (found.email) return emailRef.current?.focus()
        if (found.message) return messageRef.current?.focus()

        setStatus('sending')
        setServerError('')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: values.email.trim(),
                    message: values.message.trim(),
                    website: values.website, // honeypot — real visitors leave it empty
                    elapsed: Date.now() - mountedAt.current,
                }),
            })
            const data = await res.json().catch(() => ({}))
            // Success is shown only when the server confirms the email
            // provider accepted the message.
            if (res.ok && data.ok) {
                setStatus('success')
                return
            }
            if (data.fieldErrors) setErrors(data.fieldErrors)
            setServerError(data.error || 'Something went wrong while sending.')
            setStatus('error')
        } catch {
            setServerError('Couldn’t reach the server. Check your connection and try again.')
            setStatus('error')
        }
    }

    const reset = () => {
        setValues({ email: '', message: '', website: '' })
        setErrors({})
        setStatus('idle')
        setServerError('')
        mountedAt.current = Date.now()
    }

    const sending = status === 'sending'
    const count = values.message.trim().length

    return (
        <ThemeProvider theme={lightTheme}>
            <Box>
                <LogoComponent theme="light" />
                <SocialIcons theme="light" />
                <PowerButton />
                <ParticleComponent theme="light" />

                <Panel
                    aria-labelledby={`${ids}-title`}
                    initial={{ clipPath: 'inset(0 0 100% 0 round 0 70px 0 70px)' }}
                    animate={{ clipPath: 'inset(0 0 0% 0 round 0 70px 0 70px)' }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
                >
                    <Spinner
                        aria-hidden="true"
                        animate={{ rotate: count * 3 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                    >
                        <YinYang width={44} height={44} fill="currentColor" />
                    </Spinner>

                    <Heading id={`${ids}-title`}>
                        {["Let's create", 'great things together'].map((line, i) => (
                            <span className="mask" key={line}>
                                <motion.span
                                    initial={{ y: '110%' }}
                                    animate={{ y: '0%' }}
                                    transition={{ duration: 1, ease: EASE, delay: 0.85 + i * 0.12 }}
                                >
                                    {line}
                                    {i === 0 ? ' ' : null}
                                </motion.span>
                            </span>
                        ))}
                    </Heading>

                    <Sub
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: EASE, delay: 1.15 }}
                    >
                        Have an idea, an opportunity, or just want to say hello? Drop me a message.
                    </Sub>

                    <Grid
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
                    >
                        <FormArea>
                            <AnimatePresence mode="wait" initial={false}>
                                {status === 'success' ? (
                                    <Success
                                        key="success"
                                        role="status"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                    >
                                        <h3>Message sent.</h3>
                                        <p>Thanks for reaching out — I’ll reply to {values.email.trim()} soon.</p>
                                        <button type="button" onClick={reset}>Send another message</button>
                                    </Success>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={onSubmit}
                                        noValidate
                                        aria-busy={sending}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5, ease: EASE }}
                                    >
                                        <Field $invalid={!!errors.email}>
                                            <label htmlFor={`${ids}-email`}>Your email</label>
                                            <input
                                                ref={emailRef}
                                                id={`${ids}-email`}
                                                name="email"
                                                type="email"
                                                inputMode="email"
                                                autoComplete="email"
                                                placeholder="you@example.com"
                                                maxLength={254}
                                                value={values.email}
                                                onChange={onChange}
                                                disabled={sending}
                                                aria-invalid={!!errors.email}
                                                aria-describedby={errors.email ? `${ids}-email-err` : undefined}
                                            />
                                            <span className="rule" aria-hidden="true" />
                                            {errors.email && <span className="err" id={`${ids}-email-err`}>{errors.email}</span>}
                                        </Field>

                                        <Field $invalid={!!errors.message}>
                                            <label htmlFor={`${ids}-message`}>Message</label>
                                            <textarea
                                                ref={messageRef}
                                                id={`${ids}-message`}
                                                name="message"
                                                rows={5}
                                                placeholder="Tell me about your idea…"
                                                maxLength={MESSAGE_MAX}
                                                value={values.message}
                                                onChange={onChange}
                                                disabled={sending}
                                                aria-invalid={!!errors.message}
                                                aria-describedby={`${ids}-count${errors.message ? ` ${ids}-message-err` : ''}`}
                                            />
                                            <span className="rule" aria-hidden="true" />
                                            <span className="meta">
                                                {errors.message
                                                    ? <span className="err" id={`${ids}-message-err`}>{errors.message}</span>
                                                    : <span />}
                                                <span id={`${ids}-count`} className="count">{count}/{MESSAGE_MAX}</span>
                                            </span>
                                        </Field>

                                        {/* Honeypot: hidden from people, irresistible to bots. */}
                                        <Honeypot aria-hidden="true">
                                            <label htmlFor={`${ids}-website`}>Website</label>
                                            <input
                                                id={`${ids}-website`}
                                                name="website"
                                                type="text"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                value={values.website}
                                                onChange={onChange}
                                            />
                                        </Honeypot>

                                        <Actions>
                                            <Send type="submit" disabled={sending} whileTap={{ scale: 0.96 }}>
                                                <span>{sending ? 'Sending…' : 'Send message'}</span>
                                                <span className="circle" aria-hidden="true">
                                                    {sending
                                                        ? <YinYang className="spin" width={20} height={20} fill="currentColor" />
                                                        : <svg viewBox="0 0 24 24" width="20" height="20"><path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                                                </span>
                                            </Send>
                                            <p className="live" role="alert" aria-live="assertive">
                                                {status === 'error' && (
                                                    <>
                                                        {serverError}{' '}
                                                        You can also email me directly at{' '}
                                                        <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                                                    </>
                                                )}
                                            </p>
                                        </Actions>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </FormArea>

                        <Links aria-labelledby={`${ids}-links`}>
                            <h3 id={`${ids}-links`}>Or find me here</h3>
                            <ul>
                                {contactLinks.map(({ key, label, value, href, Icon, external }) => (
                                    <li key={key}>
                                        <a
                                            href={href}
                                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            aria-label={external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
                                        >
                                            <Icon width={20} height={20} fill="currentColor" />
                                            <span className="label">{label}</span>
                                            <span className="value">{value}</span>
                                            <span className="arrow" aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <BackHomeLink className="home" />
                        </Links>
                    </Grid>
                </Panel>

                <BigTitle text="SAY HI" top="78%" left="4%" />
            </Box>
        </ThemeProvider>
    )
}

const spin = keyframes`
from { transform: rotate(0); }
to { transform: rotate(360deg); }
`

const Box = styled.div`
box-sizing: border-box;
background-color: ${props => props.theme.body};
min-height: 100vh;
width: 100%;
position: relative;
overflow-x: hidden;
display: flex;
align-items: center;
justify-content: center;
padding: 7rem calc(2rem + 3vw) 5rem calc(4rem + 2vw);

@media (max-width: 760px) {
    padding: 6.5rem 1rem 4rem 3.25rem;
    align-items: flex-start;
}
`

const Panel = styled(motion.section)`
position: relative;
z-index: 3;
box-sizing: border-box;
width: min(1060px, 100%);
padding: clamp(1.5rem, 4vw, 3.5rem);
background-color: ${props => props.theme.body};
color: ${props => props.theme.text};
border: 2px solid ${props => props.theme.text};
border-radius: 0 70px 0 70px;

@media (max-width: 760px) {
    border-radius: 0 40px 0 40px;
}
`

const Spinner = styled(motion.span)`
position: absolute;
top: clamp(1.25rem, 3vw, 2.5rem);
right: clamp(1.25rem, 3vw, 2.5rem);
display: block;
color: ${props => props.theme.text};

@media (max-width: 760px) {
    svg { width: 30px; height: 30px; }
}
`

const Heading = styled.h1`
font-family: 'Karla', sans-serif;
font-weight: 600;
font-size: clamp(2.1rem, 5.2vw, 4.6rem);
line-height: 1.02;
letter-spacing: -0.02em;
margin: 0 3.5rem 0 0;
display: block;

.mask { display: block; overflow: hidden; padding-bottom: 0.08em; }
.mask > span { display: block; }
`

const Sub = styled(motion.p)`
margin-top: 1.1rem;
max-width: 46ch;
font-family: 'Karla', sans-serif;
font-size: clamp(1rem, 1.3vw, 1.2rem);
line-height: 1.5;
color: ${props => `rgba(${props.theme.textRgba},0.7)`};
`

const Grid = styled(motion.div)`
display: grid;
grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
gap: clamp(1.5rem, 4vw, 3.5rem);
margin-top: clamp(1.75rem, 4vw, 3rem);
padding-top: clamp(1.5rem, 3vw, 2.5rem);
border-top: 1px solid ${props => `rgba(${props.theme.textRgba},0.2)`};

@media (max-width: 860px) {
    grid-template-columns: 1fr;
}
`

const FormArea = styled.div`
min-width: 0;
form { display: grid; gap: 1.6rem; }
`

const Field = styled.div`
position: relative;
display: grid;
gap: 0.35rem;

label {
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => `rgba(${props.theme.textRgba},0.65)`};
}

input, textarea {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    border-bottom: 1px solid ${props => props.$invalid ? props.theme.text : `rgba(${props.theme.textRgba},0.35)`};
    border-bottom-style: ${props => props.$invalid ? 'dashed' : 'solid'};
    background: transparent;
    color: ${props => props.theme.text};
    font-family: 'Karla', sans-serif;
    font-size: 1.1rem;
    padding: 0.55rem 0;
    border-radius: 0;
    outline: none;
    resize: vertical;
}
textarea { min-height: 7.5rem; line-height: 1.5; }
input::placeholder, textarea::placeholder { color: ${props => `rgba(${props.theme.textRgba},0.35)`}; }
input:disabled, textarea:disabled { opacity: 0.6; }

/* focus line draws in from the left */
.rule {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: ${props => props.theme.text};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    pointer-events: none;
}
input + .rule { top: calc(100% - 2px); }
textarea + .rule { top: auto; margin-top: -0.35rem; position: relative; }
input:focus + .rule, textarea:focus + .rule { transform: scaleX(1); }

.meta { display: flex; justify-content: space-between; gap: 1rem; }
.count {
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.75rem;
    color: ${props => `rgba(${props.theme.textRgba},0.5)`};
    white-space: nowrap;
}
.err {
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.85rem;
    color: ${props => props.theme.text};
}
.err::before { content: '✕ '; }
`

const Honeypot = styled.div`
position: absolute !important;
left: -10000px;
width: 1px;
height: 1px;
overflow: hidden;
`

const Actions = styled.div`
display: grid;
gap: 0.9rem;

.live {
    min-height: 1.2em;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
}
.live a { color: inherit; }
`

const Send = styled(motion.button)`
justify-self: start;
display: inline-flex;
align-items: center;
gap: 0.9rem;
padding: 0.45rem 0.45rem 0.45rem 1.4rem;
min-height: 3.25rem;
border: 2px solid ${props => props.theme.text};
border-radius: 999px;
background: ${props => props.theme.text};
color: ${props => props.theme.body};
font-family: 'Karla', sans-serif;
font-size: 1.05rem;
font-weight: 600;
cursor: pointer;
transition: background-color 0.25s ease, color 0.25s ease;

.circle {
    display: grid;
    place-items: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.spin { animation: ${spin} 1.2s linear infinite; }

&:hover:not(:disabled) {
    background: ${props => props.theme.body};
    color: ${props => props.theme.text};
}
&:hover:not(:disabled) .circle {
    background: ${props => props.theme.text};
    color: ${props => props.theme.body};
    transform: translateX(4px);
}
&:disabled { cursor: progress; opacity: 0.85; }
&:focus-visible { outline: 2px solid ${props => props.theme.text}; outline-offset: 4px; }

@media (prefers-reduced-motion: reduce) {
    .spin { animation: none; }
}
@media (max-width: 760px) {
    justify-self: stretch;
    justify-content: space-between;
}
`

const Success = styled(motion.div)`
display: grid;
gap: 0.9rem;
align-content: start;
min-height: 16rem;

h3 { font-family: 'Karla', sans-serif; font-size: clamp(1.6rem, 3vw, 2.3rem); }
p { font-family: 'Karla', sans-serif; font-size: 1.05rem; line-height: 1.5; overflow-wrap: anywhere; }
button {
    justify-self: start;
    margin-top: 0.5rem;
    padding: 0.7rem 1.3rem;
    border: 2px solid ${props => props.theme.text};
    border-radius: 999px;
    background: transparent;
    color: ${props => props.theme.text};
    font-family: 'Karla', sans-serif;
    font-weight: 600;
    cursor: pointer;
}
button:hover { background: ${props => props.theme.text}; color: ${props => props.theme.body}; }
`

const Links = styled.section`
min-width: 0;
display: flex;
flex-direction: column;

h3 {
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.78rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${props => `rgba(${props.theme.textRgba},0.65)`};
    margin-bottom: 0.5rem;
}

ul { list-style: none; margin: 0; padding: 0; }
li { border-bottom: 1px solid ${props => `rgba(${props.theme.textRgba},0.2)`}; }

li a {
    display: grid;
    grid-template-columns: 20px auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    min-height: 3.25rem;
    padding: 0.35rem 0.6rem;
    margin: 0 -0.6rem;
    color: ${props => props.theme.text};
    text-decoration: none;
    font-family: 'Karla', sans-serif;
    transition: background-color 0.25s ease, color 0.25s ease;
}
.label { font-weight: 700; }
.value {
    font-family: 'Ubuntu Mono', monospace;
    font-size: 0.85rem;
    color: ${props => `rgba(${props.theme.textRgba},0.65)`};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
}
.arrow { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }

li a:hover, li a:focus-visible {
    background: ${props => props.theme.text};
    color: ${props => props.theme.body};
    outline: none;
}
li a:hover .value, li a:focus-visible .value { color: ${props => `rgba(${props.theme.bodyRgba},0.75)`}; }
li a:hover .arrow { transform: translate(2px, -2px); }

.home {
    margin-top: 1.4rem;
    align-self: flex-start;
}

/* Narrow phones: put the handle under the label so it's never cut. */
@media (max-width: 480px) {
    li a {
        grid-template-columns: 20px 1fr auto;
        grid-template-areas: "icon label arrow" "icon value arrow";
        row-gap: 0.1rem;
        padding-top: 0.55rem;
        padding-bottom: 0.55rem;
    }
    li a svg { grid-area: icon; }
    .label { grid-area: label; }
    .value { grid-area: value; text-align: left; white-space: normal; overflow-wrap: anywhere; }
    .arrow { grid-area: arrow; }
}
`

export default SayHiPage
