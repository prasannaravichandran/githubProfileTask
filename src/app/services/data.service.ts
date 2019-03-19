import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    public url = '//api.github.com/users';
    constructor(private http: HttpClient) {}
    /*
    * Service to get the user details
    * @username : User name
    */
    getUserdetails(username: string) {
        return this.http.get(this.url + '/' + username);
    }
    /*
    * Service to get the follower details
    * @url : Followers list url
    */
    getFollowersdetails(url: string) {
        return this.http.get(url);
    }

    /*
    * Service to get the Repository details
    * @url : Repository url
    */
    getRepodetails(url: string) {
        return this.http.get(url);
    }
}
