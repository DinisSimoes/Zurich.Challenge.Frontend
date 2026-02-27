import { Injectable } from '@angular/core';
import { InsuranceReport } from '../../features/report.component/models/insurance-report.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InsuranceService {
  private readonly baseUrl = `${environment.apiUrl}/insurances`;

  constructor(private http: HttpClient) {}

  getReport(): Observable<InsuranceReport> {
    return this.http.get<InsuranceReport>(`${this.baseUrl}/report`);
  }

  getPagedInsurances(page: number, pageSize: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }
}
