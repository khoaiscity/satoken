import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class ExchangeService {
    constructor(private http: HttpClient) {}

    getMarket(coin: string, market: string) {
        if (coin != null && market != null) {
            return this.http.get(`api/market?from=${coin}&to=${market}`)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleErrorPromise);
        } else if (coin != null) {
            return this.http.get(`api/market?from=${coin}`)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleErrorPromise);
        } else if (market != null) {
            return this.http.get(`api/market?to=${market}`)
                .toPromise()
                .then(this.extractData)
                .catch(this.handleErrorPromise);
        } else {
            return this.http.get('api/market')
                .toPromise()
                .then(this.extractData)
                .catch(this.handleErrorPromise);
        }
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private handleErrorPromise(error: Response | any) {
        console.log("An error occurred", error);
        return Promise.reject(error.message || error);
    }
}
