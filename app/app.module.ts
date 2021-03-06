import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserAuthComponent } from "./userauth/userauth.component";
import { ReservationModalComponent } from "./reservationmodal/reservationmodal.component";
import { ReservationComponent } from './reservation/reservation.component';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { CommentComponent } from './comment/comment.component';
import { DrawerComponent } from "./shared/drawer/drawer.component";
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { DishService } from './services/dish.service';
import { CouchbaseService } from './services/couchbase.service';
import { FavoriteService } from './services/favorite.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { PlatformService } from './services/platform.service';
import { baseURL } from './shared/baseurl';
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        TNSFontIconModule.forRoot({
        'fa': './fonts/font-awesome.min.css'
      })
    ],
    declarations: [
        AppComponent,
        MenuComponent,
        HomeComponent,
        ContactComponent,
        AboutComponent,
        FavoritesComponent,
        CommentComponent,
        DishdetailComponent,
        UserAuthComponent,
        ReservationComponent,
        ReservationModalComponent,
        DrawerComponent
    ],
    entryComponents: [ReservationModalComponent,
                      CommentComponent],
    providers: [
      {provide: 'BaseURL', useValue: baseURL},
      DishService,
      LeaderService,
      PromotionService,
      FavoriteService,
      CouchbaseService,
      PlatformService,
      ProcessHTTPMsgService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
