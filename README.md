# Hey!Sound

An app to share audio online with a maximum duration of 30 seconds.

- upload audio
- vote/downvote without authentication

> Made for Netlify x Dev.to challenge

## Tech Stack

- Next.js with App Router
- Typescript
- @netlify/blobs (storage)
- Shadcn (UI Library)
- TailwindCSS (Styling)

## Live Demo

[https://main--heysound.netlify.app/](https://main--heysound.netlify.app/)

## Gallery

![home page](/assets/home-ui.png)

## Developing Locally

1. Clone this repository, then run `npm install` in its root directory.

2. For this project to have full functionality locally (blob store), please ensure you have an up-to-date version of Netlify CLI. Run:

```
npm install netlify-cli@latest -g
```

3. Link your local repository to the deployed Netlify site. This will ensure you're using the same runtime version for both local development and your deployed site.

```
netlify link
```

4. Then, run the Next.js development server via Netlify CLI:

```
netlify dev
```

If your browser doesn't navigate to the site automatically, visit [localhost:8888](http://localhost:8888).

## Credits and references

- Huge credits to [50hacks.co](50hacks.co)
