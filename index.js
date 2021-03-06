class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Engineer {
}

Engineer.prototype.skills = ['JavaScript'];

const person = Reflect.construct(
  Person, 
  ['nate', 30],
  Engineer
  );

// console.log(person);
// console.log(person instanceof Person);   // false
// console.log(person instanceof Engineer); // true
// console.log(person.__proto__ === Engineer.prototype); // true
// console.log(person.skills); // ['JavaScript']


// ~~~~ APPLY ~~~~~
class Friend {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet(cb) {
    console.log(`
    Hello, I am ${this.name}. 
    ${Reflect.apply(cb, this, [])}
    `);
  }
}

const friend = Reflect.construct(Friend, ['Maxwell', 10_000]);
// Reflect.apply(
//   friend.greet, 
//   {...friend, age: 10_000_001}, 
//   [function() {return `I am ${this.age} years old.`}]
// );

// ~~~ getPrototypeOf ~~~

class Cat {
  constructor(name) {
    this.name = name;
  }
}

const myCat = Reflect.construct(Cat, ['Sophie']);
// console.log(Reflect.getPrototypeOf(myCat));  // Cat
Reflect.setPrototypeOf(myCat, {name: 'Oliver'});
// console.log(Reflect.getPrototypeOf(myCat)); // {name: 'Oliver'}



class Movie {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }

  get intermission() {
    return this.length / 2;
  }
}

const movie = new Movie('Mad Max', 212);

// console.log(Reflect.get(movie, 'length'));
Reflect.set(movie, 'length', 500);
// console.log(Reflect.get(movie, 'length'));  // 500
const obj = {length: 2};
// console.log(Reflect.get(movie, 'intermission', obj));  // 2


// ~~~ Creating / Deleting ~~~
Reflect.defineProperty(
  movie, 
  'rating', 
  {value: '⭐️️️️️⭐️⭐️⭐️', writable: true}
  )

// console.log(movie.rating);

Reflect.deleteProperty(movie, 'length');
console.log(movie.length);

Reflect.preventExtensions(movie);
Reflect.defineProperty(movie, 'boxOffice', {value: 10_000_000});
console.log(movie.boxOffice);
movie.originalTitle = 'Cool Runnings';
console.log(movie.originalTitle)


