import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const amount = Number(exchangeRates[currency].ask) * Number(value);
      return acc + amount;
    }, 0);
  };

  render() {
    const { email } = this.props;
    return (
      <header>
        <h1 data-testid="email-field">{ email }</h1>
        <p>
          Despesa total:
          {' '}
          <span data-testid="total-field">{ this.sumExpenses().toFixed(2) }</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default connect(mapStateToProps)(Header);
