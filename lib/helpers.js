/**
 * Convenience methods for hmac symmetric.
 * 
 * Copyright (c) 2023 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import { generateHmac, symmetricEncrypt, symmetricDecrypt } from './utils.js';

/**
 * Generate hmac and symmetrically encrypted payload.
 * 
 * @param {String|Buffer|TypedArray|DataView} input - The data to encrypt.
 * @param {Object} [options] - Optional options, @see utils.js
 * @returns {Object} - { digest, payload } on success, throws HSError on error.
 */
export function encryptAndDigest (input, options) {
  return {
    digest: generateHmac(input, options),
    payload: symmetricEncrypt(input, options)
  };
}

/**
 * Decrypt encrypted input and check hmac digest with original.
 * 
 * @param {String} originalDigest - The original hmac digest to test against.
 * @param {String} encryptedInput - The encrypted input data string.
 * @param {Object} [options] - Optional options, @see utils.js
 * @returns {Object} - { ok, decrypted } on success, throws HSError on error.
 */
export function decryptAndTest (originalDigest, encryptedInput, options) {
  const decrypted = symmetricDecrypt(encryptedInput, options);
  const digest = generateHmac(decrypted, options);
  return {
    ok: digest === originalDigest,
    decrypted
  };
}