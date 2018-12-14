module.exports = {
  presets: ['@vue/app'],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@libs': './libs'
        }
      }
    ]
  ]
};
