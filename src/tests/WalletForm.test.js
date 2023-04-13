import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import initialStateMock from './mocks/initialStateMock';
import mockData from './mocks/mockData';

describe('Testes da página Wallet', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockData),
    });
  });
  test('Verifica se o componente possui uma option com o valor USD', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });
    const currencyOptions = screen.getByRole('combobox', { name: /moeda:/i });
    expect(currencyOptions).toHaveValue('USD');
  });

  test('Verifica se ao clicar no botão "Adicionar despesa", uma despesa é adicionada', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: initialStateMock });
    const valueInput = screen.getByPlaceholderText(/digite o valor da despesa/i);
    const descriptionInput = screen.getByPlaceholderText(/descrição/i);
    const addCurrenceBtn = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Almoço');
    userEvent.click(addCurrenceBtn);

    expect(await screen.findByRole('cell', { name: /almoço/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /10\.00/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /4\.75/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /47\.53/i })).toBeInTheDocument();
    expect((await screen.findByTestId('total-field')).innerHTML).toBe('47.53');
  });
});
