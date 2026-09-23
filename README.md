# Aditya Mittal — Portfolio

This is my personal portfolio site. It brings together a little about me, the things I'm learning, projects I've worked on, and a way to get in touch.

The design uses a few small animations and visual details, including a particle background, page transitions, and a sound toggle. The content for my profile, projects, skills, and blog entries lives in separate files so I can update it without digging through every component.

## What's on the site

- **Home** — an introduction with rotating greetings in different languages.
- **About** — a bit about my interests and what I'm working towards.
- **Projects** — selected projects, their descriptions, and technology tags.
- **Skills** — the skills listed on the site.
- **Blog** — posts and notes configured in the project data.
- **Say Hi** — contact details and a message form.

There is also a light theme, animated page transitions, and a link back home on the inner pages.

## Built with

- React
- Vite
- React Router
- styled-components
- Motion
- tsParticles

The contact form uses a small serverless endpoint in `api/contact.js` and Resend to deliver messages.

## Run it locally

You'll need Node.js and npm, or Bun if that's what you normally use.

1. Clone the repository and move into the project folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local address printed by Vite. The config uses port `3000` by default.

To make a production build:

```bash
npm run build
```

To preview that build locally:

```bash
npm run preview
```

## Contact form setup

The site itself can run without email credentials, but the contact form won't be able to send messages until the server-side environment variables are configured.

1. Copy `.env.example` to `.env.local`.
2. Add a Resend API key to `RESEND_API_KEY`.
3. If needed, change `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.

Keep these values on the server. Don't add the Resend key to a variable starting with `VITE_` or commit your real `.env.local` file. For production, add the same variables in your hosting provider's environment settings. The default sender in the example is Resend's test sender; sending from your own domain requires verifying that domain with Resend.

## Updating the content

Most of the site copy and lists are kept in `src/data/`:

- `profile.js` — name, intro, portrait, social links, greetings, and About text.
- `WorkData.js` — project cards and their links.
- `SkillsData.js` — skills shown on the Skills page.
- `BlogData.js` — entries shown on the Blog page.

Images and other static assets are in `src/assets/`. If you add a project or link, make sure its description and status reflect what is actually working, and use `null` for links that aren't available yet.

## Deployment

The project includes a `vercel.json` file and an API route designed for Vercel serverless functions. Set the contact-form environment variables in the deployment settings before relying on the form in production. If you deploy somewhere else, check that the host supports the `/api/contact` endpoint or adapt it to that platform.

## Notes

This is an ongoing project, so the content and project list will change as I build and learn more. If you spot something broken, feel free to reach out through the contact links on the site.
