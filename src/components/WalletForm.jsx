import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../redux/actions/currencyAction';
import { fetchExpenseThunk } from '../redux/actions/expenseAction';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentacao',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;

    dispatch(fetchExpenseThunk({ value, description, currency, method, tag }));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div className="wallet-form">
        <form>
          <input
            type="text"
            data-testid="value-input"
            name="value"
            placeholder="Digite o valor da despesa"
            value={ value }
            onChange={ this.handleChange }
          />

          <input
            type="text"
            data-testid="description-input"
            name="description"
            placeholder="Descrição:"
            value={ description }
            onChange={ this.handleChange }
          />

          <label>
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies?.map((moeda) => (
                  <option
                    value={ moeda }
                    key={ moeda }
                  >
                    { moeda }
                  </option>
                ))
              }
            </select>
          </label>

          <label>
            Forma de Pagamento:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label>
            Categoria:
            <select
              name="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
