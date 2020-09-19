import React from 'react';

import AddTagsWithAutocomplete from '.';

export default { title: 'Add Tags With Autocomplete' };

export const normal = () => (
  <AddTagsWithAutocomplete
    options={['Feature', 'Bug', 'Refactor']}
    onSelect={() => {}}
  />
);
