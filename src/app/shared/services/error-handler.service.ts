import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {LogService} from './log.service';

@Injectable({
	providedIn: 'root',
})
export class ErrorHandlerService {
	constructor(private logger: LogService) {}

	public handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			this.logger.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}
}

