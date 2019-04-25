module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'xfix', 'docs', 'style', 'refactor', 'test', 'revert'],
    ],
  },
};
