export default {
  '**/*.{js,ts,html,css}': 'npm run prettier:fix',
  '**/*.{js,ts}': 'npm run eslint:fix',
  'src/**/*.css': 'npm run stylelint',
  '**/*.ts': 'npm run type-checking',
  '**/*.test.ts': 'npm run test'
}
