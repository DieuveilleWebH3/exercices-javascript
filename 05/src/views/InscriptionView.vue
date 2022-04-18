<template>
    <div class="inscription">
        <form>
            <div class="mb-5">
                <h1 style="margin-left:2em;">Créer un profil <i class="fa-regular fa-user"></i></h1>
                <div class="inputs">
                    <input class="form-control" type="text" placeholder="psoeudo" name="psoeudo" v-model="pseudo" required/>
                    <input class="form-control" type="email" placeholder="votre@email.fr" name="email" v-model="email" required/>
                    <input class="form-control" type="password" placeholder="password" name="password" id="password" v-model="password" required/>
                    <input class="form-control" type="password" placeholder="confirmer password" name="confirm_password" id="confirm_password" v-model="confirm_password" required/>
                    <span id = "message" style="color:red"> </span>
                    <input class="form-control" type="text" placeholder="url de votre image - taille conseillée 1000x200px" name="urmImage" v-model="urlImgProfil" required/>

                </div>
                <input type="submit" class="btn btn-success" value="Créer un nouveau profil" style="margin-left:3em;" @click="(e) => {inscrire(e)}"/>
                <div><span id = "inscription" style="color:green;margin-left:5em"> </span></div>
            </div>
        </form>
    </div>
</template>
<script>

export default {
    data (){
        return {
            pseudo : "",
            email : "",
            password : "",
            confirm_password : "",
            urlImgProfil : ""
        }
    },
    methods:{
        inscrire(e){
            e.preventDefault();
            if(this.password != this.confirm_password){
                document.querySelector('#message').innerHTML="Assurez-vous que les mots de passe soient identiques !";
            }else{
                const user = {
                    pseudo : this.pseudo,
                    email : this.email,
                    password : this.password,
                    urlImgProfil : this.urlImgProfil
                }
                fetch("http://localhost:3003/utilisateurs", {
                    method: "post", 
                    headers : {"content-type": "application/json"} , 
                    body : JSON.stringify(user)
                })
                .then(reponse => reponse.json())
                .then(data => {
                })
                this.pseudo =""
                this.email =""
                this.password =""
                this.confirm_password =""
                this.urlImgProfil =""
                document.querySelector('#inscription').innerHTML="L'utilisateur a été bien inscrit !";
                this.$router.push('/connexion')
            }
        }
    },
    computed:{
        
    },
    mounted:function(){
        fetch("http://localhost:3003/articles")
            .then(reponse => reponse.json())
            .then(data => {
                
                this.articles = data ; 
        })
        fetch("http://localhost:3003/utilisateurs")
            .then(reponse => reponse.json())
            .then(data => {
                this.users = data ; 
        })
    }
}
</script>
<style>
    @media (min-width: 1024px) {
        .inscription {
            min-height: 100vh;
            margin-left:5em;
            background-color:#FBF9F8;
            width:80%;
            border: 0.6px solid #C8C5C4;
        }
    }
    input{
        margin-top:1em;
    }
    .inputs{
        margin-right:8em;
        margin-left:3em;
    }
</style>