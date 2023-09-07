/**
 * Simple test of package integrity.
 */
const assert = require('node:assert');
const crypto = require('node:crypto');

function testEncryptAndDigest(encryptAndDigest) {
  const hmacSecret = crypto.randomBytes(32);
  const encryptionKey = crypto.randomBytes(32);
  const result = encryptAndDigest('hello world', {
    hmacSecret,
    encryptionKey
  });
  assert.ok(result);
}

module.exports = {
  testEncryptAndDigest
};