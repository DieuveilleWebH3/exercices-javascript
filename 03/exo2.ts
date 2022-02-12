
// Dieuveille BOUSSA ELLENGA 

interface Administrateur {
    nom : string,
    email : string ,
    ip : string ,
    dt_connexion : Date ,
    login : string,
    password : string
}


// type UtilisateurAnonyme = Partial<Pick<Administrateur, "nom" | "ip">>;


/*
interface UtilisateurAnonyme{
    nom ?:string,
    ip : string
}
*/

// Okay, so the attribute "nom" is optionnal 

// type UtilisateurAnonyme = Pick<Administrateur, "nom" | "ip">;  // wrong 

// this is it 
type UtilisateurAnonyme = (Required<Pick<Administrateur, 'ip'>> & Partial<Pick<Administrateur, 'nom'>>);

