import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable, of} from 'rxjs';
import {PlayerProgress} from 'src/app/shared/interfaces/tarkov/player-progress';
import {Player} from 'src/app/shared/interfaces/tarkov/player';

@Injectable({
	providedIn: 'root',
})
export class TarkovTrackerService {
	private ApiUrl: string = 'https://tarkovtracker.io/api/v2';

	private clientAuthHttpOptions = {};

	constructor(private http: HttpClient) {}

	public setClientAuth(authToken: string): any {
		let clientAuthHttpOptions = {
			headers: new HttpHeaders({
				Authorization: `Bearer ${authToken}`,
			}),
		};

		this.clientAuthHttpOptions = clientAuthHttpOptions;
	}

	public getPlayerProgress(authToken: string): Observable<PlayerProgress> {
		this.setClientAuth(authToken);
		return this.http.get<PlayerProgress>(`${this.ApiUrl}/progress`, this.clientAuthHttpOptions);
	}

	public getOtherPlayerProgress(players: Player[] | undefined): Observable<PlayerProgress[]> {
		if (!players) {
			return new Observable<PlayerProgress[]>((observer) => {
				observer.next([]);
				observer.complete();
			});
		}

		const progressObservables = players.map((player) => {
			// Set client authentication for each player
			this.setClientAuth(player.authToken);

			// Return the HTTP observable for each player
			return this.http.get<any>(`${this.ApiUrl}/progress`, this.clientAuthHttpOptions).pipe(
				map((response) => response.data || response) // Extract "data" if it exists, otherwise return full response
			);
		});

		// Combine all the observables and return a single observable that emits an array of PlayerProgress
		return forkJoin(progressObservables);
	}
}

