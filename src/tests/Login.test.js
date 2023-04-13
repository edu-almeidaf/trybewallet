import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testes da página login', () => {
  const emailEx = 'teste@teste.com';
  test('Verifica se a tela de login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/senha/i);
    expect(passwordInput).toBeInTheDocument();

    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    expect(btnLogin).toBeInTheDocument();
  });

  test('Verifica o botão de login é habilitado somente após o email e a senha estatem no formato certo', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();

    userEvent.type(emailInput, emailEx);
    userEvent.type(passwordInput, '123456');
    expect(screen.getByRole('button', { name: /entrar/i })).not.toBeDisabled();
  });

  test('Verifica o botão de login é desabilitado quando o email está errado', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    userEvent.type(emailInput, 'testeteste.com');
    userEvent.type(passwordInput, '123456');
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  test('Verifica o botão de login é desabilitado quando a senha tem menos de 6 caracteres', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '12345');
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  test('Verifica se após clicar no botão, rota da página é mudada e o email aparece na tela', () => {
    const navigator = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, emailEx);
    userEvent.type(passwordInput, '123456');
    userEvent.click(btnLogin);

    const { history: { location } } = navigator;
    expect(location.pathname).toBe('/carteira');
    const headingEl = screen.getByRole('heading', { level: 1 });
    expect(headingEl.innerHTML).toContain(emailEx);
  });
});
