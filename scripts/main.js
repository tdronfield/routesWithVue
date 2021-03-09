// 1. imports at top
import HomePage from "./components/TheHomePageComponent.js";
import LoginPage from "./components/TheLoginComponent.js";
import Protected from "./components/TheProtectedComponent.js";

// 2. get our vue instance
(() => {
    console.log('fired!');

    // 3. Add Vue Router instance
    const router = new VueRouter({
        routes: [
            { path: "/", component: HomePage },
            { path: "/login", component: LoginPage },
            { 
                path: "/admin", 
                component: Protected,

                beforeEnter: (to, from, next) => {
                    if (!vm.authenicated){
                        // if you aren't logged in, your next stop is the login page
                        next("/login");
                    } else {
                        // if you are logged in, go ahead.
                        next();
                    }
                }
            }
        ]
    })

    // 2. Getting vue instance
    const vm = new Vue({
        data: {
            message: "Hello!",
            authenticated: false,
            user: ""
        },

        created: function(){
            if (window.localStorage.getItem("creds")){
                this.authenicated = true;
                this.user = JSON.parse(window.localStorage.getItem("creds")).name;
            }
        },

        // 4. Tell Our Vue Instance to Tie Two Together
        router
    }).$mount("#app");
})();