import type { UserConfig } from '@commitlint/types';
import { commitlintScopePlugin } from './config/commitlint-scope';

const commitlintConfig: UserConfig = {
  plugins: [commitlintScopePlugin as any],
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['global']],
  },
};

export default commitlintConfig;
