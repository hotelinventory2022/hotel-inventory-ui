import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { Constants } from '../../models/constants';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/apiResponse';
import { LoginRequest } from '../../models/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBaseUrl: string = environment.apiBaseUrl;
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginRequest: LoginRequest): Observable<apiResponse> {
    return this.http.post<apiResponse>(
      this.apiBaseUrl + '/Auth/authenticate',
      loginRequest
    );
  }
  getLoggedInUser() {
    const loggedInUserDetails = this.localStorageService.get(
      Constants.LoggedInUserDetails
    );
    if (loggedInUserDetails) {
      return JSON.parse(loggedInUserDetails);
    }
    return loggedInUserDetails;
  }
}
