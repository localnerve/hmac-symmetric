/**
 * verify changes to the api are expected.
 * 
 * Copyright (c) 2023-2025 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import { describe, test } from 'node:test';
import assert from 'node:assert';
import {
  HSError,
  generateHmac,
  symmetricEncrypt,
  symmetricDecrypt,
  encryptAndDigest,
  decryptAndTest
} from '../lib/index.js';
import { HSError as HSErrorClass } from '../lib/errors.js';

describe('API', () => {

    test('errors', () => {
      assert.ok(new HSError('err', new Error()) instanceof HSErrorClass);
      assert.ok(HSError.HSE_HMAC);
      assert.ok(HSError.HSE_ENCRYPT);
      assert.ok(HSError.HSE_DECRYPT);
    });

    test('utils', () => {
      assert.ok(typeof generateHmac === 'function');
      assert.ok(typeof symmetricEncrypt === 'function');
      assert.ok(typeof symmetricDecrypt === 'function');
    });

    test('helpers', () => {
      assert.ok(typeof encryptAndDigest === 'function');
      assert.ok(typeof decryptAndTest === 'function');
    });

});