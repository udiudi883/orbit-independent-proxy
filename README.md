# Orbit Independent Proxy

## What this is
This deploys a **separate instance** under your own hosted URL. It does not use the public Rammerhead demo. The proxy engine is the open-source Rammerhead project, downloaded during the cloud build; the instance and its URL are yours. This is not a new proxy engine written from scratch.

## Chromebook-only deployment (no Linux on Chromebook)

You need a GitHub account and a Render account. The actual Node.js process runs on Render, not on your Chromebook.

1. Download and unzip this archive.
2. In GitHub, create a **new public repository** (for example `orbit-independent-proxy`).
3. Upload the files in this folder to the repository root: `Dockerfile`, `config.js`, and `render.yaml`. Do not upload the zip as the only file.
4. Open https://dashboard.render.com/ and sign in with GitHub.
5. Choose **New → Blueprint**, then select the repository you just created.
6. When asked for `ORBIT_PASSWORD`, set a strong password that you have not used elsewhere. Do not put it into a public file.
7. Deploy. Render will build the container; this can take several minutes. After it completes, open the `onrender.com` URL shown on the service dashboard.
8. Keep the URL private. Anyone who discovers a public proxy can try to use it, and the free service may sleep when idle.

## Important limitations
- This requires cloud hosting. A site that works like a full web proxy cannot be hosted as a plain static HTML page.
- The deployment downloads the upstream open-source Rammerhead engine during the build. It is an independently hosted instance, but not an independently implemented proxy engine.
- Google sign-in is not supported by Rammerhead; some sites may still refuse proxying. See the upstream project README: https://github.com/binary-person/rammerhead
- Render's free web services can sleep when idle. See https://render.com/docs/your-first-deploy
- Do not use it to bypass school/work network rules or to access services without authorization. Do not enter sensitive passwords or payment details into a proxy.
- If deployment fails, open the Render build/runtime logs. Common causes are upstream changes, missing environment variable configuration, or hosting limitations.

## Files
- `Dockerfile`: cloud build and startup
- `config.js`: single-port HTTPS reverse-proxy settings and session password
- `render.yaml`: Render Blueprint definition
