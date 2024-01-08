/**
 * test lib/utils.js
 *
 * Relies on the following environment:
 *   process.env.HS_ENCRYPTION_KEY
 *   process.env.HS_HMAC_SECRET
 *
 * Copyright (c) 2023-2024 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* eslint-env jest */
import { HSError } from '../lib/errors.js';
import { generateHmac, symmetricEncrypt, symmetricDecrypt } from '../lib/utils.js';

const input = 'hello world';

describe('generateHmac', () => {
  test('basic equality', () => {    
    const first = generateHmac(input);
    const second = generateHmac(input);
    expect(first).toEqual(second);
  });

  test('bad secret, environment override, HSError instance', () => {
    expect(() => {
      generateHmac(input, {
        hmacSecret: {}
      });
    }).toThrow(HSError)
  });

  test('bad algo, error type', () => {
    try {
      generateHmac(input, {
        hmacAlgo: 'notAlgo'
      });
      throw new Error('This should not have run');
    } catch (e) {
      expect(e.hseType).toEqual(HSError.HSE_HMAC);
    }
  });
});

describe('symmetricEncrypt', () => {
  test('basic encyption', () => {
    const encrypted = symmetricEncrypt(input);
    const decrypted = symmetricDecrypt(encrypted);
    expect(decrypted).toEqual(input);
  });

  test('bad key, environment override, HSError instance', () => {
    expect(() => {
      symmetricEncrypt(input, {
        encryptionKey: {}
      });
    }).toThrow(HSError);
  });

  test('bad algo, error type', () => {
    try {
      symmetricEncrypt(input, {
        encryptionAlgo: 'notAlgo'
      });
      throw new Error('this should not have run');
    } catch (e) {
      expect(e.hseType).toEqual(HSError.HSE_ENCRYPT);
    }
  });
});

describe('symmetricDecrypt', () => {
  test('decrypt to buffer', () => {
    const encrypted = symmetricEncrypt(input);
    const decrypted = symmetricDecrypt(encrypted, { outputBuffer: true });
    expect(decrypted).toBeInstanceOf(Buffer);
    expect(decrypted.toString()).toEqual(input);
  });

  test('bad key, environment override, HSError instance', () => {
    expect(() => {
      symmetricDecrypt('one:two', {
        encryptionKey: {}
      });
    }).toThrow(HSError);
  });

  test('bad algo, error type', () => {
    try {
      symmetricDecrypt('one:two', {
        encryptionKey: {}
      });
      throw new Error('this should not have run');
    } catch (e) {
      expect(e.hseType).toEqual(HSError.HSE_DECRYPT);
    }
  });
});