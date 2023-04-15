import mockData from './mockData';

const expensesMock = {
  user: {
    email: '',
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
    expenses: [
      {
        value: '10',
        description: 'Almoço',
        currency: 'USD',
        method: 'dinheiro',
        tag: 'alimentacao',
        exchangeRates: mockData,
        id: 0,
      },
      {
        value: '20',
        description: 'Shopping',
        currency: 'USD',
        method: 'Cartão de crédito',
        tag: 'alimentacao',
        exchangeRates: mockData,
        id: 1,
      },
    ],
    editor: false,
    idToEdit: 0,
    askToEdit: false,
    askToDelete: false,
  },
};

export default expensesMock;
