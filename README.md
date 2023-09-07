# hmac-symmetric

> A library for simple symmetric encryption with HMAC digests

[![npm version](https://badge.fury.io/js/@localnerve%2Fhmac-symmetric.svg)](https://badge.fury.io/js/@localnerve%2Fhmac-symmetric)
![Verify](https://github.com/localnerve/hmac-symmetric/workflows/Verify/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/localnerve/hmac-symmetric/badge.svg?branch=main)](https://coveralls.io/github/localnerve/hmac-symmetric?branch=main)

## Summary
A zero dependency node library with basic functions for using symmetric encryption with HMAC digests. A a simple, small, configurable, and reusable set of functions for payload integrity and authentication.  

TLDR; Skip to the [example](#example)...

## Applications
This is a general purpose library that can be used in any application where an HMAC'd symmetrically encrypted payload is useful. Here's a quick reminder of a couple of useful applications for this library:
1. Bot Mitigation  
  When the payload is a simple timestamp, roundtripping (get at the beginning and send at the end of input) can be used to force bots to take a "human" amount of time to submit a form or field. This is a deal breaker for any serious bot network. In my experience, this is the biggest step you can take to destroy bots and maintain user trust, but you have to procure/measure an accurate minimum human usage time.  
2. Integrity and Authenticity  
  The base function of a hashcode is to ensure payload integrity (that it has been unaltered). When combined with a shared secret (HMAC), this also ensures authtenticity. If there are services on your network that will receive a data block that originated from the a trusted source, this can be used to verify the integrity and authenticity of that data block, no matter how many hands it went through in between.  
  
## API
This library uses the environment variables  
  + `HS_HMAC_SECRET`
  + `HS_ENCRYPTION_KEY`

As the default source for keys for cryptographic functions.  
For more information see:  
  1. For HMAC secret [key](https://nodejs.org/api/crypto.html#cryptocreatehmacalgorithm-key-options)
  2. For Encryption/Decryption [key](https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options)
  3. And [caveats for using strings as inputs for cryptographic APIs](https://nodejs.org/api/crypto.html#using-strings-as-inputs-to-cryptographic-apis)

To **NOT** use environment variables, supply options `hmacSecret` and `encryptionKey`.

Methods this library exports:

### encryptAndDigest
Symmetrically encrypt data and generate an HMAC digest for it.  
`encryptAndDigest (input [, options]) : { payload, digest }`  
  * {String|Buffer|TypedArray|DataView} input - The data to encrypt
  * {Object} [options] - Optional options for [generateHmac](#generatehmac) and [symmetricEncrypt](#symmetricencrypt)
  * Returns {Object} with `payload` and `digest` properties for the encrypted payload and the hmac digest.

### decryptAndTest  
Symmetrically decrypt data and test it's HMAC digest against an original.   
`decryptAndTest (originalDigest, encryptedInput [, options]) : { ok, decrypted }`  
  * {String} originalDigest - The original hmac digest to test against.
  * {String} encryptedInput - The encrypted input data string.
  * {Object} [options] - Optional options for [generateHmac](#generatehmac) and [symmetricDecrypt](#symmetricdecrypt)
  * Returns {Object} with `ok` and `decrypted` properties for the test result and the decrypted payload.

### generateHmac
Generate an HMAC digest using the HMAC secret.  
`generateHmac (input [, options]) : String`  
 * {String|Buffer|TypedArray|DataView} input - Input data.
 * {Object} [options] - Optional options.
 * {String} [options.inputEncoding] - Applied if input is a String. Default 'utf8'.
 * {String} [options.hmacAlgo] - Algo used to create HMAC. Default 'sha256'.
 * {String} [options.hmacSecret] - Secret to use. Defaults to environment variable `HS_HMAC_SECRET`.
 * Returns {String} of a hex encoded HMAC digest.

### symmetricEncrypt
Symmetrically encrypt the input using an encryption key.  
`symmetricEncrypt (input [, options]) : String`  
  * {String|Buffer|TypedArray|DataView} input - The data to encrypt.
  * {Object} [options] - Optional options.
  * {String} [options.encryptionAlgo] - Symmetric cipher algo, defaults to 'aes-256-cbc'.
  * {String} [options.encryptionKey] - Symmetric cipher key. Defaults to environment variable `HS_ENCRYPTION_KEY`.
  * {String} [options.inputEncoding] - Encoding if the input is a String. Defaults to 'utf8'.
  * Returns {String} hex encoded encryption of the input.

### symmetricDecrypt
Symmetrically decrypt an encrypted input using an encryption key.  
`symmetricDecrypt (input [, options]) : String`  
  * {String} input - The encrypted data.
  * {Object} [options] - Optional options.
  * {String} [options.encryptionAlgo] - Symmetric cipher algo, defaults to 'aes-256-cbc'.
  * {String} [options.encryptionKey] - Symmetric cipher key. Defaults to environment `HS_ENCRYPTION_KEY`.
  * {Boolean} [options.outputBuffer] - true to return the Buffer result, false to convert buffer to string. Defaults to false.
  * Returns {String|Buffer} for the decrypted data as requested.

### HSError
The class used by this library to throw errors.  
Useful for determining hmac-symmetric specific error source.  
`class HSError, constructor (hsErrorType, originalError)`

#### HSError.HSE_HMAC
Error property `hseType` will be equal to `HSError.HSE_HMAC` if error occurred during HMAC generation.

#### HSError.HSE_ENCRYPT
Error property `hseType` will be equal to `HSError.HSE_ENCRYPT` if error occurred during encryption.

#### HSError.HSE_DECRYPT
Error property `hseType` will be equal to `HSError.HSE_DECRYPT` if error occurred during decryption.

## Example

Encryption/decryption usage with top level helper API using `hmacSecret` and `encryptionKey` (instead of using environment variables `HS_HMAC_SECRET` and `HS_ENCRYPTION_KEY`).

```javascript
import crypto from 'node:crypto';
import { HSError, encryptAndDigest, decryptAndTest } from '@localnerve/hmac-symmetric';

// Create demo input and phony keys for demo only.
const input = 'hello world';
const hmacSecret = crypto.randomBytes(32);
const encryptionKey = crypto.randomBytes(32);  
console.log(input);
  // hello world

try {
  const encrypted = encryptAndDigest(input, {
    hmacSecret,
    encryptionKey
  });
  console.log(encrypted);
    // {
    //   digest: 'd3d6a6f1b2723f001c8c4ff4b28d0b310899c5eefbdbece184d62fcd8a4d712e',
    //   payload: '1f59ccab850189d7906db63f7f087d0f:957c9fe80c93033a8f9a9de0c0d73729'
    // }

  const decrypted = decryptAndTest(encrypted.digest, encrypted.payload, {
    hmacSecret,
    encryptionKey
  });
  console.log(decrypted);
    // { 
    //   ok: true,
    //   decrypted: 'hello world'
    // }

} catch (e) {
  console.log(e.hseType);
    // HSE_HMAC, HSE_ENCRYPT, or HSE_DECRYPT
  console.log('hmac error', e.hseType === HSError.HSE_HMAC);
  console.log('encryption error', e.hseType === HSError.HSE_ENCRYPT);
  console.log('decryption error', e.hseType === HSError.HSE_DECRYPT);
}
```
## LICENSE

* [BSD 3-Clause, Alex Grant, LocalNerve, LLC](LICENSE.md)
