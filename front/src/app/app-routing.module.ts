import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginuserComponent } from './components/users/loginuser/loginuser.component';
import { RegisteruserComponent } from './components/users/registeruser/registeruser.component';
import { DefaulthomeComponent } from './components/homes/defaulthome/defaulthome.component';
import { ClienthomeComponent } from './components/homes/clienthome/clienthome.component';
import { AdminhomeComponent } from './components/homes/adminhome/adminhome.component';
import { HotelhomeComponent } from './components/homes/hotelhome/hotelhome.component';
import { LogoutuserComponent } from './components/users/logoutuser/logoutuser.component';
import { ProfileuserComponent } from './components/users/profileuser/profileuser.component';
import { DefaulthotelComponent } from './components/hotels/defaulthotel/defaulthotel.component';
import { ClienthotelComponent } from './components/hotels/clienthotel/clienthotel.component';
import { AdminhotelComponent } from './components/hotels/adminhotel/adminhotel.component';
import { HotelhotelComponent } from './components/hotels/hotelhotel/hotelhotel.component';
import { ReservateuserComponent } from './components/users/reservateuser/reservateuser.component';
import { PedidosuserComponent } from './components/users/pedidosuser/pedidosuser.component';
import { UsersComponent } from './components/admin/users/users.component';
import { HotelsComponent } from './components/admin/hotels/hotels.component';
import { HoteladdComponent } from './components/admin/hoteladd/hoteladd.component';


const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch : 'full'},

  { path: 'login', component: LoginuserComponent },
  { path: 'signup', component: RegisteruserComponent },
  { path: 'logout', component: LogoutuserComponent},

  { path: "home", component: DefaulthomeComponent},
  { path: "pedidos", component: PedidosuserComponent},
  { path: "home/client", component: ClienthomeComponent},
  { path: 'home/admin', component: AdminhomeComponent},
  { path: 'home/hotels', component: HotelhomeComponent},
  { path: 'user/profile', component: ProfileuserComponent},

  { path: 'hotel/:idHotel', component: DefaulthotelComponent },
  { path: 'hotel/client/:idHotel', component: ClienthotelComponent },
  { path: 'hotel/hotel/:idHotel', component: HotelhotelComponent },
  { path: 'hotel/admin/:idHotel', component: AdminhotelComponent },

  { path: 'hotel/client/:idHotel/room/:idRoom', component: ReservateuserComponent },
  { path: 'admin/users', component: UsersComponent},
  { path: 'admin/hotels', component: HotelsComponent},
  { path: 'admin/hotel/add', component: HoteladdComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
