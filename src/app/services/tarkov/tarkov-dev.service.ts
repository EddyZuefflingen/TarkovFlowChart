import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {filter, map, Observable} from 'rxjs';
import {Task} from 'src/app/shared/interfaces/tarkov/task';

@Injectable({
	providedIn: 'root',
})
export class TarkovDevService {
	constructor(private apollo: Apollo) {}

	public getAllQuests(): Observable<Task[]> {
		const GET_QUESTS = gql`
			query GetQuests {
				tasks {
					id
					kappaRequired
					name
					minPlayerLevel
					lightkeeperRequired
					wikiLink
					map {
						name
					}
					trader {
						id
						name
					}
					taskRequirements {
						task {
							id
							kappaRequired
							name
							minPlayerLevel
							lightkeeperRequired
							map {
								name
							}
							trader {
								id
								name
							}
						}
					}
					objectives {
						type
						description
					}
				}
			}
		`;

		return this.apollo
			.query<Task[]>({
				query: GET_QUESTS,
			})
			.pipe(map((m: any) => m.data.tasks));
	}
}

