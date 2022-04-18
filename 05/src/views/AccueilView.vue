<template>
  <main class="accueil">
    <div class="row container">
        <div class="all">
            <div class="posts">
                <ArticlesView/>
            </div>
        </div>
    </div>
  </main>
</template>
<script>
import ArticlesView from '../components/ArticlesView.vue'
export default {
    
    methods:{
        reloadPage(){
            this.$forceUpdate()
        }
    },
    components:{ArticlesView}
}
</script>

<style lang="scss">
    .quoiDeNeuf{
        margin-bottom:2em;
        padding-top:1em;
        border: 0.5mm ridge rgba(211, 220, 50, .6);
        background-color:#FBF9F8;
    }
    @media (min-width: 1024px) {
        .accueil {
            min-height: 100vh;
            margin-left:4.4em;
            display: flex;
            align-items: center;
            width:100%;
        }
    }
    .menuParent{
        text-align: center;
        border: 0.5mm ridge rgba(211, 220, 50, .6);
    }
    .menu{
        margin:1em;
        border-bottom: 1.5mm ridge rgba(211, 220, 50, .6)
    }
    .text-menu{
        text-decoration:none;
        color:black;
        font-size: smaller;
    }
    .text-menu:hover{
        color:rgba(211, 220, 50, .6);
    }
    .post{
        border:1px solid black;
        background-color:#ffffff;
        margin-bottom:1em;
    }
    .contenuPost{
        padding:1em;
    }
    .headerPost{
        margin-right:0.01em;
        margin-left:0.01em;
        display: flex;
        background-color:#FBF9F8;
    }
    .float-parent-element { 
        width: 100%; 
    } 
    .float-child-element { 
        float: left; 
        width: 50%; 
    } 
    .photoUser { 
        height: 100%; 
    } 
    .photoUser-img{
        border-radius: 50%;
        height:40px;
        width:40px;
    }
    .datePost { 
        margin-top:0.5em;
        margin-left:10em;
        height: 100%; 
    }.action{
        background-color:#F4F4F4;
        margin-left:0em;
        width:100%;
        border-top:1px solid #CEBDB8;
    }
    .nb{
        font-size:1.3em;
        padding-right:0.1em;
        padding-left:0.1em;
    }
    .nbLike{
        background-color:blue;
        color:white;
        border-radius: 10% / 50%;
    }
    .nb-like{
        margin-left:23em;
    }
    .nbComment{
        background-color:green;
        color:white;
        border-radius: 10% / 50%;
    }
    
    .commentaires{
        padding-left:0.6em;
    }
    .commentaire{
        margin-left:1.2em;margin-top:1em;border-style: inset;width:95%;
        padding-left:1em;
    }
</style>