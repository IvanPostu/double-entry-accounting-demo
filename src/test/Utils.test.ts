import { describe, expect, test } from '@jest/globals';
import { DoubleEntryAccount } from '@/app/DoubleEntryAccount';

describe('Test case', () => {
  test.only('Create and migrated database', async () => {
    const doubleEntryAccount: DoubleEntryAccount = await DoubleEntryAccount.create();
    doubleEntryAccount.close();
  });
});
