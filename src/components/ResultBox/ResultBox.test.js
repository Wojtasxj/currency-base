import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
  const testCases = [
    { from: 'PLN', to: 'USD', amount: 100, expected: 'PLN 100.00 = $28.57' },
    { from: 'USD', to: 'PLN', amount: 50, expected: '$50.00 = PLN 175.00' },
    { from: 'PLN', to: 'USD', amount: 0, expected: 'PLN 0.00 = $0.00' },
    { from: 'USD', to: 'PLN', amount: 75.5, expected: '$75.50 = PLN 264.25' },
    { from: 'USD', to: 'USD', amount: 150, expected: '$150.00 = $150.00' },
    { from: 'PLN', to: 'USD', amount: -50, expected: 'Wrong value...' },
  ];

  testCases.forEach(({ from, to, amount, expected }, index) => {
    it(`should render proper info about conversion (${from} -> ${to}) with amount ${amount}`, () => {
      render(<ResultBox from={from} to={to} amount={amount} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(expected);
    });
  });
});