const { encryptAndDigest } = require('package'); // eslint-disable-line n/no-missing-require
const { testEncryptAndDigest } = require('./functions');

testEncryptAndDigest(encryptAndDigest);