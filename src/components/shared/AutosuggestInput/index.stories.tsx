import React from 'react';

import AutosuggestInput from '.';

export default { title: 'AutosuggestInput' };

export const basic = () => (
  <AutosuggestInput
    suggestions={['Feature', 'Bug', 'Refactor']}
    onSelect={() => {}}
  />
);
