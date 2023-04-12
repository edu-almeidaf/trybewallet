import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions/expenseAction';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {
          expenses?.map((expense) => {
            const {
              id, description, tag, method, value, currency, exchangeRates,
            } = expense;
            const ask = Number(exchangeRates[currency].ask);
            const sumTask = Number(value) * ask;
            const { name } = exchangeRates[currency];
            return (
              <tbody key={ id }>
                <tr>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ name }</td>
                  <td>{ ask.toFixed(2) }</td>
                  <td>{ sumTask.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button>Editar</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClick(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })
        }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
