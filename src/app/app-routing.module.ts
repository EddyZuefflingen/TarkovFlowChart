import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TarkovQuestGraphComponent} from './components/tarkov-quest-graph/tarkov-quest-graph.component';

const routes: Routes = [{path: 'tarkov-quest-graph', component: TarkovQuestGraphComponent}];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

