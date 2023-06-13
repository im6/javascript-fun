import { Observable } from 'rxjs';
import { clientConn } from '../mongodb/connection';

export const updateCollection$ = (collectionName: string, rows: any) => {
  const collection = clientConn.db('jsfun').collection(collectionName);
  return new Observable((subscriber) => {
    collection.insertMany(rows).then(
      (data) => {
        subscriber.next(data);
        subscriber.complete();
      },
      (err) => {
        subscriber.error(err);
      }
    );
  });
};

export const deleteCollection$ = (collectionName: string) => {
  const collection = clientConn.db('jsfun').collection(collectionName);
  return new Observable((subscriber) => {
    collection.deleteMany({}).then(
      (data) => {
        subscriber.next(data);
        subscriber.complete();
      },
      (err) => {
        subscriber.error(err);
      }
    );
  });
};
