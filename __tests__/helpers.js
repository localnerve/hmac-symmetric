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
import { encryptAndDigest, decryptAndTest } from '../lib/helpers.js';

const input = 'hello world';

describe('full basic test', () => {
  test('basic functionality', () => {
    const enc = encryptAndDigest(input);
    expect(enc).toHaveProperty('digest');
    expect(enc).toHaveProperty('payload');

    const result = decryptAndTest(enc.digest, enc.payload);
    expect(result).toHaveProperty('ok');
    expect(result).toHaveProperty('decrypted');
    expect(result.ok).toStrictEqual(true);
    expect(result.decrypted).toEqual(input);
  });
});
