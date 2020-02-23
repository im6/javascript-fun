import { port } from '../config';
import app from './app';

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(
    `app (mode: ${process.env.NODE_ENV}) is running on: http://localhost:${port}`
  )
);
