import { NgModule } from '@angular/core';
import{ Routes, RouterModule} from '@angular/router'
import { SearchComponent } from '../components/search/search.component';
import { UpdateComponent } from '../components/update/update.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { LogoutComponent } from '../components/auth/logout/logout.component';
import { AuthGuard } from '../components/auth/auth-guard.service';

const routes: Routes =[
  {path: '', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', canActivate: [AuthGuard],component: LogoutComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
