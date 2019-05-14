export const types = {
  orientation: ['Landscape', 'Portrait'],
  status: [
    'Started',
    'WaitingForReview',
    'TechnicalWriterPending',
    'TechnicalWriterApproved',
    'Ready',
    'Published',
  ],
  audience: ['All', 'Kids', 'Elderly'],
  mediaType: ['Photo', 'Video'],
  level: ['Basic', 'Intermediate', 'Advanced'],
};

export const domains = {
  Learning: ['Plain', 'Facts'],
  Cognition: [
    'WhatsInThePicture',
    'SpotTheDifference',
    'SoundOfLifePhoto',
    'MemoryCards',
    'Commonality',
    'HowToMake',
  ],
  Speech: ['ArticulationWord', 'ArticulationPhrase', 'ArticulationSentense'],
  Communication: ['Meaning', 'WHQuestions', 'GoodStory'],
};
