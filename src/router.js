import Vue from "vue";
import Router from "vue-router";

import Home from "./pages/Home.vue";
import SignIn from "./pages/SignIn.vue";
import SignUp from "./pages/SignUp.vue";
import About from "./pages/About.vue";
import Accounts from "./pages/Accounts.vue";
import Vehicles from "./pages/Vehicles.vue";
import VehicleType from "./pages/VehicleType.vue";
import Locations from "./pages/Locations.vue";
import Rides from "./pages/Rides.vue";
import Drivers from "./pages/Drivers.vue";
import Passengers from "./pages/Passengers.vue";
import ResetPassword from "./pages/ResetPassword.vue"
import BecomeDriver from "./pages/BecomeDriver.vue"

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        { name: "home-page", path: "/", component: Home },
        { name: "sign-up", path: "/sign-up", component: SignUp },
        { name: "sign-in", path: "/sign-in", component: SignIn },
        { name: "about-us", path: "/about-us", component: About },
        { name: "accounts", path: "/accounts", component: Accounts },
        { name: "vehicles", path: "/vehicles", component: Vehicles },
        { name: "vehicle-type", path: "/vehicle-type", component: VehicleType },
        { name: "locations", path: "/locations", component: Locations },
        { name: "rides", path: "/rides", component: Rides },
        { name: "drivers", path: "/drivers", component: Drivers },
        { name: "passengers", path: "/passengers", component: Passengers },
        { name: "reset-password", path: "/reset-password", component: ResetPassword },
        { name: "become-driver", path: "/become-driver", component: BecomeDriver }
    ]
});
