import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MalcsComponent } from './malcs.component';
import { EventListComponent } from './events/event-list.component';
import { CreateEventComponent } from './events/create-event.component';
import { EventDetailsComponent } from './events/event-details.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { NavComponent } from './nav/nav.component';
import { EventService } from './shared/event.service'
import { ToastrService } from './shared/toastr.service'
import { Error404Component } from './404.component'
import { EventListResolver } from './shared/events-list-resolver.service'
import { CreateSessionComponent } from './events/ceate-session.component'


import { appRoutes } from './routes'
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SessionListComponent } from './events/session-list.component';
import { CollapsibleWellComponent } from './shared/collapsible-well.component'
import { DurationPipe } from './shared/duration.pipe';

import { HomeComponent } from './events/home.component';
import { LollipopComponent } from './tests/lollipop.component';
import { BarChartComponent } from './tests/barChart.component';
import { ScatterChartComponent } from './tests/scatter-chart.component';
import { LineChartComponent } from './tests/line-chart.component';
import { DataUpdateComponent } from './tests/data-update.component';
import { BasicTransitionsComponent } from './tests/basic-transitions.component';
import { TransitionalBarChartComponent } from './tests/transitional-bar-chart.component';
import { ToolTipBarChartComponent } from './tests/tool-tip-bar-chart.component';

@NgModule({
  declarations: [
    MalcsComponent,
    EventListComponent,
    CreateEventComponent,
    EventDetailsComponent,
    EventThumbnailComponent,
    NavComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    HomeComponent,
    LollipopComponent,
    BarChartComponent,
    ScatterChartComponent,
    LineChartComponent,
    DataUpdateComponent,
    BasicTransitionsComponent,
    TransitionalBarChartComponent,
    ToolTipBarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventService, ToastrService, EventListResolver, AuthService],
  bootstrap: [MalcsComponent]
})
export class AppModule { }
