<template>

    <!-- Ajouter un nouveau article si l'utilisateur est connecté -->
    <div class="row sup mt-5" v-if="loggedIn === true">
        <h4>Quoi de neuf ? <i class="fa-solid fa-house"></i></h4>
        <form>
            <textarea class="form-control" placeholder="laisser un nouveau post" name="contenu" v-model="contenu" rows="5" required></textarea>
            <input class="form-control" type="text" placeholder="url de votre image - taille conseillée 1000x200px" name="urlImgArticle"  v-model="urlImgArticle"/>

            <div class='js-errorAdd text-center' style="color: red;"></div>

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
                    <div class="user-pic">
                        <b style="font-size: 1.2em;">{{ article.pseudo }}</b> 
                        <img :src="article.urlImgProfil" class="user-img"/>
                    </div>
                </div>

                <div class="float-child-element">
                    <div class="datePost">posté le {{ (new Date(article.date)).getDate()+
                        "/"+((new Date(article.date)).getMonth()+1)+
                        "/"+(new Date(article.date)).getFullYear()+
                        " à "+(new Date(article.date)).getHours()+
                        ":"+(new Date(article.date)).getMinutes()+
                        ":"+(new Date(article.date)).getSeconds() }}
                    </div>
                </div>
            </div>

            <!-- Image de l'article -->
            <div class="row">
                <img :src="article.urlImgArticle" style="height:450px;" />
            </div>

            <!-- Contenu de l'article -->
            <div class="row contenuPost">
                {{article.contenu}}
            </div>

            <!-- Nombre de commentaire et Like => possibilité de LIKER si l'utilisateur est connecté -->
            <div class="row action float-parent-element">
                <div class="float-child-element"><i class="fa-regular fa-comment"><span class="nb nbComment">{{article.commentaires.length}}</span></i></div>
                <div class="float-child-element">
                    <i class="fa-regular fa-thumbs-up nb-like" @click="(e) => {like(e,article)}">
                        <button v-if="loggedIn === true" class="nb nbLike">
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
                                <p style="margin-left:10em;height: 100%;">le {{ (new Date(commentaire.dt)).getDate()+
                                    "/"+((new Date(commentaire.dt)).getMonth()+1)+
                                    "/"+(new Date(commentaire.dt)).getFullYear()+
                                    " à "+(new Date(commentaire.dt)).getHours()+
                                    ":"+(new Date(commentaire.dt)).getMinutes()+
                                    ":"+(new Date(commentaire.dt)).getSeconds() }}
                                </p>
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
                        <textarea class="form-control" placeholder="laisser un commentaire" name="contenu" v-model="contenuCommentaire" rows="4" required></textarea>

                        <div v-bind:id="article.id" class="text-center" style="color: red;"></div>

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

            // We make sure the content wad given
            if( ( this.contenu === '') || ( this.contenu === undefined ) ) 
            {
                document.querySelector(".js-errorAdd").innerHTML = "Veuillez écrire votre post";
                
                return 0
            }

            const date_now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute: 'numeric', second :'numeric' };
            const created_at = date_now.toLocaleDateString('fr-FR', options)
            
            const article = {
                contenu : this.contenu,
                urlImgArticle : this.urlImgArticle,   
                like : 0,
                pseudo : this.$store.pseudo,
                // date: created_at,
                date: date_now.getTime(),
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

            var the_pseudo = "";

            if (localStorage.getItem("loggedIn") === "true")  
            {
                // console.log("\n");
                // console.log("************************ Getting the user pseudo ********************************");
                // console.log(localStorage.getItem("pseudoUser"));

                the_pseudo = localStorage.getItem("pseudoUser");
            }


            // console.log("\n");
            // console.log("******************** The article id for the comment outside **************************");
            // console.log(article.id);
            // console.log("\n");
            // console.log(document.getElementById(article.id));

            var the_id = article.id;


            // We make sure the content wad given
            if( ( this.contenuCommentaire === '') || ( this.contenuCommentaire === undefined ) ) 
            {
                // var the_id = "js-errorAdd" + toString(article.id);

                document.getElementById(the_id).innerHTML = "Veuillez écrire votre commentaire";
                
                return 0
            }

            const date_now = new Date();

            const commentaire = {
                contenu : this.contenuCommentaire,
                pseudo : the_pseudo,
                dt: date_now.getTime()
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
    //   console.log(this.$store.pseudo);
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