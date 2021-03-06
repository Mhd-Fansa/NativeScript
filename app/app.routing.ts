import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { UserAuthComponent } from "./userauth/userauth.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "favorites", component: FavoritesComponent },
    { path: "contact", component: ContactComponent },
    { path: "about", component: AboutComponent },
    { path: "auth", component: UserAuthComponent },
    { path: "reservation", component: ReservationComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent },
    { path: "menu", component: MenuComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
