module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', ':zap: fix', 'docs', 'style', 'refactor', 'test', 'revert'],
    ],
  },
};
