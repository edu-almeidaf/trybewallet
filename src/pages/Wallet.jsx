import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <section className="wallet-container">
        <Header />
        <WalletForm />
        <Table />
      </section>
    );
  }
}

export default Wallet;
