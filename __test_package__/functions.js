/**
 * Simple test of package integrity.
 * 
 * Copyright (c) 2023-2024 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
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