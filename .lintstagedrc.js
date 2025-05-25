module.exports = {
  // Lint & Prettier
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix',
    'jest --bail --findRelatedTests --passWithNoTests',
  ],

  // Prettier para outros arquivos
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': ['prettier --write'],
};
