import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Subject, Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UploadService {
  private uploaded = new BehaviorSubject<boolean>(false);
  uploaded$ = this.uploaded.asObservable();

  constructor(private http: HttpClient) {
    console.log('upload service');
  }

  upload(file: File, url: string, keyName: string): Observable<number> {

    const formData = new FormData();

    formData.append(keyName, file, file.name);

    const req = new HttpRequest(
      'POST',
      url,
      formData,
      { reportProgress: true }
    );

    const progress = new Subject<number>();

    this.http.request(req)
    .pipe(
      catchError(error => {
        progress.error('Error al subir archivo');
        return throwError(error);
      })
    ).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);

        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        progress.complete();
      }
    });

    return progress.asObservable();
  }

  updateUploadedStatus(status: boolean): void {
    this.uploaded.next(status);
  }

  completeUploadedSubject(): void {
    this.uploaded.complete();
  }
}
