import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  apiLoaded =  new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    console.log('googleMapsService');
    this.httpClient.jsonp(
      `https://maps.googleapis.com/maps/api/js?\
key=${environment.googleMapsKey}`,
        'callback'
    )
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    ).subscribe(resp => {
      this.apiLoaded.next(resp);
    });
  }
}
