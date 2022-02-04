"use strict";
// Dieuveille BOUSSA ELLENGA 
exports.__esModule = true;
exports.logPerson = exports.users = void 0;
/*
export type User = Object;
*/
exports.users = [
    {
        name: 'Alain',
        age: 25,
        occupation: 'Boulanger',
        compentences: ["js", "node"]
    },
    {
        name: 'Béatrice',
        age: 23,
        occupation: 'Astronaute',
        adresse: {
            rue: "75 rue de Paris",
            cp: 75000,
            ville: "Paris"
        }
    }
];
function logPerson(user) {
    console.log(" - ".concat(user.name, ", ").concat(user.age));
}
exports.logPerson = logPerson;
logPerson(exports.users[0]);
// exo 2 
// type UtilisateurAnonyme = Partial<Pick<Administrateur, "nom" | "ip">>;
