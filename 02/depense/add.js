document.querySelector(".js-form-add").addEventListener("submit" , async (e) => 
{
    e.preventDefault();

    const data = {
        name : e.target.name.value,
        amount : parseFloat(e.target.amount.value)
    }

    console.log(e.target.amount.value);

    if( ( e.target.name.value == '') || ( e.target.name.value == undefined ) || ( e.target.amount.value == '') || ( e.target.amount.value == undefined )  || ( e.target.amount.value == NaN ) || ( typeof(e.target.amount.value) == NaN) ) 
    {
        document.querySelector(".js-errorAdd").innerHTML = "Veuillez remplir les champs (obligatoires) conformément";
        
        return 0
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
