import React from 'react';
import { render,screen  } from '@testing-library/react';

import { LocalitySearchBar } from "./locality-searchBar";

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})


it('render LocalitySearchBar', () => {
  render(<LocalitySearchBar />);
  expect(screen.getByTestId('search')).toBeInTheDocument();
});

