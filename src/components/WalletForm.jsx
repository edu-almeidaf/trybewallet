import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesThunk } from '../redux/actions/currencyAction';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  render() {
    const { currencies } = this.props;
    return (
      <div className="wallet-form">
        <form>
          <input
            type="number"
            data-testid="value-input"
            name="valueInput"
            placeholder="Digite o valor da despesa"
            // value={ valueInput }
          />

          <input
            type="text"
            data-testid="description-input"
            name="descriptionInput"
            placeholder="Descrição:"
            // value={ descriptionInput }
          />

          <label>
            Moeda:
            <select
              name="currency"
              data-testid="currency-input"
            >
              {
                currencies?.map((currency) => (
                  <option
                    value={ currency }
                    key={ currency }
                  >
                    { currency }
                  </option>
                ))
              }
            </select>
          </label>

          <label>
            Forma de Pagamento:
            <select
              name="methodInput"
              data-testid="method-input"
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao de credito">Cartão de crédito</option>
              <option value="cartao de debito">Cartão de débito</option>
            </select>
          </label>

          <label>
            Categoria:
            <select
              name="tagInput"
              data-testid="tag-input"
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
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
