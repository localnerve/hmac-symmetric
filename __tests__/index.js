/**
 * verify changes to the api are expected.
 * 
 * Copyright (c) 2023-2025 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
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
      expect(new HSError('err', new Error())).toBeInstanceOf(HSErrorClass);
      expect(HSError.HSE_HMAC).toBeTruthy();
      expect(HSError.HSE_ENCRYPT).toBeTruthy();
      expect(HSError.HSE_DECRYPT).toBeTruthy();
    });

    test('utils', () => {
      expect(typeof generateHmac === 'function').toBeTruthy();
      expect(typeof symmetricEncrypt === 'function').toBeTruthy();
      expect(typeof symmetricDecrypt === 'function').toBeTruthy();
    });

    test('helpers', () => {
      expect(typeof encryptAndDigest === 'function').toBeTruthy();
      expect(typeof decryptAndTest === 'function').toBeTruthy();
    });

});