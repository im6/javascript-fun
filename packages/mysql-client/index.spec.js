const mysql = require('mysql');
const sqlExecOne = require('./index');

jest.mock('mysql');

describe('mysql connection', () => {
  const mockDatabase = [1, 2, 3];
  beforeAll(() => {
    mysql.createConnection.mockImplementation(() => ({
      query: (query, cb) => {
        cb(null, mockDatabase);
      },
      end: jest.fn(),
    }));
  });
  test('show sql pool is working', () => {
    const cb = jest.fn();
    sqlExecOne('select *', cb);
    expect(cb).toBeCalledTimes(1);
    expect(cb).toBeCalledWith(null, mockDatabase);
  });
});
