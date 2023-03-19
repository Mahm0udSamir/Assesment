import { Assesment } from './../types/assesment.interface';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class GetAssesmentsService {
  constructor(private http: HttpClient) {}

  getAllAssesments(): Observable<Assesment[]> {
    const url = environment.apiUrl + '/assessments';

    return this.http.get<Assesment[]>(url).pipe(map((response) => response));
  }
}
