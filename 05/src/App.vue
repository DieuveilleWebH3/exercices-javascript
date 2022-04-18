<script setup>
import { onBeforeUpdate } from '@vue/runtime-core'
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper row" style="width:100%">
      <div class="col-md-2 menuParent" style="heigth:100%">
            <div class="row menu" >
                <RouterLink class="nav-link text-menu" to="/">
                    <i class="fa-solid fa-house-user"></i><div class="col-md-1" style="margin-right:1em"></div> Fils d'actualités
                </RouterLink>
            </div>
            <div v-if="loggedIn === false" class="row menu"  >
                <RouterLink class="nav-link text-menu" to="/inscription" >
                    <i class="fa-regular fa-user"></i><div class="col-md-1" style="margin-right:1em"></div> Créer un profil
                </RouterLink> 
            </div>
            <div v-if="loggedIn === true" class="row menu" >
                <button class="nav-link text-menu" @click="(e) => {deconnexion(e)}" style="background-color:transparent;border:none;">
                    <i class="fa-solid fa-right-to-bracket"></i><div class="col-md-1"></div> Se déconnecter
                </button>
            </div>
            <div v-if="loggedIn === false" class="row menu" >
                <RouterLink class="nav-link text-menu" to="/connexion" >
                    <i class="fa-solid fa-right-to-bracket"></i><div class="col-md-1"></div> Se connecter
                </RouterLink>
            </div>
            
      </div> 
      <div class="col-md-9">
        <RouterView @statusConnexion="reloadPage" @update_loggedIn="updateparent"/>
      </div> 
    </div>
  </header>
</template>

<script>
  
export default {
  data () {
      return {
        loggedIn: false
      }
    },
    created() {
        if (localStorage.getItem("loggedIn") === "true")  {
          this.loggedIn = true
          
        }
    },
  methods:{
    deconnexion(e){
      this.loggedIn = false
      e.preventDefault()
      this.$store.commit({type: 'setUserDeconnected'})
      this.$router.push({ path: '/connexion' })
      this.reloadPage()
    },
    reloadPage(){
      this.$forceUpdate();
    },
    updateparent() {
      if(localStorage.getItem("loggedIn") === "true")
        this.loggedIn = true
        else this.loggedIn = false
    }
  },
  beforeCreate: function(){
    var users = []
    fetch("http://localhost:3003/utilisateurs")
    .then(reponse => reponse.json())
    .then(data => {
        users = data ; 
    })
    fetch("http://localhost:3003/articles")
    .then(reponse => reponse.json())
    .then(data => {
      this.$store.articles = data ; 
      this.$store.articles.forEach(article => {
        users.forEach(user => {
          if(article.pseudo == user.pseudo) article.urlImgProfil = user.urlImgProfil
        });
      })
    })
  },
  mounted: function(){
    if (localStorage.getItem("loggedIn") === "true")  {
      this.loggedIn = true
    }else{
      this.loggedIn = false
      this.$forceUpdate()
    } 
  },
}
</script>

<style>
  input{
    margin-top:0.5em;
  }
</style>
