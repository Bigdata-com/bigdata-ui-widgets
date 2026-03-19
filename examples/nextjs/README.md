This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running DEV mode

### Requisites
- [Node v20.20](https://nodejs.org/en/download) or higher installed
- [Bigdata.com API key](https://platform.bigdata.com/api-keys)

### Setup

Make a copy of `.env.example`, rename it to `.env` and paste your `API_KEY`. Be careful of sharing the contents of that file.

### Run steps

```bash
# Install dependencies, we are using `yarn`
yarn

# Execute the project
yarn dev
```

Your project should be running on `http://localhost:3000`

## Running using Docker

```bash
# Build docker image
docker build -t bigdata-widgets-demo .

# Run your image
docker run -p: 3000:3000 bigdata-widgets-demo
```

Your project should be running on `http://localhost:3000`

**Info:** `.env` file is included inside `.dockerignore` for security reasons. If you wish to test locally, you might want to remove that entry from `.dockerignore`