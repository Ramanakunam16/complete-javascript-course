'use strict';
// function calcAge(birthYear) {
//   const age = 2023 - birthYear;
//   //   console.log(firstName);

//   function printAge() {
//     let output = `${firstName},you are ${age},born in ${birthYear}`;
//     console.log(output);

//     // creating new variable with same name as outer scpoe's variable
//     if (birthYear >= 1999 && birthYear <= 2005) {
//       var millenial = true;
//       const firstName = 'chinna';
//       const str = `oh,${firstName} your millenial`;
//       console.log(str);
//       function add(a, b) {
//         return a + b;
//       }
//       output = 'new output';
//     }
//     console.log(millenial);
//     // console.log(add(2, 7));
//     //reassiging outer scope's variable
//     console.log(output);
//   }
//   printAge();
//   return age;
// }
// const firstName = 'ramana';
// calcAge(2001);

// // Hosting
// // Its makes some types of variables accessible/usable on the code before they are actually declared "Variables lifted to the top of their scope "
// //  TDZ
// const myName = 'ramana';
// if (myName === 'ramana') {
//   console.log(`ramana is a ${job}`); /* TDZ FOR job variable*/
//   const age = 2023 - 2001;
//   console.log(age);
//   const job = 'student';
//   console.log(x);
// }

// e\Examples of hoisting

// variables

// console.log(myname);
// // console.log(job);
// console.log(year);

// var myname = 'ramana';
// let job = 'student';
// const year = 2023 - 2001;

// Functions
// console.log(add(90, 8));
// // console.log(addExp(8, 9));
// function add(a, b) {
//   return a - b;
// }

// var addExp = function (a, b) {
//   return a + b;
// };

// const addArrow = (a, b) => a + b;

// if (!cartCount) deletCart();
// var cartCount = 10;
// function deletCart() {
//   console.log('cart was deleted');
// }
// if (!cartCount) deletCart();

// this keyword or vvariable

//its a special variabel thar is created for every execution context(every function).
// Takes the values of(points of) the "owner" of the function in which the this keyword is used.
// this is NOT static .it depends on how the function is called . and its value is only assigned when the fuction is aactually called called/\
// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2023 - birthYear);
//   console.log(this);
// };
// calcAge(2001);

// const calcAgeArrow = birthYear => {
//   console.log(2023 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(2001);

// const ramana = {
//   year: 2001,
//   calcAge: function () {
//     console.log(this);
//     console.log(2023 - this.year);
//   },
// };

// ramana.calcAge();

// const chinna = {
//   year: 2001,
// };

// chinna.calcAge = ramana.calcAge;
// // this keyword always poinst to the object that is calling method
// const f = ramana.calcAge;
// f();

// Regular functiom vs. arrow functions

// const ramana = {
//   firstName: 'ramana',
//   year: 2001,
//   calcAge: function () {
//     console.log(this);
//     console.log(2023 - this.year);
//     // const self = this

//     // soltion1
//     // const isMillenial = function () {
//     //   console.log(self);
//     //   console.log(self.year >= 1999 && self.year <= 2005);
//     // };

//     // solution 2
//     const isMillenial = () => {
//       console.log(this);
//       console.log(this.year >= 1999 && this.year <= 2005);
//     };
//     isMillenial();
//   },
//   greet: () => console.log(`hey ${this.firstName}`),
// };

// ramana.greet();
// ramana.calcAge();

// // arguments keyword
// // thsi can be used when we need to have a large number of arguments to an function its only works on regular functions.Arguments are stored as array object(index based)
// const add = function (a, b) {
//   console.log(arguments);
//   return a + b;
// };

// console.log(add(1, 8 + 9, 9, 0));

// const addArrow = (a, b) => {
//   //   console.log(arguments);
//   return a + b;
// };

// console.log(addArrow(3, 4, 9));

// primitives vs. Objects(primitive vs. reference types)

// primitive types
let lastName = 'ramana';

let oldLastName = lastName;
lastName = 'ashmy';
console.log(lastName, oldLastName);

// Reference types
const ashmy = {
  firstName: 'ashmy',
  lastname: 'A',
  age: 22,
};

const marriedAshmy = ashmy;
marriedAshmy.lastname = 'kunam';
console.log('before marriage:', ashmy);
console.log('after marriage:', marriedAshmy);

// copying objects

const ashmy2 = {
  firstName: 'ashmy',
  lastname: 'A',
  age: 22,
};

const ashmyCopy = object.assign({}, ashmy2); //object.assign() only works at first level that means in other words when we have a object inside a object it does not performe deep clone it only performe a shallow copy which is a first level of origin object.
ashmyCopy.lastName = 'kunam';
console.log('before marriage:', ashmy2);
console.log('after marriage:', ashmyCopy);
//both object can have a array object but which points at same objet in the heap memory
// we use lodash library to make deep clone of an object
