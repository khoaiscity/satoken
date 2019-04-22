import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userUrl =
    "http://172.104.54.206/oauth.stg/oauth.exng/public/api/signIn";

  login(): any {
    const data = {
      password: "Tuan@123",
      grant_type: "password",
      client_id: "YFKCOy5dOskKBfxKruVxqRb89igeAiO8",
      secret: "8T3xSVrswcXAVMSy6kCLxhUfqWsliTPhEa8Lih22",
      username: "traimongamgiam001@gmail.com"
    };

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    this.http
      .post(this.userUrl, data, {
        headers: new HttpHeaders().set("Content-Type", "application/json")
      })
      .subscribe(res => {
        console.log(res);
      });

    // return this.http.post(this.userUrl, data, httpOptions).subscribe((res: any) => {
    //   console.log(res);
    // });
  }
}
