const {
  createReviewLookupObj,
  amendDate
} = require('../db/utils/data-manipulation');

describe('amendDate', () => {
  test('should return an empty array, when passed in an empty array', () => {
    const actual = amendDate([]);
    expect(actual).toEqual([]);
  });
});

/*
 {
  review_id: 4,
  title: 'One Night Ultimate Werewolf',
  review_body: "We couldn't find the werewolf!",
  designer: 'Akihisa Okui',
  review_img_url: 'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  votes: 5,
  category: 'hidden-roles',
  owner: 'happyamy2016',
  created_at: 2021-01-18T10:01:41.251Z
},
being passed an array of reivews identical to the above

object lookup - { one Night Ulitmate Werewolf: 4 }

Use this object to format the comments
make sure we don't mutate the original, use a copy
comments.belongs to = objectlookup.oneNightultimateWerewolf

*/
describe('createReviewLookupObj', () => {
  test.only('should return an empty object, when passed an empty array', () => {
    const actual = createReviewLookupObj([]);
    expect(actual).toEqual({});
  });
});
