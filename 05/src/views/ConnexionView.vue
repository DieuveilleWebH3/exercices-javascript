<template >
  <div class="connexion">
     <form>
        <div class="mb-5">
            <h1 style="margin-left:2em;"> Se connecter <i class="fa-solid fa-link"></i></h1>
            <div class="inputs">
              <input class="form-control" type="email" placeholder="votre@email.fr" name="email" v-model="email"/>
              <input class="form-control" type="password" placeholder="password" name="password" v-model="password"/>

            </div>
            <div><span id = "connexion" style="color:red;margin-left:7em"> </span></div>
            <input type="submit" class="btn btn-success" value="Connexion" style="margin-left:3em;" @click="(e) => {connexion(e)}"/>
          </div>
      </form>
  </div>
</template>

<script>

export default {
    data (){
        return {
            email : "",
            password : "",
            users:[]
        }
    },
    methods:{
        connexion(e){
          e.preventDefault();
          fetch("http://localhost:3003/utilisateurs", {
            method: "GET", 
            headers : {"content-type": "application/json"} , 
          })
          .then(reponse => reponse.json())
          .then(data => {
            this.users = data;
            var check = false;
            data.map(user => {
              if(user.email == this.email && user.password == this.password){
                check = true;
                const commit = {
                  pseudo: user.pseudo,
                  email: user.email
                }
                console.log(commit);
                this.$store.commit({type: 'setUserConnected' , user : commit})
                if (localStorage.getItem("loggedIn") === "true")  {
                  this.$forceUpdate();
                  this.$emit('update_loggedIn')
                  this.$router.push('/')
                } 
              }
            })
            if(!check) document.querySelector('#connexion').innerHTML = "L'utilisateur n'existe pas, veuillez vérifier les informations saisies"
          })
          
        }
    }
}
</script>

<style>
@media (min-width: 1024px) {
  .connexion {
    min-height: 100vh;
    margin-left:5em;
    background-color:#FBF9F8;
    width:80%;
    border: 0.6px solid #C8C5C4;
  }
}
.inputs{
  margin-right:3em;
  margin-left:3em;
}
</style>
