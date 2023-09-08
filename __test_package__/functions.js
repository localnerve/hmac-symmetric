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
  assert.ok(result, "nothing returned from package");
  assert.ok(result.digest.length > 0, 'no digest returned from package');
  assert.ok(result.payload.length > 0, 'no payload returned from package');
}

module.exports = {
  testEncryptAndDigest
};