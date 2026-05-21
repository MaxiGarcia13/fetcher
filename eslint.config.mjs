import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { eslintConfig } from '@maxigarcia/eslint-config';

const rootDir = dirname(fileURLToPath(import.meta.url));

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
        config: join(rootDir, 'src/styles/global.css'),
      },
    },
  },
);
