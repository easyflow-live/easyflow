import React from 'react';

import AutosuggestInput from '.';

export default {
  title: 'Atomos/AutosuggestInput',
  component: AutosuggestInput,
};

export const basic = () => (
  <AutosuggestInput
    suggestions={['Feature', 'Bug', 'Refactor']}
    onSelect={() => {}}
  />
);
