<template>
    <b style="margin-left:50em;" v-if="loggedIn === true">Bonjour {{this.pseudo}}</b>
    <!-- Ajouter un nouveau article si l'utilisateur est connecté -->
    <div class="row quoiDeNeuf" v-if="loggedIn === true">
        <h4>Quoi de neuf ? <i class="fa-solid fa-house"></i></h4>
        <form>
            <textarea class="form-control" placeholder="laisser un nouveau post" name="contenu" v-model="contenu" rows="5"></textarea>
            <input class="form-control" type="text" placeholder="url de votre image - taille conseillée 1000x200px" name="urlImgArticle"  v-model="urlImgArticle"/>

            <input type="submit" class="btn btn-success" value="Laisser un nouveau post" style="width:100%;margin-bottom:1em;" @click="nouveauArticle" />
        </form>
    </div>
    <!-- S'il n'ya pas d'articles -->
    <div v-if="this.$store.articles == undefined ">
        <h2>Veuillez vous connecter.</h2>
        <h2 v-if="!loggedIn">Connectez/Inscrivez-vous et créer vos articles.</h2>
        <h2 v-if="loggedIn === true">Créer vos articles.</h2>
    </div>
    <!-- Les articles -->
    <div v-for="(article, index) in this.$store.articles " :key="index" :class="post">
        <div class="post">
            <!-- Header de l'article => Nom de l'utilisateur+photo et la date de l'article -->
            <div class="row headerPost float-parent-element">
                <div class="float-child-element" >
                    <div class="photoUser">
                        <b style="font-size: 1.2em;">{{ article.pseudo }}</b> 
                        <img :src="article.urlImgProfil" class="photoUser-img"/>
                    </div>
                </div>
                <div class="float-child-element">
                    <div class="datePost">créé le {{article.date}}</div>
                </div>
            </div>
            <!-- Image de l'article -->
            <div class="row">
                <img :src="article.urlImgArticle" style="height:300px;" />
            </div>
            <!-- Contenu de l'article -->
            <div class="row contenuPost">
                {{article.contenu}}
            </div>
            <!-- Nombre de commentaire et Like => possibilité de LIKER si l'utilisateur est connecté -->
            <div class="row action float-parent-element">
                <div class="float-child-element"><i class="fa-regular fa-comment"><span class="nb nbComment">{{article.commentaires.length}}</span></i></div>
                <div class="float-child-element">
                    <i class="fa-regular fa-thumbs-up nb-like">
                        <button v-if="loggedIn === true" class="nb nbLike" @click="(e) => {like(e,article)}">
                            {{article.like}}
                        </button>
                        <span v-if="loggedIn === false" class="nb nbLike">
                            {{article.like}}
                        </span>
                    </i>
                </div>
            </div>
            <!-- Les commentaires -->
            <div class="row commentaires">
                <h3>Commentaires :</h3>
                <div v-for="(commentaire, index) in article.commentaires " :key="index" :class="commentaire">
                    <div class="commentaire" style="margin-bottom:0.3em;">
                        <div class="row float-parent-element">
                            <div class="float-child-element">
                                <b style="margin-left:0em;height: 100%; ">{{ commentaire.pseudo }}</b>
                            </div>
                            <div class="float-child-element">
                                <p style="margin-left:10em;height: 100%;">le {{commentaire.dt }}</p>
                            </div>
                        </div>
                        <div class="row" style="padding:0.2em">
                            {{commentaire.contenu}}
                        </div>
                    </div>
                </div>
                <div class="row addCommentaire" v-if="loggedIn === true">
                    <hr style="margin-left:0.5em;margin-top:1em;">
                    <h4>Ajouter un commentaire :</h4>
                    <form>
                        <textarea class="form-control" placeholder="laisser un commentaire" name="contenu" v-model="contenuCommentaire" rows="4"></textarea>

                        <input type="submit" class="btn btn-outline-success" value="Laisser un commentaire" style="width:100%;margin-bottom:1em;" @click="(e)=>{addCommentaire(e,article)}"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            contenu : "",
            urlImgArticle : "",
            contenuCommentaire : "",
            articles : [],
            users : [],
            loggedIn : false,
            pseudo : ''
        }
    },
    created(){
        if (localStorage.getItem("loggedIn") === "true")  {
            this.loggedIn = true
            this.pseudo = localStorage.getItem("pseudoUser")
        }else{
            this.loggedIn = false
            this.pseudo = ''
        } 
    },
    methods:{
        nouveauArticle(e){
            e.preventDefault()
           
            const aujourdui = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric', second :'numeric' };
            const dateArticle = aujourdui.toLocaleDateString('fr-FR', options)
            const article = {
                contenu : this.contenu,
                urlImgArticle : this.urlImgArticle,   
                like : 0,
                pseudo : this.$store.pseudo,
                date : dateArticle ,
                commentaires : []
            }
            fetch("http://localhost:3003/articles", {
                method: "post", 
                headers : {"content-type": "application/json"} , 
                body : JSON.stringify(article)
            })
            .then(reponse => reponse.json())
            .then(data => {
                this.getArticles()
                this.contenu=""
                this.urlImgArticle=""
                
            })
            
        },
        like(e,article){
            e.preventDefault()
            article.like++;
            fetch("http://localhost:3003/articles/"+article.id, {
                method: "put", 
                headers : {"content-type": "application/json"} , 
                body : JSON.stringify(article)
            })
            .then(reponse => reponse.json())
            .then(data => {
                this.getArticles()              
            })
        },
        addCommentaire(e,article){
            e.preventDefault()
            const aujourdui = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric', second :'numeric' };
            const dateCMT = aujourdui.toLocaleDateString('fr-FR', options)
            const commentaire = {
                contenu : this.contenuCommentaire,
                pseudo : this.$store.pseudo,
                dt: dateCMT
            }
            article.commentaires.push(commentaire)
            fetch("http://localhost:3003/articles/"+article.id, {
                method: "put", 
                headers : {"content-type": "application/json"} , 
                body : JSON.stringify(article)
            })
            .then(reponse => reponse.json())
            .then(data => {
                this.getArticles()
                this.contenuCommentaire=""                
            })
        },
        getArticles(){
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
                this.$forceUpdate();
            })
        }
    },
   beforeCreate: function(){
    
  },
  mounted:function(){
      console.log(this.$store.pseudo);
    fetch("http://localhost:3003/utilisateurs")
        .then(reponse => reponse.json())
        .then(data => {
            this.users = data ; 
    })
    fetch("http://localhost:3003/articles")
        .then(reponse => reponse.json())
        .then(data => {
            this.articles = data ; 
            this.articles.forEach(article => {
                this.users.forEach(user => {
                    if(article.pseudo == user.pseudo) article.urlImgProfil = user.urlImgProfil
                });
                this.users= []
            });
            this.$forceUpdate();
    })
    if (localStorage.getItem("loggedIn") === "true")  {
        this.loggedIn = true
        this.pseudo = localStorage.getItem("pseudoUser")
    }else{
        this.loggedIn = false
        this.pseudo = ''
    } 
  }
}
</script>

<style>
input{
    margin-top:0.5em;
  }
</style>