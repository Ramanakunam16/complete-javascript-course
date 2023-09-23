"use strict";
/*let hasDriversLicense = false;
const passTest = true;
 
if(passTest) hasDriversLicense = true;
if(hasDriversLicense)
console.log('you can have driver liense,');

// We cannot able to use javascript reserved keywords has varible names.In strict mode it will show us a bug in the console says unexpected  token or strict mode reserved word like that.

// const interface = 'music';
// const private = 234;
// const function = 'hello';


// Fuctions

function logger() {
    console.log('My name is Ramana');
}

// calling /invoking /running the function
logger();
logger(); // we call the function many time we want.

// Function can also receives data and retruns data back

function fruitProcessor(oranges, mangoes) {
    const juice = `Juice with ${oranges} oranges and ${mangoes} mangoes.`;
    return juice;
}

const orangeJuice = fruitProcessor(5,0);
console.log(orangeJuice);

const orangeMangoJuice = fruitProcessor(3,4);
console.log(orangeMangoJuice);

// Function Declarations vs. Function Expressions

// Function Declaration

// In function declaration we can call function before it initilization.

function calAge1(birthYear) {
    let currentYear = 2023;
    return currentYear - birthYear;
}

const age1 = calAge1(2001);
console.log(`Ramana's age : ${age1}`);


// Function Expression 

// In function Expression we cann't call the finction before initilization unlike function declaration.
const calAge2 = function (birthYear) {
    let currentYear = 2023;
    return currentYear - birthYear;
}
const age2 = calAge2(1998);
console.log(`Balaram's age : ${age2}`);


// Arrow Functions

// It is extremly useful when we have a single parameter and a single line code.But it can be more complex when we have couple of parametr or code.We didn't need to write retuen keyword for one line of code.

// when we need to write couple lines of code we needed to use curly brackets '{}' to write the code.And also when we needed to write couple of parameters ,we use parantheses '()' to place couple of parameters.We need to should write return keyword when we have two or more code lines.

const calAge3 = birthYear => 2023 - birthYear;
const age3 = calAge3(2002);
console.log(age3);

const yearsUntilRetirment = (birthYear , firstName) => {
    const age = 2023 - birthYear;
    const retirement = 60 - age;
    // return retirement;
    return `${firstName} retires in ${retirement} years`;
}
console.log(yearsUntilRetirment(2001));
console.log(yearsUntilRetirment(2001 ,'Ramana'));


// Function calling other Functions

function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(oranges, mangoes) {

    const orangePieces = cutFruitPieces(oranges);
    const mangoesPieces = cutFruitPieces(mangoes);
    const juice = `Juice with ${orangePieces} pieces of oranges and ${mangoesPieces}  pieces of mangoes.`;
    return juice;
}
console.log(fruitProcessor(2 , 3));


// Reviewing functions

const  calAge1 = function(birthYear) { 
    return  2023 - birthYear;

}


const yearsUntilRetirment = function (birthYear , firstName)  {
    const age =  calAge1 (birthYear);
    const retirement = 60 - age;
    
     
    if(retirement > 0){
        return retirement;
    }else{
        return -1;
    }
          
     
    // return `${firstName} retires in ${retirement} years`;
}

console.log(yearsUntilRetirment(2001,'Ramana'));

function calAge(birthYear, firstName){
    const age = 2023 - birthYear;
    console.log(`${firstName} is ${age} years old.`);
    return age;
}

const age =  calAge(2001 ,'Ramana');
console.log(age);

// Coding Challenge #1

// Test #1

const calAverage = (a,b,c) => (a + b + c)/3;

console.log(`Average of Dolphin Team : ${calAverage(85, 54,41)}`);
console.log(`Average of Koalas Team : ${calAverage(23, 34, 27)}`);

const checkWinner = function () {
    const  scoreDolphin = calAverage(85, 54,41);
    const scoreKoalas = calAverage(23, 34, 27);

    if (scoreDolphin >= 2*scoreKoalas){
        console.log('Team Dolphin is the winner');
    } else if(2*scoreDolphin<= scoreKoalas){
        console.log('Team Koalas is the winner');
    }else{
        console.log('No Team wins.');
    }
     
}

checkWinner();

 

// Arrays

const friends = ['Ramana', 'Naidu', 'Gayatri','Mounica', 'Phani' ];
console.log(friends);

// const years = new Array(1998, 2001, 2002);
// console.log(years);

// logging element from array
console.log(friends[0]);
console.log(friends[2]);
 
// finding array length
console.log(friends.length);
console.log(friends[friends.length - 1]);

// adding elements to array
friends[2] = 'Ranjani';
console.log(friends); 

// Array can holds any tyoe values at same time,Arrays excepts epressions.It can also holds varibales and array 😂.

const firstName = 'Ramana'
const ramana = [firstName, 'Kunam', 2023 - 2001, 'Student', friends ];

// Exercise

const  calAge = function(birthYear) { 
    return  2023 - birthYear;

}

const years = [1998, 2001, 2002, 2005];

const age1 = calAge(years[0]);
const age2 = calAge(years[1]);
const age3 = calAge(years[years.length - 1]);
console.log(age1, age2, age3);

const ages = [calAge(years[0]), calAge(years[1]), calAge(years[years.length - 1]) ];
console.log(ages);
 // Arrays can holds any type  or epression which produce an value.


// Array operations [Methods]
const friends = ['Ramana', 'Naidu', 'Gayatri','Mounica', 'Phani' ];
  // push : add new element to end of the Array.

  friends.push('Mythili');
  const newLength = console.log(friends);
  console.log(friends);
  console.log(newLength);

  // adding elements at begining of an array

//   That is "unshift" method

friends.unshift('Reventh');
console.log(friends);

// Removing elements from Array
//pop method doe return length of an Array.But it return removed elements.

friends.pop();
const popped = friends.pop();
console.log(popped);
console.log(friends);

// shift : to remove element from begining of Array
friends.shift();
console.log(friends);

// To find the position of an elements in Array

console.log(friends.indexOf('Ramana'));
console.log(friends.indexOf('Ranjani'));


// includes method. It is same as the indexOf but includes method return boolean values,if element is present it returns true otherwise it rteurns false.

// This method use strict equality for this check.WHich means it does support type coercion.

friends.push(23);
console.log(friends.includes('Ramana'));
console.log(friends.includes('Ranjani'));
console.log(friends.indexOf('23'));

// We cn use includes menthos to writes conditionals.

if(friends.includes('Divya')){
console.log('You have friend called Divya');

}


// Objects

// object contains key or property - value pairs.Property holds the data. The key  similar to varibales.

const ramana = {
  firstName: "ramana",
  lastName: "Kunam",
  age: 2023 - 2001,
  job: "Student",
  friends: ["Ramana", "Naidu", "Gayatri", "Mounica", "Phani"],
};

// Objects are unordered data structure unlike arrays,Arrays are strictly ordered data structure.

// dot vs. Bracket Notation

console.log(ramana);
//  We can get data from objects by property name.

// By dot notation
//   ' . ' is actually a operator

console.log(ramana.lastName);

// By bracket notation

console.log(ramana["lastName"]); // operator basically an expression

const nameKey = "Name";
console.log(ramana["first" + nameKey]);
console.log(ramana["last" + nameKey]);

// console.log(jonas.'first' + nameKey);

const interestesIN = prompt(
  "What do you want to know about Ramana? Choose between firstName, lastName, age, job, friends"
);

console.log(ramana["interestesIN"]);

if (ramana["interestesIN"]) {
  console.log(job["interestesIN"]);
} else {
  console.log(
    "Wrong request! Choose between firstName, lastName, age, job, friends. "
  );
}

// adding new properties to object using both the notaions.

ramana.location = "India";
ramana["insta"] = "@_chinna16_";
console.log(ramana);

// Challenge

// log to console this statement : "ramana has 5 friends, and his best friend is Gayatri ."

console.log(
  `${ramana.firstName} has ${ramana.friends.length} friends , and his best friend is ${ramana.friends[2]}.`
);

// Object methods

// They can hold objects inside objects
// We already know that functions are values which we can jeven create  a key value pair with this fuction values and that means we can add fuctions to objects.

// const ramana = {
  firstName: "ramana",
  lastName: "Kunam",
  birthYear: 2001,
  job: "Student",
  friends: ["Ramana", "Naidu", "Gayatri", "Mounica", "Phani"],
  hasDriveLicense: true,
  // Any fuction that is added to object is called an method
  //   Here the method is aproperty or value which is holds a  fuction value.
  //   calcAge: function (birthYear) {
  //     return 2023 - birthYear;
  //   calcAge: function () {
  //     return 2023 - this.birthYear;
  //     // we can calculate value once and assign it to new object so we can access object whenever we need to void call tha fuction multiple times.
  calcAge: function () {
    this.age = 2023 - this.birthYear; // creating an object
    return this.age;
  },
};
ramana.calcAge();
console.log(ramana.age);
// console.log(ramana["calcAge"](ramana.birthYear));

//challenge #3

const john = {
  fullName: "john smit",
  mass: 92,
  height: 1.95,
  calBMI: function () {
    this.johnBMI = this.mass / this.height ** 2;
    return this.johnBMI;
  },
};
const mark = {
  fullName: "mark miller",
  mass: 78,
  height: 1.69,
  calBMI: function () {
    this.markBMI = this.mass / this.height ** 2;
    return this.markBMI;
  },
};
john.calBMI();
mark.calBMI();
if (john.johnBMI > mark.markBMI) {
  console.log(
    `John's BMI ${john.johnBMI} is higher than Marks's ${mark.markBMI}!`
  );
} else if (john.johnBMI < mark.markBMI) {
  console.log(
    `mark's BMI ${mark.markBMI} is higher than john's ${john.johnBMI}!`
  );
} else {
  console.log(
    `Both mark's BMI ${mark.markBMI} and john's ${john.johnBMI} has equal BMI`
  );
}
*/
// Iteration The for loop

//for loop keeps running while condition is true
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition:${rep}`);
}

// Looping arrays
const friends = ["Ramana", "Naidu", "Gayatri", "Mounica", "Phani"];

const firstName = "Ramana";
const ramana = [firstName, "Kunam", 2023 - 2001, "Student", friends];

const types = [];

for (let i = 0; i < ramana.length; i++) {
  // Reading from ramana array
  console.log(ramana[i], typeof ramana[i]);

  //filling types array
  //   types[i] = typeof ramana[i];

  types.push(typeof ramana[i]);
}
console.log(types);

const years = [1999, 2000, 2001, 2003];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2023 - years[i]);
}
console.log(ages);

// Continue and Break

// contunue is to exit the current iteration of the loop and continue to next one.
//break is used to completly terminate whole loop.

// for only string
for (let i = 0; i < ramana.length; i++) {
  if (typeof ramana[i] !== "string") continue;
  // Reading from ramana array
  console.log(ramana[i], typeof ramana[i]);
}

for (let i = 0; i < ramana.length; i++) {
  if (typeof ramana[i] === "object") break;
  // Reading from ramana array
  console.log(ramana[i], typeof ramana[i]);
}
