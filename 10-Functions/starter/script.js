'use strict';

// const bookings = [];

// const createBooking = function (flightNum, numPassengers = 1, price) {
//   // js specify parameters in an order so when we want t0 use the parameter value we can only when that parameter is before we use.
//   // we can assign an expression as well like caculations
//   // es5
//   //   numPassengers = numPassengers || 1;
//   //   price = price | 399;

//   const booking = {
//     flightNum,
//     numPassengers,
//     price,
//   };
//   console.log(booking);
//   bookings.push(booking);
// };
// createBooking('LH123', undefined, 10);
// //when we cal finction we cant skip the arguments
// // createBooking("LH123",1000) its wrong we cant do that.we write another way by simple write 'undefined or null'.this  is a normal way to skip the default parameters

// const flight = 'LH123';

// const ramana = {
//   name: 'ramana kunam',
//   passport: 223556543467,
// };

// const checkIn = function (flightNum, passenger) {
//   flightNum = 'LH657';
//   passenger.name = 'mr.' + passenger.name;

//   if (passenger.passport === 223556543467) {
//     alert('Checked in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, ramana);

// console.log(flight);
// console.log(ramana);
// // when we pass an variable as argument  we just copying the value of variable in to parameter not the original value.
// // here we notice that the primitive type variable fligth did not change the value even through we overwrite the value inside the fuction .because we only copying the flight value into flightNum

// // But in case of object we just copying reference address it pointing to same object so it changes when we change inside the function

// // In javascript functions are simple objects like another objects

// const passport = function (person) {
//   person.passport = Math.trunc(Math.random() * 10000000000);
//   console.log(person.passport);
// };
// passport(ramana);
// checkIn(flight, ramana);

// Function Accepting Callback Functions

// const oneWord = function (str) {
//   return str.replace(/ /g, '-').toLowerCase();
// };

// const upperFirstWord = function (str) {
//   const [first, ...others] = str.split(' ');
//   console.log(first[0]);
//   return [first[0].toUpperCase() + first.slice(1), ...others].join(' ');
// };

// // HIgher-order function
// const transformer = function (str, fn) {
//   console.log(`original string: ${str}`);
//   console.log(`transformed string: ${fn(str)}`);

//   console.log(`Transformed by:${fn.name}`); // we use name propertry to retrive function name
// };

// transformer('js is the best', upperFirstWord);
// transformer('js is the best', oneWord);

// // js uses callback all that time for example when we use loops
// const high5 = function () {
//   console.log('high5');
// };

// document.body.addEventListener('click', high5);

// ['ramana', 'ashmy', 'harshith', 'ajay'].forEach(high5);

// // callbacks allows use to create abstraction

// // IIFE(Immediatly Invoked Function Experssion)
// // it allows to to call a function only at onnce in a application

// const runOnce = function () {
//   console.log('this will never run again');
// };
// runOnce();

// (function () {
//   console.log('this will nerver run again');
// })(); //this is simple value a function expression

// // also works on arrow functions

// (() => {
//   console.log('never run again');
// })();

//iife is invented to encapsulate an scope which used to place private content of application.

// we can also use block to place private contant

// {
//   const isprivate = 'yes';
// }
// console.log(isprivate); //it get an error like isprivate is not defined

// Closures

const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passemgers`);
  };
};

const booker = secureBooking();

// this booker function have  access to all the environment varibales of its parent function in which where the booker function was created.
// that means that scope of securebooking() is then placed in closure,when the secureBooking() poped feom execution content we still have access to its environment varibales from closure
// bookker() close over the secureBokking() environment variables that what we called closure
booker();
booker();

// Closure Examples

// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 288;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); // a varibale in its closure
h();
f(); //we re-assigned the f variables so closure should have b varibale .It was like reborn of f function
// we still have the recorde of initial assigned f  but it does not access after re assigning to or reborn of f

//Example 2

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`we are now boardign all ${n} passengers`);
    console.log(`There are 3 gropus ,each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait} seconds`);
};
boardPassengers(160, 3); //closure also includes arguments of function because there are local variables of function
