import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { eslintConfig } from '@maxigarcia/eslint-config';

export default eslintConfig(
  {
    react: true,
    typescript: true,
    jsx: true,
    tailwindcss: true,
    astro: true,
  },
  {
    settings: {
      tailwindcss: {
        config: join(dirname(fileURLToPath(import.meta.url)), 'src/styles/global.css'),
      },
    },
  },
);
