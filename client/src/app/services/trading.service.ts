import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class TradingService {
    constructor(private http: HttpClient) {
    }

    getTrading(coin: string, market: string) {
        let limit = 10;
        let page = 1;

        return this.http.get(`api/trade/history?limit=${limit}&page=${page}&market=${coin}-${market}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    buy(coin: string, market: string, isLimit: boolean, quantity: number, price: number) {
        if (isLimit) {
            return this.http.post(`api/order/limit/buy`, {market: `${coin}-${market}`, quantity: quantity, price: price}, {})
              .toPromise()
              .then(this.extractData)
              .catch(this.handleErrorPromise);
        } else {
            return this.http.post(`api/order/market/buy`, {market: `${coin}-${market}`, quantity: quantity}, {})
              .toPromise()
              .then(this.extractData)
              .catch(this.handleErrorPromise);
        }
    }

    sell(coin: string, market: string, isLimit: boolean, quantity: number, price: number) {
        if (isLimit) {
            return this.http.post(`api/order/limit/sell`, {market: `${coin}-${market}`, quantity: quantity, price: price}, {})
              .toPromise()
              .then(this.extractData)
              .catch(this.handleErrorPromise);
        } else {
            return this.http.post(`api/order/market/sell`, {market: `${coin}-${market}`, quantity: quantity}, {})
              .toPromise()
              .then(this.extractData)
              .catch(this.handleErrorPromise);
        }
    }

    getTradingView(coin: string, market: string) {
        return this.http.get(`api/trading-view?market=${coin}-${market}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
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
