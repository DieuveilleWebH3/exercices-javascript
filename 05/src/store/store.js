import { createStore } from 'vuex'
const store = createStore({
    state () {
      return {
        status:false,
        pseudo:"",
        email:"",
        articles : []
      }
    },
    mutations: {
      setUserConnected (state, playload) {
        this.pseudo = playload.user.pseudo
        this.status = true
        this.email = playload.user.email
        console.log('connected !');
        localStorage.setItem('loggedIn', "true");
        localStorage.setItem('pseudoUser', this.pseudo);
      },
      setUserDeconnected(state){
        this.pseudo = ""
        this.status = false
        this.email = ""
        console.log('deconnected !');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('pseudoUser');
        localStorage.clear();
      }
    }
})

export default store;