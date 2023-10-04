'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]}and,${this.mainMenu[mainIndex]} will be delivered to ${address} at${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delicious pasta with ${ing1},${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredients, ...OtherIngredients) {
    console.log(mainIngredients);
    console.log(OtherIngredients);
  },
};
// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored





// Reset Pattern and REST parameters
// it usefully when destructuring .
/* it look exactly spread operater it has same syntex with (...) but it does opposite to spread operater */
/* REST is used to pack aan elements into an array but SPREAD is used to unpack an array */

//  1) Destructuring
// SPREAD ,because on RIGHT side of assignment operater =

const arr = [14, 17, ...[1, 3, 4]];

// REST , because on left sode of =

const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b);
console.log(others); //it put remaining element into an 'others'array which ,means packing an elements into array.

/* its called REST because it takes rest of the elements which are not assigned to variables or unused in destructiong assignment and pack them into an new array   */

const [pizza, risatto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risatto, otherFood);
/* rest pattern must be the last element while destructuring and we can have only one rest syntax in destructuring asssignment */

// In Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2)In Function /REST parameters
const add = function (...numbers) {
  // console.log(numbers);

  let sum = 0;
  numbers.forEach(i => {
    // console.log(i);
    sum += i;
    // console.log(sum);
  });
  console.log(sum);
};

add(3, 0.4);
add(9, 0, 8, 7);
add(8, 67, 87, 87);

// Spread
const x = [23, 5, 7];
add(...x);

// Example

restaurant.orderPizza('tamota', 'onions', 'wheatFlaour');

restaurant.orderPizza('tamotas');

// Spread operater

/* We use spread operater to basically expand an array into all its elements in other words unpacking all the array elements at one  */

// const arr = [1, 2, 3, 4];
// const newArray = [...arr, 5, 6]; //spread operater(...) is used to expand arr elements in to a newArray.

// console.log(newArray);
// /*it is usefull when we want to write comma seprated values we use spread operater  */

// /* above is one kind of situation where we can use spread operater and another when we pass aruguments into functions(which is basically comma sperated) */

// console.log(...newArray);
// // the abve line is same as comsole.log(1,2,3,4,5,6);

// /* when we need elements of array individually we use sperad operater and when we need to pass multiple elements into function    */
// const newMenu = [...restaurant.mainMenu, 'Gongura']; // we did not manupuliating restaurent object wee just created compelet new array object
// console.log(newMenu);

// // copy array

// /*  w use spread operater to create shallow copies of arrays* and  to mearg to arrays together*/

// const mainMenuCopy = [...restaurant.mainMenu]; //It is completely copying array

// // Join 2 array

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// console.log(menu);

// // Iterables

// /* The spread opearter not only works on arrays and works on all iterables.Iterables are things like arrays ,strings,maps,sets but NOT objects */

// // we use spreD OPERATER  on strings as well

// const str = 'ramana';
// const letters = [...str, '.k'];
// console.log(...letters); // we get an individual elements of each charater of string

// /* ALERT =>>>>    We only use spread operater  when we building an array and when we pass values into a function  */
// const ingrediants = [
//   prompt("Let's make pasta  Indredient"),
//   prompt('  Indredient2'),
//   prompt('Indredient3'),
// ];

// console.log(ingrediants);

// restaurant.orderPasta(...ingrediants);

// // ON objects

// /* Since es6 2018 spread eperater also works on object even through object are NOT iterables */

// const newRestaurent = { foounded: '2002', ...restaurant, founder: 'chinna' };

// console.log(newRestaurent);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'chinna restaturent';

// console.log(restaurant.name);
// console.log(restaurantCopy.name);

// // // Object destructuring

// console.log(`${...str} kunam`); //it does not work because this not where we use spread multiple values searated by comma.

// Spread Opearter ON functions

// // Object destructuring

// // functions
// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'ongole',
//   mainIndex: 2,
//   starterIndex: 2,
// });

// restaurant.orderDelivery({
//   address: 'ongole',

//   starterIndex: 1,
// });

// // manual
// const { name, openingHours, categories } = restaurant;

// console.log(name, openingHours, categories);

// const {
//   name: restaurantName,
//   openingHours: hours,
//   categories: tages,
// } = restaurant;
// console.log(restaurantName, hours, tages);

// // Default values

// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // mutating values

// let a = 16;
// let b = 28;

// const obj = { a: 17, b: 29 };

// ({ a, b } = obj);
// console.log(a, b);

// // Nested destructuring

// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// Arrays destructuring

// Its a basic es6 feature,it is a way of unpacking a values from an array or an object into separate variables.
// In other words destructuring is used to break a complex data structure down into sanall data structure like a variable.

//In array we use destructuring  to retrive elements from the array and store them into variables .

// const arr = [2, 3, 4];

// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// but with destructuring we can retrive at same time.

// const [x, y, z] = arr; //detsructuring assignment not array
// console.log(x, y, z);
// when ever js  see this left side of = sign it should do destructuring. we can also declaring varibles.

// let [main, , secondary] = restaurant.categories; //second elements will br skipped.So it is use when we did not nedd useless elements.
// console.log(main, secondary);

// switching elements
// with out destrutcuring

// const temp = main;
// main-secondary;
// secondary=temp;
// console.log(main,secondary);

// with destructuring

// we need to create an array  with two varibles inverted

// [main, secondary] = [secondary, main];
// console.log(main, secondary);

// Another trick with destructuring is that we can have a function ,return an array then we can immeditaly destruct the results into different variables

// with out destructuring
// console.log(restaurant.order(2, 0));
// with destructuring

// recive returned two elements from a function
// const [stater, mainCourse] = restaurant.order(2, 0);
// console.log(stater, mainCourse);

// what if we have an nested array

// const nestedArr = [2, 7, [5, 9]];

// const [i, , [k, l]] = nestedArr; //destructuring inside destructing
// console.log(i, k, l);

// Default values

// we  can also set default values  for the variables when we are extracting them.

// it was same time usefull can we dont know the length of the arrays.

// it was some times useful when we get data from an API

// const [p = 1, q = 1, r = 1] = [8, 9]; // setting default values
// console.log(p, q, r);
