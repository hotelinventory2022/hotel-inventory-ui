import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiResponse } from '../../models/apiResponse';
import { Constants } from '../../models/constants';
import { Role } from '../../models/roles';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}
  getRoles(): Observable<apiResponse> {
    return this.http.get<apiResponse>(this.apiBaseUrl + '/Role/GetRoles');
  }
}
