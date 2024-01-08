/**
 * hmac and symmetric encryption utility methods.
 * sha256 hmac, aes-256-cbc symmetric encryption.
 * 
 * Relies on the following environment:
 *   process.env.HS_ENCRYPTION_KEY
 *   process.env.HS_HMAC_SECRET
 *
 * Copyright (c) 2023-2024 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import crypto from 'node:crypto';
import { HSError } from './errors.js';

/**
 * Generate an HMAC digest using the HMAC secret.
 *
 * @param {String|Buffer|TypedArray|DataView} input - Input data.
 * @param {Object} [options] - Optional options.
 * @param {String} [options.inputEncoding] - Applied if input is String. Default 'utf8'.
 * @param {String} [options.hmacAlgo] - Algo used to create HMAC. Default 'sha256'.
 * @param {String} [options.hmacSecret] - Secret to use. Defaults to environment HS_HMAC_SECRET.
 * @returns {String} Hmac digest as hex string.
 */
export function generateHmac (input, {
  inputEncoding = 'utf8',
  hmacAlgo = 'sha256',
  hmacSecret = undefined
} = {}) {
  let hmacDigest;

  try {
    const hmac = crypto.createHmac(
      hmacAlgo, hmacSecret ?? process.env.HS_HMAC_SECRET
    );
    hmac.update(input, inputEncoding);
    hmacDigest = hmac.digest('hex').toString();
  } catch (e) {
    throw new HSError(HSError.HSE_HMAC, e);
  }

  return hmacDigest;
}

/**
 * Symmetrically encrypt the input using the shared encryption key.
 * 
 * @param {String|Buffer|TypedArray|DataView} input - The data to encrypt.
 * @param {Object} [options] - Optional options.
 * @param {String} [options.encryptionAlgo] - Symmetric cipher algo, defaults to 'aes-256-cbc'.
 * @param {String} [options.encryptionKey] - Symmetric cipher key. Defaults to environment HS_ENCRYPTION_KEY.
 * @param {String} [options.inputEncoding] - Encoding if the input is a String. Defaults to 'utf8'.
 * @returns {String} Hex encoded encrypted string of the input
 */
export function symmetricEncrypt (input, {
  encryptionAlgo = 'aes-256-cbc',
  encryptionKey = undefined,
  inputEncoding = 'utf8'
} = {}) {
  let encryptionString;

  try {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(
      encryptionKey ?? process.env.HS_ENCRYPTION_KEY, 'hex'
    );
    const cipher = crypto.createCipheriv(encryptionAlgo, key, iv);

    let encrypted = cipher.update(input, inputEncoding);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    encryptionString = `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  } catch (e) {
    throw new HSError(HSError.HSE_ENCRYPT, e);
  }

  return encryptionString;
}

/**
 * Symmetrically decrypt the ecrypted input using the shared encryption key.
 * 
 * @param {String} input - The encrypted data.
 * @param {Object} [options] - Optional options.
 * @param {String} [options.encryptionAlgo] - Symmetric cipher algo, defaults to 'aes-256-cbc'.
 * @param {String} [options.encryptionKey] - Symmetric cipher key. Defaults to environment HS_ENCRYPTION_KEY.
 * @param {Boolean} [options.outputBuffer] - true to return the Buffer result, false to convert buffer to string. Defaults to false.
 * @returns {String|Buffer} The decrypted text
 */
export function symmetricDecrypt (input, {
  encryptionAlgo = 'aes-256-cbc',
  encryptionKey = undefined,
  outputBuffer = false
} = {}) {
  let decryptedResult;

  try {
    const textParts = input.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');

    const encryptedData = Buffer.from(textParts.join(':'), 'hex');
    const key = Buffer.from(
      encryptionKey ?? process.env.HS_ENCRYPTION_KEY, 'hex'
    );
    const decipher = crypto.createDecipheriv(encryptionAlgo, key, iv);
      
    const decrypted = decipher.update(encryptedData);
    const decryptedBuffer = Buffer.concat([decrypted, decipher.final()]);
    decryptedResult = outputBuffer ? decryptedBuffer : decryptedBuffer.toString();
  } catch (e) {
    throw new HSError(HSError.HSE_DECRYPT, e);
  }

  return decryptedResult;
}
