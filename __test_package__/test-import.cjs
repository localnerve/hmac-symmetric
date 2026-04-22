const { testEncryptAndDigest } = require('./functions.js');

// eslint-disable-next-line n/no-missing-import
import('package').then(({ encryptAndDigest }) => {
  testEncryptAndDigest(encryptAndDigest);
});