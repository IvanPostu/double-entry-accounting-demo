import { describe, expect, test } from '@jest/globals';
import { DoubleEntryAccount } from '@/app/DoubleEntryAccount';

describe('d1', () => {
  test.only('test1', async () => {
    const doubleEntryAccount: DoubleEntryAccount = await DoubleEntryAccount.create();
    doubleEntryAccount.close();
  });
});
