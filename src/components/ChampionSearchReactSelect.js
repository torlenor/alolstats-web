import React, { Fragment } from 'react';

import Select from 'react-select';

function ChampionSearch(props) {
  const state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

    const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const selectStyles = {
    input: base => ({
      ...base,
      minWidth: 200,
      color: 'black',
      '& input': {
        font: 'inherit',
      },
    }),
  };

    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = state;

    return (
      <Fragment>
        <Select
          styles={selectStyles}
          isDisabled={isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="Champion Search"
          placeholder="Search..."
          options={options}
        />
      </Fragment>
    );
}

export default ChampionSearch;