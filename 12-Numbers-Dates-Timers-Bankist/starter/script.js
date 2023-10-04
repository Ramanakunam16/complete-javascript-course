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
    '2022-11-18T21:31:17.178Z',
    '2022-12-23T07:42:02.383Z',
    '2023-01-28T09:15:04.904Z',
    '2023-04-01T10:17:24.185Z',
    '2023-09-29T14:11:59.604Z',
    '2023-10-01T17:01:17.194Z',
    '2023-10-01T23:36:17.929Z',
    '2023-10-03T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN', // de-DE
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

const formatMovements = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  console.log(new Date().toISOString());
  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovments = function (acc, sort = false) {
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  containerMovements.innerHTML = '';

  movs.forEach((mov, i) => {
    const date = new Date(acc.movementsDates[i]);

    const displaydate = formatMovements(date, acc.locale);

    // console.log(date);

    // labelDate.textContent = `${}`;
    const movType = mov > 0 ? 'deposit' : 'withdrawal';

    // const formattedMov = new Intl.NumberFormat(acc.locale, {
    //   style: 'currency',
    //   currency: acc.currency,
    // }).format(mov);

    const formattedMov = formatCurrency(mov, acc.local, acc.currency);

    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${movType}">${
      i + 1
    } ${movType}</div>

    <div class="movements__date">${displaydate}</div>
  
    <div class="movements__value">${formattedMov}</div>
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
  const formatBalance = formatCurrency(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = `${formatBalance}`;
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

  labelSumIn.textContent = formatCurrency(
    totalDeposites,
    acc.locale,
    acc.currency
  );
  labelSumOut.textContent = formatCurrency(
    Math.abs(totalWithdrawls),
    acc.locale,
    acc.currency
  );
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

const updateUI = function () {
  //displaymovements
  displayMovments(currentAccount);

  // display balance
  calcDisplayBalance(currentAccount);
  // display summary
  calcDisplaySummary(currentAccount);
};

const startLogoutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // const sec =
    // in each call,print the remaining tom to ui

    labelTimer.textContent = `${min}:${sec}`;

    // when 0 secs stop timer and logout  users
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'login to get started';
      containerApp.style.opacity = 0;
    }
    time--;
  };
  // set timer to 5mins
  let time = 120;
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};
// LOGIN
let currentAccount, timer;

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
    //current date
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();

    // const hours = `${now.getHours()}`.padStart(2, 0);

    // const min = `${now.getMinutes()}`.padStart(2, 0);
    //Using internatinalizer API

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

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
    console.log(timer);
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogoutTimer();
    console.log(timer);
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
    const date = new Date();
    currentAccount.movementsDates.push(date.toISOString());
    transferAccount.movementsDates.push(date.toISOString());
    // console.log(amount);
    // console.log(transferAccount);
    // const date
    updateUI();

    // reset timer

    clearInterval(timer);
    timer = startLogoutTimer();
  }

  inputTransferAmount.value = inputTransferTo.value = '';
});

// Closing an Acount anf findindex() methodf

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
    const date = new Date();
    currentAccount.movementsDates.push(date.toISOString());

    updateUI();

    // reset timer

    clearInterval(timer);
    timer = startLogoutTimer();
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

// console.log(23 === 23.0); //it will return true

// // numbers are reprensinted internally in a 64 base 2 format aslo know as binary fromat (0 and 1).in binary fromat ti is very hard to represent some fractions that are very easy to reprensent in base 10 system(base 10 basically the numbers from 0 to 9)

// console.log(7 / 10 + 1 / 10);

// // working with numbers

// console.log(Number('23'));
// console.log(+'23'); // we can use + operator to convert string to number.+ operator do type coercion it will convert all operand to numbers

// //Parsing an number

// console.log(Number.parseInt('30px', 10)); //string must starts with number to parse an string
// console.log(Number.parseInt('e20')); //it does not work string must start with and number to parse.

// // parseInt method accept second argument which is so called regex

// // regex:it is a base of numeral systembthat we are using (base 2 or 64 base 10)

// // we can also parse an floating point number using parseFloat();

// console.log(Number.parseFloat('2.5em'));
// // the parseInt nad parseFloat() functions are so called gobal functions we use these functions without Number function or object(functions are also a object)

// // here Number provide some thing called namepace in this namepace we have this functions to operate.

// // Another function of Number namepace

// // isNaN() :is Not a Number

// console.log(Number.isNaN(23));
// console.log(Number.isNaN('23'));

// console.log(Number.isNaN(+'23px')); //true it returns NaN
// console.log(Number.isNaN(23 / 0));

// // better method to check for a number

// // isFinite()
// // we use this method mainly for floating point numbers
// console.log(Number.isFinite(23 / 0)); //false
// console.log(Number.isFinite(23)); //true

// // when we need to check for only an integer

// // we use isInteger()

// console.log(Number.isInteger(23));

// //  Math function and Rounding Numbers

// console.log(Math.sqrt(25));

// //we also do this

// console.log(25 ** (1 / 2));
// console.log(8 ** (1 / 3));

// // max and min values

// console.log(Math.max(1, 2, 3, 45, 6)); //returns 45
// console.log(Math.max(1, '67', 7, 8)); //it returns 67 because it performs type corecion but it doesnt perform parsing
// console.log(Math.max(1, '67px', 7, 8)); //it returns NaN

// console.log(Math.min(1, 2, 3, 45, 6));

// // In Math namepace we also have constant some thing like pi values

// console.log(Math.PI * Number.parseFloat('100px')); //it returns exact pi value // pi value x 10

// // random()

// console.log(Math.trunc(Math.random() * 6) + 1); //it generate random number from 1 to 6 at each time

// // to generate random numbers between two number

// const randomNum = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + 1) + min;
// };
// console.log(randomNum(10, 20));

// //Rounding Integers
// console.log(Math.trunc(23.4));
// console.log(Math.ceil(23.9));
// console.log(Math.floor(23.4));
// console.log(Math.round(23.8));

// console.log(Math.trunc(-23.6)); // it supposed to be -24 but it returns -23
// console.log(Math.floor(-23.6)); //it better to use floor to avoid unneccessery  bugs because that wired behaviour of trunc when it comes to negative integers

// // Rounding Floating number

// console.log(+(2.6).toFixed(2)); // we can config decimal point with this method .
// //here something cagetFullYear()lled boxing is happend because on primitive types we cant use methods

// // i want to learn abot boxing later

// // Reminder operator (%)

// // practice later(i have good understand in it so).i want to play with some for futhure.

// // Numeric separators

// //es6 introduced numeric sparators to make our code more understandable to other programmers

// // like reading price using thousand separators

// // we can use underscore to specifie a thousand separater.it doesnot effect the value at all but it does not work on string itself

// const price = 24_000_000; //it is some what readable like 24 millions like that

// // NOT  works on string

// console.log(parseInt('24_000_000 ')); //it returns 24

// //BigInt : is one of special type of primitive data types

// // it was introduced in es6 2020
// // we know that in js numbers are internally represented as 64 bits.that means there are exactly 64 1's or 0's to represent anhy given number.

// // in this 64 bits only 53 bits used to store and numberor digits and the rest of position are of the decimal points and the sign ("-"like that)
// //we can observe from this there is limit store an digits.

// console.log(2 ** 53 - 1); // it is the biggest number js can store.
// console.log(Number.MAX_SAFE_INTEGER); // returns same as above which biggets number that js can store
// // bigger that this number it cannt represent accurately.so we use bigint

// console.log(2 ** 53 + 3);

// console.log(5553445456789876543223456789n); // it can display an accurate number correctly

// // we can also use BigInt function

// console.log(BigInt(5553445456789876543223456789));
// //we can observe that it not same as above number because js will first to represent internally,before it can then transform into BigInt

// // operatins

// console.log(10000n + 10000n);

// console.log(3333333333333333333333333333n * 10000000n);

// //we cant mix bigint with regular number

// const huge = 23023943039496677366776n;

// const num = 10;
// // console.log(BigInt(num));

// console.log(huge * BigInt(num)); //we can also use bigint in small numbers

// console.log(24n > 15); //it works

// console.log(20n === 20); //returns false

// console.log(typeof 20n);

// //exceptions
// console.log(20n == 20); // it wiil return true because js do type corecion

// console.log(20n == '20'); //it true it does type corecion

// console.log(huge + ' is veery big!'); // it we convert the hige number to string

// console.log(10n / 3n); //it returns closest bigint cutof the decimal part
// console.log(10 / 3); //it will return an 3,33 until infinity

// //Creating Dates

// //there araea exactly4 waYS TO CREATE DATES

// //1
// const now = new Date();
// console.log(now);

// //2 parse from a date string

// console.log(new Date('Wed Oct 04 2023 19:40:1'));

// //we write a string what we want.
// //it not a good partice because it unreliable

// console.log(new Date(account1.movementsDates[0]));

// // we can also pass year,date,month,hours,mins,secs to Date() constructor

// console.log(new Date(2024, 5, 16, 12, 0, 0)); // months are 0 based starts from 0

// console.log(new Date(2024, 5, 32)); //it will also auto correct the date june as only 30 days it return july 02 the next month

// //we can also generate the date based on unix time i.e jan 1 1970

// console.log(new Date(0)); // 0 millisecs after unix time or unix time itself

// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // it will rturns 3 days after unix time

// //working with dates

// const future = new Date(2024, 5, 16, 12, 0, 0);

// console.log(future);

// console.log(future.getFullYear()); //it returns year

// console.log(future.getMonth()); // IT returns month

// console.log(future.getDate()); // date

// console.log(future.getDay()); //it will return day of a week not day of month
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());

// //we can also get timestamp of a date

// console.log(future.getTime()); //timestamp is an milliseconds

// // reveerse timestamp

// console.log(new Date(1718519400000)); // it will return an string

// // we get current date timestamp

// console.log(Date.now());

// //  we can also mutate the date

// future.setFullYear(2025);
// console.log(future); // it changes year 2024 to 2025.it will automatically correct day.

// OPERATINS ON DATES

// const future = new Date(2024, 5, 16, 12, 0, 0);

// console.log(+future);

// //calculating how days passed between two dates

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// console.log(calcDaysPassed(new Date(2023, 8, 1), new Date(2023, 9, 1)));

// // internatonalizing dates

// const local = navigator.language;
// console.log(local);

// //internatonalizing Numbers

// const num = 34345454.45;
// const options = {
//   style: 'currency',
//   currency: 'INR',
// };

// console.log(new Intl.NumberFormat('en-IN', options).format(num)); // it will returns a number with a comma "," dividers like 3,43,45,454
// console.log(new Intl.NumberFormat(navigator.language, options).format(num)); // "en-US"

// // setTimeout

// const hello = setTimeout(
//   name => console.log(`hello elaunnaru ${name} `),
//   4000,
//   'ramana'
// );

// // when exection this callback funtion here is registed to call later and exection process continous as usally

// console.log('hello..........'); // it exected first and after 4 sec setTimeout will be exectuted.this process define async f

// // we can sto time before exection the function parameter of setTimeout
// if (1 % 2 !== 0) clearTimeout(hello);

// //when we want execute a function over an over again wee use setIntervel()

// // setIntervel

// const time = setInterval(() => console.log(new Date()), 1000); // its runs for each second
