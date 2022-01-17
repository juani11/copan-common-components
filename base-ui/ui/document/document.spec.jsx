import React from 'react';
import { render,screen  } from '@testing-library/react';
// import userEvent from '@testing-library/user-event'

import { BasicDocument } from './document.composition';


Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})


it('render document', () => {
  render(<BasicDocument />);
  expect(screen.getByTestId('select')).toBeInTheDocument();
});

// it('should display the correct number of options', () => {
//   render(<BasicDocument />)
//   expect(screen.getAllByTestId('select-option').length).toBe(7)
// })



// it('should allow user to change document type', () => {
//   render(<BasicDocument />)
//   userEvent.selectOptions(
//     // Find the select element, like a real user would.
//     screen.getByTestId('select'),
//     // Find and select the Ireland option, like a real user would.
//     screen.getByTestId('select-option', { name: 'CUIT/CUIL' }),
//   )
//   expect(screen.getByTestId('select-option', { name: 'CUIT/CUIL' }).selected).toBe(true)
// })