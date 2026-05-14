export interface Quote {
  text: string;
  author: string;
}

export const QUOTES: Quote[] = [
  { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { text: "It is not the mountain we conquer, but ourselves.", author: "Edmund Hillary" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Henry David Thoreau" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "I have not failed. I have just found 10,000 ways that won't work.", author: "Thomas Edison" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
  { text: "If you're going through hell, keep going.", author: "Winston Churchill" },
  { text: "Many of life's failures are people who did not realise how close they were to success when they gave up.", author: "Thomas Edison" },
  { text: "In three words I can sum up everything I have learned about life: it goes on.", author: "Robert Frost" },
  { text: "Not everything that is faced can be changed, but nothing can be changed until it is faced.", author: "James Baldwin" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
  { text: "Everything you have ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "You cannot swim for new horizons until you have courage to lose sight of the shore.", author: "William Faulkner" },
  { text: "I have learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "The harder I work, the luckier I get.", author: "Samuel Goldwyn" },
  { text: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.", author: "Martin Luther King Jr." },
  { text: "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.", author: "Jimmy Dean" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein" },
  { text: "We know what we are, but know not what we may be.", author: "William Shakespeare" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth" },
  { text: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Luck is what happens when preparation meets opportunity.", author: "Seneca" },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca" },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
  { text: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "Challenges are what make life interesting; overcoming them is what makes life meaningful.", author: "Joshua Marine" },
  { text: "The will to win, the desire to succeed, the urge to reach your full potential — these are the keys that will unlock the door to personal excellence.", author: "Confucius" },
];

export function getDailyQuote(): Quote {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / 86_400_000);
  return QUOTES[dayOfYear % QUOTES.length];
}
