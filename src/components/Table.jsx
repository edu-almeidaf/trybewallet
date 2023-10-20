import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editExpense } from '../redux/actions/expenseAction';

class Table extends Component {
  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  dispatchExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr className="table-header">
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
          </thead>
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
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this.handleClick(id) }
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        onClick={ () => this.dispatchExpense(id) }
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })
          }
        </table>
        { expenses.length === 0 && <div>Nenhuma tarefa adicionada</div>}
      </>
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
