import { Routes } from '@angular/router'
import { EventListComponent } from './events/event-list.component';
import { EventDetailsComponent } from './events/event-details.component';
import { CreateEventComponent } from './events/create-event.component';
import { Error404Component } from './404.component'
import { EventListResolver } from './shared/events-list-resolver.service'
import { CreateSessionComponent } from './events/ceate-session.component'
import { HomeComponent } from './events/home.component';
import { LollipopComponent } from './tests/lollipop.component';
import { BarChartComponent } from './tests/barChart.component';

export const appRoutes: Routes = [
    { path: 'events', component: EventListComponent, resolve: {events:EventListResolver} },
    { path: 'home', component: HomeComponent},
    { path: 'tests/lollipop', component: LollipopComponent},
    { path: 'tests/barChart', component: BarChartComponent},
    { path: 'events/new', component: CreateEventComponent },
    { path: 'events/:id', component: EventDetailsComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: "tests/barChart", pathMatch: 'full' },
    { path: 'user', loadChildren: './user/user.module#UserModule'},
    { path: 'events/session/new', component:  CreateSessionComponent}
]