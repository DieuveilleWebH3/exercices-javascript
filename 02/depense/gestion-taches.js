window.addEventListener("DOMContentLoaded"  , async() => 
{

    const reponse = await fetch("http://localhost:3000/depenses" )

    const todos = await reponse.json(); 
    
    document.querySelector(".js-list-tache").innerHTML = genererFormsTaches(todos);

    // gestion de la somme de restante
    document.querySelector(".js-counter").innerHTML = sum(todos.map( d => {
        return parseFloat(d.amount)
    } ) );

    // gestion de la somme des depenses
    document.querySelector(".js-depense").innerHTML = sum((todos.filter( todo => todo.amount > 0 )).map( d => {
        return parseFloat(d.amount)
    } ) );

    // gestion de la somme des recettes
    document.querySelector(".js-recette").innerHTML = sum((todos.filter( todo => todo.amount < 0 )).map( d => {
        return parseFloat(d.amount)
    } ) );
    

    console.log(todos.map( d => {
        return parseFloat(d.amount)
    } ) );

    console.log(sum(todos.map( d => {
        return parseFloat(d.amount)
    } ) ) );


    // écouter quand on clique dans la zone js-list-tache
    document.querySelector(".js-list-tache").addEventListener("click" , async e => 
    {
        e.preventDefault();

        if(e.target.className.includes("btn"))
        {
            const form = e.target.parentNode;

            const action = e.target.value;
            
            const the_id = form.id.value;

            console.log(action);

            if(action == "modifier")
            {
                const data = 
                {
                    id : the_id,
                    name : form.name.value,
                    amount : parseFloat(form.amount.value)
                };

                console.log(data);

                const options = 
                { 
                    method : "PUT" , 
                    body : JSON.stringify(data) , 
                    headers : {'Content-Type': 'application/json'} 
                };
                
                await fetch("http://localhost:3000/depenses/" + the_id, options);
            }
            else if(action == "supprimer")
            {
                const options = 
                {
                    method : "DELETE"
                };

                await fetch("http://localhost:3000/depenses/" + the_id, options);
            }
        }
    })
})

function sum( obj ) 
{
    let sum = 0;

    for( var el in obj ) 
    {
        sum += parseFloat( obj[el] );
    }

    return sum;
}

function genererFormsTaches(data){

    if(data.length === 0) return "<p>Veuillez ajouter des tâches</p>";

    return data.map( d => {
        return `
        <form class="d-flex my-3">
            <input type="hidden" name="id" class="form-input" value="${d.id}">

            <input type="text" name="name" class="form-input" value="${d.name}">

            <input type="text" name="amount" class="form-input mx-3" value="${d.amount}">
            
            <input type="submit" class="btn btn-primary mx-3" value="modifier">
            <input type="submit" class="btn btn-danger" value="supprimer">
        </form>`
    } ).join("")
}