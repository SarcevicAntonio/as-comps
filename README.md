# SvelteKit Library Pacakge Template

IMO some things in the default template are mssing for using sveltekits awesome package feature to publish a library with docs and demo (and tests at some point maybe?)

I've this based on `create-svelte` (i.e. `npm init svelte@next`) with TS, ES Lint and Prettier plus the `npm run package` script, mdsvex for stupidly simple markdown docs and a `Build and Deploy Lib and Docs` GitHub workflow


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

* Use `src/lib/` for the package itself and `index.ts` for the entrypoint
* Use `src/routes/` for docs, demos (and tests?)

## Building / Packaging

Before creating a production version of your lib, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run package
```

> You can preview the docs with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

 # To publish it to npm:
```
cd package
npm publish
``` 
