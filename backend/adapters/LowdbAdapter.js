import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export const filesystemDatabase = (path) => {
  const dbAdapter = new FileSync(path);
  const db = low(dbAdapter);
  const getApi = (name) => db.get(`apis.${name}`).value();
  const setApi = (name, api) => db.set(`apis.${name}`, api).write();
  db.defaults({ apis: {} }).write();
  console.log(path)
  return {
    getApi,
    setApi
  }
}
