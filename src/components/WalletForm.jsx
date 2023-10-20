import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../redux/actions/currencyAction';
import {
  fetchExpenseThunk,
  saveEditedExpense,
  setAskToFalse,
  setDeleteToFalse,
} from '../redux/actions/expenseAction';

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

  componentDidUpdate() {
    const { askToEdit, askToDelete, idToEdit, expenses, dispatch } = this.props;
    if (askToEdit) {
      const task = expenses[idToEdit];
      const { value, description, currency, method, tag } = task;
      this.setState({
        value, description, currency, method, tag,
      });
      dispatch(setAskToFalse());
    }
    if (askToDelete) {
      this.setState({
        value: '',
        description: '',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
      });
      dispatch(setDeleteToFalse());
    }
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

  dispatchEditedExpense = (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, idToEdit } = this.props;

    dispatch(saveEditedExpense({ value, description, currency, method, tag }, idToEdit));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    return (
      <div className="wallet-form-container">
        <form className="wallet-form">
          <input
            type="number"
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
            onClick={ editor ? this.dispatchEditedExpense : this.handleClick }
          >
            { editor ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  askToEdit: PropTypes.bool.isRequired,
  askToDelete: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  askToEdit: wallet.askToEdit,
  idToEdit: wallet.idToEdit,
  editor: wallet.editor,
  expenses: wallet.expenses,
  askToDelete: wallet.askToDelete,
});

export default connect(mapStateToProps)(WalletForm);
