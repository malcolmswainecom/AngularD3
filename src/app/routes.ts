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
import { ScatterChartComponent } from './tests/scatter-chart.component';
import { LineChartComponent } from './tests/line-chart.component';
import { DataUpdateComponent } from './tests/data-update.component';
import { BasicTransitionsComponent } from './tests/basic-transitions.component';
import { TransitionalBarChartComponent } from './tests/transitional-bar-chart.component';
import { ToolTipBarChartComponent } from './tests/tool-tip-bar-chart.component';

export const appRoutes: Routes = [
    
    { path: 'home', component: HomeComponent},
    { path: 'tests/lollipop', component: LollipopComponent},
    { path: 'tests/barChart', component: BarChartComponent},
    { path: 'tests/scatter-chart', component: ScatterChartComponent},
    { path: 'tests/line-chart', component: LineChartComponent},
    { path: 'tests/data-update', component: DataUpdateComponent},
    { path: 'tests/basic-transitions', component: BasicTransitionsComponent},
    { path: 'tests/transitional-bar-chart', component: TransitionalBarChartComponent},
    { path: 'tests/tool-tip-bar-chart', component: ToolTipBarChartComponent},
    { path: '404', component: Error404Component },
    { path: '', redirectTo: "tests/barChart", pathMatch: 'full' },

]