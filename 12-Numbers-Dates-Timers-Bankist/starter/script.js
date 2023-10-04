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

const message = document.querySelector('.message');
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

  const interest = acc.movements
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

// in JavaScript all number will present internally as a floting point numbers

console.log(23 === 23.0); //it will return true

// numbers are reprensinted internally in a 64 base 2 format aslo know as binary fromat (0 and 1).in binary fromat ti is very hard to represent some fractions that are very easy to reprensent in base 10 system(base 10 basically the numbers from 0 to 9)

console.log(7 / 10 + 1 / 10);

// working with numbers

console.log(Number('23'));
console.log(+'23'); // we can use + operator to convert string to number.+ operator do type coercion it will convert all operand to numbers

//Parsing an number

console.log(Number.parseInt('30px', 10)); //string must starts with number to parse an string
console.log(Number.parseInt('e20')); //it does not work string must start with and number to parse.

// parseInt method accept second argument which is so called regex

// regex:it is a base of numeral systembthat we are using (base 2 or 64 base 10)

// we can also parse an floating point number using parseFloat();

console.log(Number.parseFloat('2.5em'));
// the parseInt nad parseFloat() functions are so called gobal functions we use these functions without Number function or object(functions are also a object)

// here Number provide some thing called namepace in this namepace we have this functions to operate.

// Another function of Number namepace

// isNaN() :is Not a Number

console.log(Number.isNaN(23));
console.log(Number.isNaN('23'));

console.log(Number.isNaN(+'23px')); //true it returns NaN
console.log(Number.isNaN(23 / 0));

// better method to check for a number

// isFinite()
// we use this method mainly for floating point numbers
console.log(Number.isFinite(23 / 0)); //false
console.log(Number.isFinite(23)); //true

// when we need to check for only an integer

// we use isInteger()

console.log(Number.isInteger(23));

//  Math function and Rounding Numbers

console.log(Math.sqrt(25));

//we also do this

console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// max and min values

console.log(Math.max(1, 2, 3, 45, 6)); //returns 45
console.log(Math.max(1, '67', 7, 8)); //it returns 67 because it performs type corecion but it doesnt perform parsing
console.log(Math.max(1, '67px', 7, 8)); //it returns NaN

console.log(Math.min(1, 2, 3, 45, 6));

// In Math namepace we also have constant some thing like pi values

console.log(Math.PI * Number.parseFloat('100px')); //it returns exact pi value // pi value x 10

// random()

console.log(Math.trunc(Math.random() * 6) + 1); //it generate random number from 1 to 6 at each time

// to generate random numbers between two number

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};
console.log(randomNum(10, 20));

//Rounding Integers
console.log(Math.trunc(23.4));
console.log(Math.ceil(23.9));
console.log(Math.floor(23.4));
console.log(Math.round(23.8));

console.log(Math.trunc(-23.6)); // it supposed to be -24 but it returns -23
console.log(Math.floor(-23.6)); //it better to use floor to avoid unneccessery  bugs because that wired behaviour of trunc when it comes to negative integers

// Rounding Floating number

console.log(+(2.6).toFixed(2)); // we can config decimal point with this method .
//here something called boxing is happend because on primitive types we cant use methods

// i want to learn abot boxing later

// Reminder operator (%)

// practice later(i have good understand in it so).i want to play with some for futhure.

// Numeric separators

//es6 introduced numeric sparators to make our code more understandable to other programmers

// like reading price using thousand separators

// we can use underscore to specifie a thousand separater.it doesnot effect the value at all but it does not work on string itself

const price = 24_000_000; //it is some what readable like 24 millions like that

// NOT  works on string

console.log(parseInt('24_000_000 ')); //it returns 24
