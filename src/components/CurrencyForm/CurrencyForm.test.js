import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
    afterEach(cleanup);
    it('should render without crashing', () => {
        render(<CurrencyForm action={() => {}} />);
    });

    it('should run action callback with proper data on form submit', () => {
        const action = jest.fn();
      
        render(<CurrencyForm action={action} />);     
        
        const submitButton = screen.getByText('Convert');
      
        const testCases = [
            { amount: '100', from: 'PLN', to: 'USD' },
            { amount: '20', from: 'USD', to: 'PLN' },
            { amount: '200', from: 'PLN', to: 'USD' },
            { amount: '345', from: 'USD', to: 'PLN' },
        ];
          
        for(const testObj of testCases) {
                      
            
            // Znajdowanie elementów formularza i ustawianie wartości
            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');
            
            fireEvent.change(amountField, { target: { value: testObj.amount } });
            fireEvent.change(fromField, { target: { value: testObj.from } });
            fireEvent.change(toField, { target: { value: testObj.to } });
            
            // Symulowanie kliknięcia przycisku "Convert"
            userEvent.click(submitButton);
            
            // Oczekiwanie na wywołanie akcji z poprawnymi danymi
            expect(action).toHaveBeenCalledWith({
                amount: parseFloat(testObj.amount),
                from: testObj.from,
                to: testObj.to,
            });
            
        }
    });
});

