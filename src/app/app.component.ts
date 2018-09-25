import { Component } from '@angular/core';
import { HeaderService, Page} from 'od-internal-header';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public headerService : HeaderService){
    const search = new Page();
    search.title = 'Issue Tracker';
    search.routerLink = 'search';
    headerService.pageList.push(search);
    headerService.applicationGroupTitle = 'Group Title';

}
}