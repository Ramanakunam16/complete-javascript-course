'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovments = function (movements, sort = false) {
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  containerMovements.innerHTML = '';
  movs.forEach((mov, i) => {
    const movType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>
  
    <div class="movements__value">${mov}€</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//  Computing Usernames

const createUsername = accs => {
  // console.log(accs);
  accs.forEach(acc => {
    //forEach is used to make side effect withot returning anything and the side effect are manupulating the objects or iterables 0r anything
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsername(accounts);
// console.log(account2);

const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);

  console.log(acc.balance);

  labelBalance.textContent = `${acc.balance}$`;
};
// console.log(containerMovements.innerHTML);

// totalDesposites

const calcDisplaySummary = acc => {
  const totalDeposites = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const totalWithdrawls = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposite => (deposite * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => {
      return acc + mov;
    }, 0);

  // console.log(interest);

  labelSumIn.textContent = `${totalDeposites}$`;
  labelSumOut.textContent = `${Math.abs(totalWithdrawls)}$`;
  labelSumInterest.textContent = `${interest}$`;
};

const updateUI = function () {
  //displaymovements
  displayMovments(currentAccount.movements);

  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
};

// LOGIN
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  // console.log('clicked');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  const userPin = +inputLoginPin.value;

  if (currentAccount?.pin === userPin) {
    console.log('logged in');
    // display UI and message

    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    message.classList.add('hidden');
    message.textContent = '';
    containerApp.style.opacity = 100;

    // clear input fields

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    // //displaymovements
    // displayMovments(currentAccount.movements);

    // // display balance
    // calcDisplayBalance(currentAccount.movements);
    // // display summary
    // calcDisplaySummary(currentAccount.movements);

    // updateUI

    updateUI();
  } else {
    containerApp.style.opacity = 0;
    message.classList.remove('hidden');
    message.textContent = 'invalid login!';
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();
    console.log('invalid');
  }
  // console.log(userPin);
  // console.log(currentAccount);
});
// console.log(currentAccount);

// TRANSFER Amount

btnTransfer.addEventListener('click', e => {
  e.preventDefault();

  const amount = +inputTransferAmount.value;

  const transferAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    transferAccount.username !== currentAccount.username
  ) {
    transferAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
    // console.log(amount);
    // console.log(transferAccount);

    updateUI();
  }

  inputTransferAmount.value = inputTransferTo.value = '';
});

// Closing an Acount anf findindex() method

// findindex() method return a index of specified condition given on array

btnClose.addEventListener('click', e => {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    console.log('ddelete');
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = '';
  }
});
// console.log(accounts);

// LOAN Amount

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  message.classList.remove('hidden');
  message.textContent = '';
  message.style.padding = '';

  const loanAmount = +inputLoanAmount.value;

  console.log(loanAmount);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => mov >= loanAmount / 10)
  ) {
    currentAccount.movements.push(loanAmount);

    updateUI();
  } else {
    message.classList.remove('hidden');
    message.textContent =
      'your are not allowed to get a loan.Please kindly check you have desposit 10% of loan amount!';
    message.style.padding = ' 0 10%';
  }

  inputLoanAmount.value = '';
  // const de
  // if()
});

// sorting movements
let isSort = true;
btnSort.addEventListener('click', e => {
  e.preventDefault();

  if (isSort) {
    displayMovments(currentAccount.movements, true);
    isSort = false;
  } else {
    displayMovments(currentAccount.movements, false);
    isSort = true;
  }
}); ///////////
/////////////////////////////////////////////////
// LECTURES

//Converting checking numbers
