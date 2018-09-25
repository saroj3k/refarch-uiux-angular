import { NgModule } from '@angular/core';
import{ Routes, RouterModule} from '@angular/router'
import { SearchComponent } from '../components/search/search.component';
import { AddComponent } from '../components/add/add.component';
import { UpdateComponent } from '../components/update/update.component';

const routes: Routes =[
  {path: '', component: SearchComponent},
  {path: 'search', component: SearchComponent},
  {path: 'add', component: AddComponent},
  {path: 'update', component: UpdateComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
