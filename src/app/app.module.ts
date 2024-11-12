//Angular Material Stuff
import {MaterialModule} from './modules/material/material.module';
import {FormsModule} from '@angular/forms';

//Other Stuff
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

//font-awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

//flex-layout library
import {FlexLayoutModule} from '@angular/flex-layout';
import {TarkovQuestGraphComponent} from './components/tarkov-quest-graph/tarkov-quest-graph.component';

//ngx-graph
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {GraphQLModule} from './graphql.module';

@NgModule({
	declarations: [AppComponent, TarkovQuestGraphComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		NgxGraphModule,
		HttpClientModule,
		FormsModule,
		GraphQLModule,
		FontAwesomeModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
