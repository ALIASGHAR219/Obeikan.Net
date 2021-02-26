import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { arrayToTree } from 'performant-array-to-tree';

const token = localStorage.getItem('o3token');
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${token}`,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = environment.ApiUrl;
  jwtHelper: any = new JwtHelperService();
  decodedToken: any;
  constructor(private http: HttpClient) {}

  login(model: any): any {
    const flatArray: any = [];
    const setSelectedNodesOnSearch = (node: any): any => {
      flatArray.push(node);
      if (node.children.length) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < node.children.length; i++) {
          setSelectedNodesOnSearch(node.children[i]);
        }
      }
    };
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((respose: any) => {
        const user = respose;
        if (user) {

          localStorage.setItem('token', user.token);
          localStorage.setItem('o3token', 'G71xIMdOn1QDL6lEU1eGi+YbKlpymuHDWKAqfaLo+F8=');
          localStorage.setItem('result', JSON.stringify(user.Result));
          const treeData = arrayToTree(user.Result);
          // tslint:disable-next-line:prefer-for-of
          for (let z = 0; z < treeData.length; z++) {
            const node = treeData[z];
            setSelectedNodesOnSearch(node);
          }
          localStorage.setItem('flatMenuItem', JSON.stringify(flatArray));
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  loggedIn(): any {
    // tslint:disable-next-line: no-shadowed-variable
    // const token = localStorage.getItem('token');
    // const result = !this.jwtHelper.isTokenExpired(token);
    // return !this.jwtHelper.isTokenExpired(token);
    return true;
  }

  signUp(data: any): any {
    return this.http.post<any>(this.baseUrl + 'signup', data, httpOptions);
  }
}
