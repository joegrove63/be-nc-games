const { authorLookup } = require('../db/utils/data-manipulation');

describe('authorLookup', () => {
  test.only('should return an empty object, when passed an empty array', () => {
    const actual = authorLookup([]);
    expect(actual).toEqual({});
  });
});
