'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// More on arrays

//array method

// Arrays have methods that we can call on object because methods are simple functions which attached to object

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr);

// slice method
// with slice method we can extract a part of array without changing original array

// console.log(arr.slice(2)); //it wiil slice from index 2 to end point of arraay
// console.log(arr.slice(2, 4)); //we can also provide end parameter .The end parameter index will not take it will take 2,3 iindexes

// console.log(arr.slice(-2)); //from end of an array.indexing from end of the array start from -1.....(-infinite)
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); //with empty parameter it return total original array

//we can use slice method is when we want to chain multiple methods together

// SPLICE ,it similar to slice but it changes an original array,The selected part will be deleted from an array

// console.log(arr.splice(2)); //this  delete all the elemenrs from 2 position

//we use splice when we need to delete last element of array

// console.log(arr.splice(-1)); //it delete last element of an array

// arr.splice(2, 2); //the forst parameter idicates starting point and the next parameter indicates deletecount no of element we want ot ddelete
// console.log(arr);

// //Reverse

// const arr2 = [1, 2, 3, 4, 5];
// console.log(arr2);
// console.log(arr2.reverse());
// console.log(arr2); //the arr2 will mutate an array that means changes original array when we use res=verse method

// Concat

// it concat two arrays

// const lettersAndNumbers = arr.concat(arr2);
// // we can do this using spread operater
// console.log(lettersAndNumbers);
// console.log(arr);
// console.log(arr2);

// // Join

// console.log(lettersAndNumbers.join('-')); //it returns an string with "-" as sparater

// The new "at" Methiod

// const arr = [1, 2, 3];
// console.log(arr(0));

// // we also get elemenrs from an array using 'at' method

// console.log(arr.at(0));
// console.log(arr.at(-1));

// // 'at' works on strings also

// console.log('ramana'.at(1));

// Most "at" is used for method chhaining also which connect multiple methods at a time.

// Lopping Arrays -forEach()

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const movementEntries = movements.entries();
// console.log(movementEntries);
// console.log('------for-of loop-------');

// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Movement ${i + 1}: you deposited ${movement}`);
//   } else {
//     console.log(` Movement${i + 1}: you withdrawls ${Math.abs(movement)}`);
//   }
// }

// console.log('------forEach loop------');

// movements.forEach((movement, index, array) => {
//   if (movement > 0) {
//     console.log(`Movement ${index + 1}: you deposited ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1}:you withdrawls ${Math.abs(movement)}`);
//   }
// });

// Map method

// map method is used to create a new array based on original  by giving function to return an value which place on new array

// const eurToUsd = 1.1;

// const movementsUsd = movements.map((mov, i, arr) => {
//   return mov * eurToUsd;
// });

// console.log(movementsUsd);

// // we can also do same thing with for-of loop

// let movementsUsd1 = [];

// for (let mov of movements) {
//   let usd = mov * eurToUsd;
//   movementsUsd1.push(usd);
// }

// console.log(movementsUsd1);

// const movementsUsdDescription = movements.map((mov, i) => {
//   // map call this callback
//   if (mov > 0) {
//     return `Movement ${i + 1}: you ${
//       mov > 0 ? 'deposited' : 'withrawls'
//     } ${mov}`;
//   }
// });
// console.log(movementsUsdDescription);

// //Filter method

// const deposites = movements.filter(mov => {
//   return mov > 0;
// });
// console.log(deposites);

// const withdrawls = movements.filter(mov => mov < 0);

// console.log(withdrawls);

// //  usig for-of

// let depositesFor = [];
// let withdrawlsFor = [];

// for (let mov of movements) {
//   if (mov > 0) {
//     depositesFor.push(mov);
//   } else {
//     withdrawlsFor.push(mov);
//   }
// }
// console.log(depositesFor);
// console.log(withdrawlsFor);

// // Reduce method

// const totalBalnace = movements.reduce((acc, mov) => {
//   return acc + mov;
// }, 0); //initial value of accumulater (acc)

// console.log(totalBalnace);

// // const totalDeposites = movements
// //   .filter(mov => mov > 0)
// //   .reduce((acc, mov) => {
// //     return acc + mov;
// //   }, 0);

// // console.log(totalDeposites);

// // Maxiam value

// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) {
//     return acc;
//   } else {
//     return mov;
//   }
// }, movements[0]);
// console.log(max);

// // Find method

// // we use find to retrive  starting element of an array  based on given condition or which statisfy given condition.

// // find method only return a value /it does not create an new array like other methods we learn in this section.

// const e = movements.find(mov => {
//   return mov > 30 && mov === 200;
// });
// console.log(e);

// const account = accounts.find(acc => acc.username === 'js');
// console.log(account);

// let accountFor;

// for (let acc of accounts) {
//   console.log(acc);

//   if (acc.username === 'js') {
//     console.log();
//     accountFor = { ...acc };
//   }
// }
// console.log(typeof accountFor);

// some and every methods
// console.log(movements);
// // equality
// console.log(movements.includes(3000));

// // in includes we give and element of array and check its have that element and returns true or false

// // but using some every methods we specifie a condition and check for and element .it dit not available in includes method

// // SOME: condition
// console.log(movements.some(mov => mov === 3000)); //it check for a value >o in a array if it have it returns truw ir rteurens false

// // check if any deposite happend in the account

// const anyDeposites = movements.some(mov => mov > 0);
// console.log(anyDeposites);

// // EVERY : it used to check every element in the array is true or false  for qa specified condition

// console.log(movements.every(mov => mov > 0));

// console.log(account4.movements.every(mov => mov > 0));

// // flat and flatmap

// // flat : is a method  used to mutate an array which have nested arrays into a single array [1,2,3,4,6] like this.

// const arr = [1, [[0, [2]], 3], 4, [5, 6], 7];

// //by default flat() works on only first level that means firt level of nested arrays. we flat more deep we can pass a depth level in to flat()
// console.log(arr.flat(3)); //default depth is 1

// // flatmap : we can create a new array using flatmap() at the same we can flat the an array we can only flat an arryay at first level unlike flat()

// // const allmovements = accounts.flatMap(acc => acc.movements);
// const overallBalance = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(overallBalance);

// //sorting arrays

// // sorting strings
// // it sorts in alphabetic order
// const owners = ['ramana', 'ashmy', 'gayatri', 'mounica', 'naidu', 'chinna'];

// console.log(owners.sort()); //its muates the original array

// // sorting numbers
// console.log(movements);
// console.log(movements.sort()); //the numbers are nor at all make sence[-130, -400, -650, 1300, 200, 3000, 450, 70] it is not what we expected.""
// // the sort() defaultly coverts every thing it encounter to an string and sort based on it .

// // fixing that problem

// // returns < 0: a,b "keep order"
// // // returns> 0:b,a "switch order"

// // ascending order

// // console.log(
// //   movements.sort((a, b) => {
// //     // a:200 >b:450 ==flase
// //     if (a > b) {
// //       //next a:450 >b:-400==true
// //       return 1; // returns b,a switches the positions of a, b
// //     }

// //     if (a < b) {
// //       // a:200 <b:450 == true
// //       return -1; //returns a,b  the positions of a and b will not changes
// //     }
// //   })
// // );

// movements.sort((a, b) => a - b);
// console.log(movements);

// // descending order
// // console.log(
// //   movements.sort((a, b) => {
// //     // a:200 >b:450 ==flase
// //     if (a > b) {
// //       //next a:450 >b:-400==true
// //       return -1; //returns a,b  the positions of a and b will not changes
// //     }

// //     if (a < b) {
// //       // a:200 <b:450 == true
// //       return 1; // returns b,a switches the positions of a, b
// //     }
// //   })
// // );

// movements.sort((a, b) => b - a);
// console.log(movements);

// creating array programatically and filling arrays

// using Array() function we can create array programatically

const arr = new Array(1, 23, 4, 5);

console.log(arr);
const arr1 = new Array(7); //it doesnt create an array with single 7 element instead it create an empty array with length :7

console.log(arr1); // we cannt do any thing with this empty array.There is only one array we can use is fill() method.

// arr1.fill(1); //similer to slice() method //it mutate an underlying array
console.log(arr1); // it can create an array which contains all 1's with length :7

arr1.fill(2, 0, 7); //first parameter is an element and next will starting and end index  to place the element between.

// we can also use fill() on exiting arra
console.log(arr1);

// createing array programaticallly using Array.from()

const arr2 = Array.from({ length: 9 }, (_, i) => i + 1);

console.log(arr2);

const arr3 = Array.from({ length: 100 }, dice => {
  return Math.trunc(Math.random() * 6) + 1;
});
console.log(arr3);

// const dice = Math.trunc(Math.random() * 6) + 1;
// const arr4 = [dice];
// console.log(arr4);

// we  use use this Array,from() to create an array of array like array i.e Nodelists(when we use document.querySelector() it creates an array like strututre )

labelBalance.addEventListener('click', () => {
  const movementsValues = Array.from(
    document.querySelectorAll('.movements__value'),
    el => parseInt(el.textContent)
  );

  console.log(movementsValues);
});
