const { testEncryptAndDigest } = require('./functions.js');

import('package').then(({ encryptAndDigest }) => {
  testEncryptAndDigest(encryptAndDigest);
});