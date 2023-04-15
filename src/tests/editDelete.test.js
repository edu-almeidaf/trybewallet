import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import expensesMock from './mocks/expensesMock';
import mockData from './mocks/mockData';

describe('Testes das funções do botão "Editar"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockData),
    });
  });
  test('Verifica os botões "editar" e "excluir" estão na tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: expensesMock });
    const allDeleteBtn = screen.getAllByRole('button', { name: /excluir/i });
    expect(allDeleteBtn).toHaveLength(2);
    const allEditBtn = screen.getAllByRole('button', { name: /editar/i });
    expect(allEditBtn).toHaveLength(2);
  });

  test('Verifica se ao clicar no botão "editar", o botão "Adicionar despesa" passa a ser "Editar despesa"', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: expensesMock });

    expect(screen.getByRole('button', { name: /adicionar despesa/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /editar despesa/i })).not.toBeInTheDocument();

    const allEditBtn = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(allEditBtn[0]);

    expect(screen.getByRole('button', { name: /editar despesa/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /adicionar despesa/i })).not.toBeInTheDocument();
  });

  test('Verifica se ao editar uma despesa, seus dados são alterados', async () => {
    // const handleChange = jest.fn();
    renderWithRouterAndRedux(<Wallet />, { initialState: expensesMock });
    const allEditBtn = screen.getAllByRole('button', { name: /editar/i });
    userEvent.click(allEditBtn[0]);

    const valueInput = await screen.findByPlaceholderText(/digite o valor da despesa/i);
    const descriptionInput = await screen.findByPlaceholderText(/descrição/i);
    const editBtn = screen.getByRole('button', { name: /editar despesa/i });
    // const methodInput = screen.getByRole('combobox', { name: /forma de pagamento:/i });
    // fireEvent.change(methodInput, { target: { value: 'Cartão de dédito' } });
    userEvent.clear(valueInput);
    userEvent.type(valueInput, '30');
    userEvent.clear(descriptionInput);
    userEvent.type(descriptionInput, 'Gasolina');
    userEvent.click(editBtn);

    expect(screen.queryByRole('cell', { name: /almoço/i })).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /gasolina/i })).toBeInTheDocument();
    // expect(screen.getByRole('cell', { name: /cartão de débito/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /30\.00/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /47\.53/i })).not.toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /95\.06/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /142\.59/i })).toBeInTheDocument();
    expect((screen.getByTestId('total-field')).innerHTML).toBe('237.65');
  });
});

describe('Testes das funções do botão "Excluir"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockData),
    });
  });
  test('Verifica ao clicar no botão "Excluir", o gasto é retirado da tela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: expensesMock });
    expect(screen.getByRole('cell', { name: /almoço/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /shopping/i })).toBeInTheDocument();

    const deleteBtn = screen.getAllByRole('button', { name: /excluir/i });
    userEvent.click(deleteBtn[0]);

    expect(screen.getByRole('cell', { name: /shopping/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /almoço/i })).not.toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão "editar", o botão "Adicionar despesa" passa a ser "Editar despesa"', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: expensesMock });
  });
});
