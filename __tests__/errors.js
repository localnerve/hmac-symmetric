/**
 * Test the library error types.
 * 
 * Copyright (c) 2023-2025 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the BSD License. See the accompanying LICENSE file for terms.
 */
import { describe, test } from 'node:test';
import assert from 'node:assert';
import { HSError } from '../lib/errors.js';

describe('HSError', () => {

  test('error properties work as expected', () => {
    const message = 'my nice little error';
    const originalError = new Error(message)
    const err = new HSError(HSError.HSE_HMAC, originalError);

    assert.ok(err.hseType === HSError.HSE_HMAC);
    assert.ok(err.message === message);
    assert.ok(err.name === 'HSError');
  });
});