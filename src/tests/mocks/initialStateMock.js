const initialStateMock = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [],
    editor: false,
    askToEdit: false,
    idToEdit: 0,
    askToDelete: false,
  },
};

export default initialStateMock;
