document.querySelector(".js-form-add").addEventListener("submit" , async (e) => 
{
    e.preventDefault();

    const data = {
        name : e.target.name.value,
        amount : parseFloat(e.target.amount.value)
    }

    const optionRequete = {
        method : "POST", 
        body : JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        }
    }

    const reponse = await fetch("http://localhost:3000/depenses" , optionRequete);

    if(reponse.status) e.target.reset()

})
