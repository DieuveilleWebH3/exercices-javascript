
// Dieuveille BOUSSA ELLENGA 


// export type User = unknown;


/*
export type User = {
    name : string, 
    age : number
    occupation : string,
    compentences ? : Array<string>,
    adresse ? : object, 
};
*/


export type User = {
    name : string, 
    age : number
    occupation : string,
    compentences ? : Array<string>,
    adresse ? : Object, 
};


/*
export type User = Object;
*/


export const users: User[] = [
    {
        name: 'Alain',
        age: 25,
        occupation: 'Boulanger',
        compentences : ["js", "node"]
    },
    {
        name: 'Béatrice',
        age: 23,
        occupation: 'Astronaute',
        adresse : {
            rue : "75 rue de Paris",
            cp : 75000,
            ville : "Paris"
        }
    }
];

export function logPerson(user: User) {
    console.log(` - ${user.name}, ${user.age}`);
}


// testing : It works 
// logPerson(users[0]);

