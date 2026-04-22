/**
 * test lib/utils.js
 *
 * Relies on the following environment:
 *   process.env.HS_ENCRYPTION_KEY
 *   process.env.HS_HMAC_SECRET
 *
 * Copyright (c) 2023-2025 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import { describe, test } from 'node:test';
import assert from 'node:assert';
import { encryptAndDigest, decryptAndTest } from '../lib/helpers.js';

const input = 'hello world';

describe('full basic test', () => {
  test('basic functionality', () => {
    const enc = encryptAndDigest(input);
    assert.ok('digest' in enc);
    assert.ok('payload' in enc);

    const result = decryptAndTest(enc.digest, enc.payload);
    assert.ok('ok' in result);
    assert.ok( 'decrypted' in result);
    assert.strictEqual(result.ok, true);
    assert.strictEqual(result.decrypted, input);
  });
});
