import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from '../components/search/search.component';
import { UpdateComponent } from '../components/update/update.component';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { AuthGuard } from '../services/auth-guard.service';

/**
 * Define all available routes in the application.
 * The routes the canActivate can only be accessed when the AuthGuard
 * determines that you are authorized. Those without can be accessed
 * by anyone.
 */
const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: SearchComponent },
  { path: 'search', canActivate: [AuthGuard], component: SearchComponent },
  { path: 'update', canActivate: [AuthGuard], component: UpdateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
