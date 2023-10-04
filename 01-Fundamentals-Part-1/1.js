/*
let js = "amazing";
if (js == "amazing") alert("javascript is fun!");
48 + 823 - 10;
console.log(48 + 823 - 10);

// Variable name conventions
let firsName = "kunam";
console.log(firstName);
let PI = 3.1415;


// boolean data type

let javaScript = true;
console.log(javaScript);

// typeof operater

console.log(typeof true);
console.log(typeof 26);
console.log(typeof "kr");
javaScript = "YES!"; // dynamically changing values
console.log(typeof javaScript);

 let firstName; //undefined
console.log(firstName);
console.log(typeof firstName);
firstName = "kunam";
console.log(typeof firstName);

console.log(typeof null);


let age = 21;
age = 22; //reassiging values

const birtyear = 2001;
birthYear = 2000;

var job = "student";
job = "coder";

// lastName = "reddy";
// console.log(lastName); //it is pretty terrible idea to create variable because it does not create variable in current so called scope.Instead js will create a object on the globel object.

// arthematic operator
const now = 2030;
const ageChinna = now - 2001;
const ageAshmy = now - 2001;
console.log(ageChinna.ageAshmy);

console.log(ageChinna + 2, ageChinna / 2.2 ** 2);
// 2**2 means 2 to power of 2 = 2*2

const firstName = "Ramana";
const lastName = "kunam";
console.log(firstName + " " + lastName);

// assignment operator
let x = 10 + 5;
x += 10; // x=x+10=25
x *= 4; // x= x*4=25*4=100
x++; // x=x+1=101
x--; // x=x-1=100
console.log(x);
//  comparison operators

console.log(ageChinna <= ageAshmy);
// <,>,>=,<=
console.log(ageAshmy >= 20);
const ifFullAge = ageAshmy >= 18;


const now = 2030;
const ageChinna = now - 2001;
const ageAshmy = now - 2001;

console.log(30 - 10 - 5); //left to right precedene

let x, y;
x = y = 30 - 10 - 5; // x=y=10
// right to left precedence
console.log(x, y);

// grouping precedence

const averageAge = (ageChinna + ageAshmy) / 2;
console.log(ageChinna, ageAshmy, averageAge);


//coding challenge #1

// test1
const ramanasWeigth = 78;
const ramanasHeight = 1.69;
const ashmysWeigth = 92;
const ashmysHeigth = 1.95;
const ramanasBMI = ramanasWeigth/(ramanasHeight)**2
const ashmysBMI = ashmysWeigth/(ashmysHeight)**2
const ramanaHigherBMI = ramanasBMI > ashmysBMI
 console.log(ramanasBMI , ashmysBMI , ramanaHigherBMI);

// test2

const ramanasWeigth = 95;
const ramanasHeight = 1.88;
const ashmysWeigth = 85;
const ashmysHeight = 1.76;
const ramanasBMI = ramanasWeigth / ramanasHeight ** 2;
const ashmysBMI = ashmysWeigth / ashmysHeight ** 2;
const ramanaHigherBMI = ramanasBMI > ashmysBMI;
console.log(ramanasBMI, ashmysBMI, ramanaHigherBMI);
 
// string template literals

const firstName = "Ramana";
const job = "student";
const birthYear = 2001;
const year = 2038;
const ramana =
  "I'm" + firstName + ", a" + (year - birthYear) + " years old" + job + "!";
console.log(ramana);

const ramanaNew = `I' m ${firstName},a ${year - birthYear} years old ${job}!`;

console.log(ramanaNew);

// using backticks for creating strings
console.log(`Just a regular student`);

//  mutliline strings before es6

console.log(`string with \n\
multiple\n\
lines
`);

// multiple line strings IN  es6

console.log(`string with
multiple
lines
`);


// decision making

const age = 21;
if (age >= 18) {
  console.log("Ashmy can start driving license 🚗 ");
} else {
  const yearLeft = 18 - age;

  console.log(`Ashmy is too young.Wait another ${yearLeft} yaers.`);
}
const birthYear = 2001;
let century;
if (birthYear >= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

// coding challenge #2

const ramanasWeigth = 78;
const ramanasHeight = 1.69;
const ashmysWeigth = 92;
const ashmysHeight = 1.95;
const ramanasBMI = ramanasWeigth / ramanasHeight ** 2;
const ashmysBMI = ashmysWeigth / ashmysHeight ** 2;
if (ramanasBMI > ashmysBMI) {
  console.log(
    `ramana's BMI (${ramanasBMI}) is higher than ashmy's BMI (${ashmysBMI})`
  );
} else {
  console.log(
    `ashmy's BMI (${ashmysBMI}) is higher than ramana's BMI (${ramanasBMI})`
  );
}


// Type conversion and coercion

// Type conversion
const inputYear = "2001";
console.log(Number(inputYear));
console.log(Number(inputYear) + 18);

console.log(Number("ramana"));
console.log(typeof NaN);

console.log(String(21), 21);

// Type coercion

console.log("I am " + 23 + "years old");
console.log("21" - "10" - 3);
console.log("23" * "2"); // converts to numbers
console.log("21" / "7"); // converts to numbers

let n = "1" - 3;
n = n - 1;
console.log(n);


// Five fasly values : 0, '' , undefined, null, NaN

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("ramana"));
console.log(Boolean({}));
console.log(Boolean(""));

const money = 0;
if (money) {
  console.log("Don't spend it all");
} else {
  console.log("you should get a job");
}

//Checking whether variable is defined or not

let hegiht;
if (hegiht) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}

// Equality operators (=== vs. ==)

// === : strict equality operator,does not do type coercion

const age = "21";
if (age === 21) console.log("You just became an adult (strict)"); // for one line statement in if else control structure doesnot need {} brackets

// == : loose equality operator

if (age == 21) console.log("You just became an adult (loose)");

// Prompt function
const fav = Number(prompt("What is ypur fav Number?"));
console.log(fav);
console.log(typeof fav);

// else if statement

if (fav === 21) {
  console.log("Cool! 21 is good Number!");
} else if (fav === 7) {
  console.log("7 is also a cool number");
} else {
  console.log("Number is not 21 or 7");
}

// Not eqiality operator

if (fav !== 21) console.log("Why not 21?");



const hasDriversLicense = true;
const hasGoodVision = false;
console.log(hasDriversLicense && hasGoodVision);
console.log(hasDriversLicense || hasGoodVision);
console.log(!hasDriversLicense);

const shouldDrive = hasDriversLicense && hasGoodVision;

if (shouldDrive) {
  console.log("Ashmy is able to drive!");
} else {
  console.log("Someone else should drive...");
}
const isTried = true;
console.log(hasDriversLicense && hasGoodVision && isTried);
if (hasDriversLicense && hasGoodVision && !isTried) {
  console.log("ashmy is able to drive!");
} else {
  console.log("Someone should drive..");
}


// Switch statements

const day = String(prompt("Enter any week day:"));

switch (day) {
  case "monday": // day === "monday"
    console.log("Plan course structure");
    console.log("Go to consing meetup");
    break;
  case "tuesday":
    console.log("Preapre theory videos");
    break;
  case "wednesday":
  case "thursday":
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record video");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend > ><");
    break;
  default:
    console.log("Not a valid day");
}

// By using if-else statement

if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to consing meetup");
} else if (day === "tuesday") {
  console.log("Preapre theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record video");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekend > ><");
} else {
  console.log("Not a valid day");
}

// statement and expression

expressions ,which produce a value and statements,which discribe an action but not produce any value.

// The conditional (ternary) operator

const age = 21;
age >= 18
  ? console.log("I like to drink wine 🍷")
  : console.log("I like to drink water💧"); // It is in fact an operator.

const drink = age >= 18 ? "wine🍷" : "drink 💧";
console.log(drink);

let drink2;
if (age >= 18) {
  drink2 = "wine🍷";
} else {
  drink2 = "drink 💧";
}
console.log(drink2);

// Using Ternary operator in Template literals

console.log(`I lile to drink ${drink}`);

// Coding Challeng #3

const dolphinsMatch_1 = 96;
const dolphinsMatch_2 = 108;
const dolphinsMatch_3 = 89;
const koalasMatch_1 = 88;
const koalasMatch_2 = 91;
const koalasMatch_3 = 110;

const avgOfDolphins = (dolphinsMatch_1 + dolphinsMatch_2 + dolphinsMatch_3) / 3;
const avgOfKoalas = (koalasMatch_1 + koalasMatch_2 + koalasMatch_3) / 3;

if (avgOfDolphins > avgOfKoalas) {
  console.log("The winner is Team Dolphins");
} else if (avgOfDolphins < avgOfKoalas) {
  console.log("The winner is Team Koalas");
} else {
  console.log("The game is draw,which means score is equal");
}

// Bonus #1 and #2

// applying minimum score to win.

const minScore = 100;
const $dolphinsMatch_1 = 97;
const $dolphinsMatch_2 = 112;
const $dolphinsMatch_3 = 81;
const $koalasMatch_1 = 109;
const $koalasMatch_2 = 95;
const $koalasMatch_3 = 86;

const $avgOfDolphins =
  ($dolphinsMatch_1 + $dolphinsMatch_2 + $dolphinsMatch_3) / 3;
const $avgOfKoalas = ($koalasMatch_1 + $koalasMatch_2 + $koalasMatch_3) / 3;

console.log($avgOfDolphins, $avgOfKoalas);

if ($avgOfDolphins > $avgOfKoalas && $avgOfDolphins >= minScore) {
  console.log("The winner is Team Dolphins");
} else if ($avgOfDolphins < $avgOfKoalas && $avgOfKoalas >= minScore) {
  console.log("The winner is Team Koalas");
} else if (
  $avgOfDolphins === $avgOfKoalas &&
  $avgOfDolphins >= minScore &&
  $avgOfKoalas >= minScore
) {
  console.log("The game is draw,which means score is equal");
} else {
  console.log("Both teams did not cross the miminum score requirment.f");
}

// Coding Challeng #4

const bill_1 = 275;
const bill_2 = 40;
const bill_3 = 430;
const tip_1 = bill_1 >= 50 && bill_1 <= 300 ? bill_1 * 0.15 : bill_1 * 0.2;
console.log(
  `The bill value : ${bill_1} , tip should be ${tip_1} and Final value = ${
    bill_1 + tip_1
  }.`
);
const tip_2 = bill_2 >= 50 && bill_2 <= 300 ? bill_2 * 0.15 : bill_2 * 0.2;
console.log(
  `The bill value : ${bill_2} , tip should be ${tip_2} and Final value = ${
    bill_2 + tip_2
  }.`
);
const tip_3 = bill_3 >= 50 && bill_3 <= 300 ? bill_3 * 0.15 : bill_3 * 0.2;
console.log(
  `The bill value : ${bill_3} , tip should be ${tip_3} and Final value = ${
    bill_3 + tip_3
  }.`
);
*/
