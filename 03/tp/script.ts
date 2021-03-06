
// Dieuveille BOUSSA ELLENGA 


// https://jsonplaceholder.typicode.com/posts
// https://jsonplaceholder.typicode.com/users


interface User {
    id : number ,
    name : string ,
    username : string,
    email : string,
    adresse : {
        street : string,
        suite : string,
        city : string,
        zipcode :string,
        geo : {
            lat : number,
            lng : number
        }
    },
    phone : number,
    website : number,
    company : {
        name :string,
        catchPhrase : string,
        bs : string
    }
    
}
interface Post {
    userId : number,
    id: number,
    title: string,
    body : string
}

let utilisateurs : Array<Partial<User>>;
let articles :Array<Partial<Post>>;

document.addEventListener("DOMContentLoaded", async () => {
    const dataUsers = await fetch("https://jsonplaceholder.typicode.com/users"); 
    const dataPosts = await fetch("https://jsonplaceholder.typicode.com/posts"); 
    const users = (await dataUsers.json()) as Array<Partial<User>>;
    utilisateurs = users;
    const posts = (await dataPosts.json()) as Array<Partial<Post>>;
    articles = posts;
    getDatas(users,posts);
    
})

function getDatas(users : Array<Partial<User>>, posts: Array<Partial<Post>>){
    const div = document.querySelector('.data') as HTMLBodyElement;
    div.innerHTML ="";
    let html = "";
    users.forEach(user => {
        const articlesUser = posts.filter(p => p.userId === user.id)
        html += `
           <div class="col-md-4">
                <h4 style="color:blue;">${user.name}</h4>
                <p>${user.email}</p>
                <h5 style="color:yellow">Titre des articles rédigés :</h5>
                <ul>`;
        articlesUser.forEach(article => {
            html +=`
                <li>${article?.title}</li>
            `
        })
        html +=`
            </div>
            `;
    });
    div.innerHTML = html;
}

const form = document.querySelector(".Articles") as HTMLFormElement;

form.addEventListener("submit" , (e : Event) => {
    e.preventDefault();
    
    const titre = document.querySelector(".titre") as HTMLInputElement ;
    const auteur = document.querySelector(".auteur") as HTMLInputElement ;
    

    /*
    // On vérifie à l'aide de condition 
    if ( (titre.value !== "") && (auteur.value !== "") )
    {
        let user = utilisateurs.filter( u =>  u.name.toLowerCase().includes(auteur.value.toLowerCase()));
        
        console.log("*************** Users from name *****************");
        console.log(user);
        console.log("\n");
        // const post = articles.filter( a =>  a.title.toLowerCase().includes(titre.value.toLowerCase()));

        let post: any;

        user.forEach(u => {
            post += articles.filter(p => p.userId === u.id)
        })

        console.log("*************** Posts from users *****************");
        console.log(post);
        console.log("\n");


        user.forEach(u => {

            articles.forEach(article => {
                if (article.userId === u.id) console.log("OK");
                else user.splice(user.indexOf(u), 1)
            })

        })

        console.log("*************** Users cleaned *****************");
        console.log(post);
        console.log("\n");

        getDatas(user, post);

    }
    else if( (titre.value !== "") && (auteur.value === "") )
    {
        const user = utilisateurs.filter( u =>  u.name.toLowerCase().includes(auteur.value.toLowerCase()));
        const post = articles.filter( a =>  a.title.toLowerCase().includes(titre.value.toLowerCase()));

        getDatas(user,post);

    }
    else if( (titre.value === "") && (auteur.value !== "") )
    {
        // const post = articles.filter( a =>  a.title.toLowerCase().includes(titre.value.toLowerCase()));

        // const user_post = post.filter(p => p.userId === user.id)

        // const user = utilisateurs.filter( u =>  u.id === (post.userId));

        const user = utilisateurs.filter( u =>  u.name.toLowerCase().includes(auteur.value.toLowerCase()));
        const post = articles.filter( a =>  a.title.toLowerCase().includes(titre.value.toLowerCase()));

        getDatas(user,post);

    }

    */

    const user = utilisateurs.filter( u =>  u.name.toLowerCase().includes(auteur.value.toLowerCase()));
    const post = articles.filter( a =>  a.title.toLowerCase().includes(titre.value.toLowerCase()));
    
    getDatas(user,post);
})
