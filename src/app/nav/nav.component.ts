import {Component} from '@angular/core'
import { AuthService } from '../user/auth.service'
import { ISession } from '../shared/event.model';
import { EventService } from '../shared/event.service';


@Component({
    selector: 'nav-bar',
    templateUrl : './nav.component.html',
    styles: [`
        .nav.navbar-nav {font-size: 15px;}
        #searchForm {margin-right: 100px;}
        @media (max-width: 1200px) {#searchForm {display:none}}
        li > a.active { color: #F97924 }
  `]
})

export class NavComponent {

  searchTerm: string;
  foundSessions: ISession[];

  constructor(private authService:AuthService, private eventService: EventService){
    
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    })
  }
}