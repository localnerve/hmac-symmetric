/**
 * Test the library error types.
 * 
 * Copyright (c) 2023 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
/* eslint-env jest */
import { HSError } from '../lib/errors.js';

describe('HSError', () => {

  test('error properties work as expected', () => {
    const message = 'my nice little error';
    const originalError = new Error(message)
    const err = new HSError(HSError.HSE_HMAC, originalError);

    expect(err.hseType === HSError.HSE_HMAC).toBeTruthy();
    expect(err.message === message).toBeTruthy();
    expect(err.name === 'HSError');
  });
});