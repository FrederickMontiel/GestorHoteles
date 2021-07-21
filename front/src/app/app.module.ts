import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { HotelsService } from './services/hotels.service';
import { AdminheaderComponent } from './components/headers/adminheader/adminheader.component';
import { HotelsheaderComponent } from './components/headers/hotelsheader/hotelsheader.component';
import { ClientheaderComponent } from './components/headers/clientheader/clientheader.component';
import { DefaultheaderComponent } from './components/headers/defaultheader/defaultheader.component';
import { DefaulthomeComponent } from './components/homes/defaulthome/defaulthome.component';
import { ClienthomeComponent } from './components/homes/clienthome/clienthome.component';
import { AdminhomeComponent } from './components/homes/adminhome/adminhome.component';
import { HotelhomeComponent } from './components/homes/hotelhome/hotelhome.component';
import { ProfileuserComponent } from './components/users/profileuser/profileuser.component';
import { LoginuserComponent } from './components/users/loginuser/loginuser.component';
import { RegisteruserComponent } from './components/users/registeruser/registeruser.component';
import { LogoutuserComponent } from './components/users/logoutuser/logoutuser.component';
import { HotelslistComponent } from './components/lists/hotelslist/hotelslist.component';
import { DefaulthotelComponent } from './components/hotels/defaulthotel/defaulthotel.component';
import { ClienthotelComponent } from './components/hotels/clienthotel/clienthotel.component';
import { AdminhotelComponent } from './components/hotels/adminhotel/adminhotel.component';
import { HotelhotelComponent } from './components/hotels/hotelhotel/hotelhotel.component';
import { ReservateuserComponent } from './components/users/reservateuser/reservateuser.component';
import { RoomsService } from './services/rooms.service';
import { UsersService } from './services/users.service';
import { PedidosuserComponent } from './components/users/pedidosuser/pedidosuser.component';
import { UsersComponent } from './components/admin/users/users.component';
import { HotelsComponent } from './components/admin/hotels/hotels.component';
import { HoteladdComponent } from './components/admin/hoteladd/hoteladd.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminheaderComponent,
    HotelsheaderComponent,
    ClientheaderComponent,
    DefaultheaderComponent,
    DefaulthomeComponent,
    ClienthomeComponent,
    AdminhomeComponent,
    HotelhomeComponent,
    ProfileuserComponent,
    LoginuserComponent,
    RegisteruserComponent,
    LogoutuserComponent,
    HotelslistComponent,
    DefaulthotelComponent,
    ClienthotelComponent,
    AdminhotelComponent,
    HotelhotelComponent,
    ReservateuserComponent,
    PedidosuserComponent,
    UsersComponent,
    HotelsComponent,
    HoteladdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HotelsService,
    RoomsService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
