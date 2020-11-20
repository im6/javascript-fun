import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(
    `app (mode: ${process.env.NODE_ENV}) is running on: http://localhost:${port}`
  )
);
