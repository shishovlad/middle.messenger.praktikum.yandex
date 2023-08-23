module.exports = {
  '**/*.{js,ts,html,css}': 'npm run prettier:fix',
  'src/**/*.css': 'npm run stylelint',
  '**/*.{js,ts}': 'npm run eslint:fix',
  '**/*.{ts,vue}': 'npm run type-checking'
}
