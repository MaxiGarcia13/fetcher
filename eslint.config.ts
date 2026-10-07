import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { eslintConfig } from '@maxigarcia/eslint-config';

const dir = dirname(fileURLToPath(import.meta.url));

export default eslintConfig(
  {
    react: true,
    typescript: true,
    tailwindcss: true,
    astro: true,
  },
  {
    settings: {
      tailwindcss: {
        config: join(dir, 'src/styles/global.css'),
      },
    },
  },
);
