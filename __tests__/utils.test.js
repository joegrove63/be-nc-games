const {
  createReviewLookupObj,
  amendDate,
  formatComments
} = require('../db/utils/data-manipulation');

describe('amendDate', () => {
  test('should return an empty array, when passed in an empty array', () => {
    const actual = amendDate([]);
    expect(actual).toEqual([]);
  });
  test('should return an array with the created_at value in the correct date format', () => {
    const arrayWithUnixDate = [
      {
        created_at: 1610964101251
      }
    ];
    const actual = amendDate(arrayWithUnixDate);
    expect(actual).toEqual([{ created_at: new Date(1610964101251) }]);
  });
  test('the array passed in should not be mutated', () => {
    const arrayWithUnixDate = [
      {
        created_at: 1610964101251
      }
    ];
    amendDate(arrayWithUnixDate);
    expect(arrayWithUnixDate).toEqual([
      {
        created_at: 1610964101251
      }
    ]);
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
  test('should return an empty object, when passed an empty array', () => {
    const actual = createReviewLookupObj([]);
    expect(actual).toEqual({});
  });
  test('return a ref obj when passed array with 1 review', () => {
    const review = [
      {
        review_id: 4,
        title: 'One Night Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        votes: 5,
        category: 'hidden-roles',
        owner: 'happyamy2016',
        created_at: '2021-01-18T10:01:41.251Z'
      }
    ];
    const actual = createReviewLookupObj(review);
    expect(actual).toEqual({ 'One Night Ultimate Werewolf': 4 });
  });
  test('should return a ref obj when passed in multiple reviews ', () => {
    const review = [
      {
        review_id: 4,
        title: 'One Night Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        votes: 5,
        category: 'hidden-roles',
        owner: 'happyamy2016',
        created_at: '2021-01-18T10:01:41.251Z'
      },
      {
        review_id: 5,
        title: 'A truly Quacking Game; Quacks of Quedlinburg',
        review_body:
          "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
        designer: 'Wolfgang Warsch',
        review_img_url: null,
        votes: 10,
        category: 'push-your-luck',
        owner: 'happyamy2016',
        created_at: '2021-01-18T10:01:41.251Z'
      }
    ];
    const actual = createReviewLookupObj(review);
    expect(actual).toEqual({
      'One Night Ultimate Werewolf': 4,
      'A truly Quacking Game; Quacks of Quedlinburg': 5
    });
  });
  test('does not mutate the original array ', () => {
    const review = [
      {
        review_id: 4,
        title: 'One Night Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        votes: 5,
        category: 'hidden-roles',
        owner: 'happyamy2016',
        created_at: '2021-01-18T10:01:41.251Z'
      }
    ];
    createReviewLookupObj(review);
    expect(review).toEqual([
      {
        review_id: 4,
        title: 'One Night Ultimate Werewolf',
        review_body: "We couldn't find the werewolf!",
        designer: 'Akihisa Okui',
        review_img_url:
          'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        votes: 5,
        category: 'hidden-roles',
        owner: 'happyamy2016',
        created_at: '2021-01-18T10:01:41.251Z'
      }
    ]);
  });
});

describe('formatComments()', () => {
  test('should return an empty array when passed empty array & lookup object', () => {
    const actual = formatComments([], {});
    expect(actual).toEqual([]);
  });
  test('should return an array with 1 formatted comment when passed and array with 1 comment and a lookup obj', () => {
    const comment = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const lookUp = { 'JengARRGGGH!': 2 };
    const actual = formatComments(comment, lookUp);
    expect(actual).toEqual([
      {
        body: 'I loved this game too!',
        review_id: 2,
        created_by: 'happyamy2016',
        votes: 16,
        created_at: 1511354163389
      }
    ]);
  });
  test('should return an array with multiple formatted comments when passed an array with multiple comments and a lookup obj', () => {
    const comments = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: 'My dog loved this game too!',
        belongs_to: 'One Night Ultimate Werewolf',
        created_by: 'tickle122',
        votes: 3,
        created_at: 1610964545410
      }
    ];
    const lookUp = { 'JengARRGGGH!': 2, 'One Night Ultimate Werewolf': 4 };
    const actual = formatComments(comments, lookUp);
    expect(actual).toEqual([
      {
        body: 'I loved this game too!',
        review_id: 2,
        created_by: 'happyamy2016',
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: 'My dog loved this game too!',
        review_id: 4,
        created_by: 'tickle122',
        votes: 3,
        created_at: 1610964545410
      }
    ]);
  });
  test('Should not muatate the comment data that is passed in', () => {
    const comment = [
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const lookUp = { 'JengARRGGGH!': 2 };
    formatComments(comment, lookUp);
    expect(comment).toEqual([
      {
        body: 'I loved this game too!',
        belongs_to: 'JengARRGGGH!',
        created_by: 'happyamy2016',
        votes: 16,
        created_at: 1511354163389
      }
    ]);
  });
});
