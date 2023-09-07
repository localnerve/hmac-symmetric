/**
 * Error type for hmac symmetric.
 *
 * Copyright (c) 2023 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */

export class HSError extends Error {
  static HSE_HMAC = 'HSE_HMAC';
  static HSE_ENCRYPT = 'HSE_ENCRYPT';
  static HSE_DECRYPT = 'HSE_DECRYPT';

  #hseType;
  get hseType () {
    return this.#hseType;
  }

  constructor (hsErrorType, originalError) {
    super(originalError.message, { cause: originalError });
    this.#hseType = hsErrorType;
    this.name = 'HSError';
  }
}