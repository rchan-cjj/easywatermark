# watermark-pdf

A Node.js server to watermark PDF documents locally.

It is designed to add a layer of protection to identity documents against reuse.

Inspired by [FiligraneFacile](https://filigrane.beta.gouv.fr/), but unlike the latter, it does not upload your files to a remote server. 

## Run

Tested on Node v20.19.2.

Clone the repository and run the following commands:

```sh
# Install packages
npm install

# Run locally
npx vite

```

## Ideas for improvement

- Customise watermark (font size and color, spacing...)
- Handle PNG and JPG
- Docker

