interface Human {
    name: string;
    age: number;
    gender: string;
}

const person = {
    name: 'hayoung',
    age: 22,
    gender: 'female'
}

const sayHi = (person: Human): string => {
    return `Hello ${person.name} you are ${person.age}, you are ${person.gender}!`;
}

console.log(sayHi(person));