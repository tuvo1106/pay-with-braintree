# Pay With Braintree

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pretty Print Logging

For pretty-print logging, install a npm library globally:

```bash
npm i -g pino-pretty
```

Start server:

```bash
npm run dev-pretty
```

## Database Commands

To generate the schema, run the following command:

```bash
npm run db:generate
```

To push schema changes, run the following command:

```bash
npm run db:push
```

To reset the database, run the following command:

```bash
npm run db:reset
```

To open a prisma client in your browser on port `localhost:5555`, run the following command:

```bash
npm run db:client
```
