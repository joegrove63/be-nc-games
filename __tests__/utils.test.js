const createRef = require('../db/utils/data-manipulation');

describe('createRef', () => {
  test('create an empty object when passed an empty array', () => {
    const actual = createRef([]);
    expect(actual).toEqual({});
  });
  test('creates a reference obj when passed an array with 1 category', () => {
    const testData = [
      {
        title: 'Culture a Love of Agriculture With Agricola',
        category: 'strategy'
      }
    ];
    const actual = createRef(testData);
    expect(actual).toEqual({
      'Culture a Love of Agriculture With Agricola': 'strategy'
    });
  });
});
