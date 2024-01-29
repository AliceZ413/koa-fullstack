import fsLiteDriver from 'unstorage/drivers/fs-lite';
import { createStorage } from 'unstorage';
import path from 'node:path';

const storage = createStorage({
  driver: fsLiteDriver({
    base: path.resolve(process.cwd(), './tmp/sessions'),
  }),
});

export { storage };
