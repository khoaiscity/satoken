import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: "root"})

export class OrderService {
    constructor(private http: HttpClient) {}

    getTradingOrder(coin: string, market: string) {
        return this.http.get(`api/trading-view?market=${coin}-${market}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getPrice(coin: string, market: string) {
        // return this.http.get(`api/price?market=${coin}-${market}`)

        return this.http.get(`api/market/detail?market=${coin}-${market}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getOrderHistoryBuy(coin: string, market: string) {
        let limit = 10;
        let page = 1;

        return this.http.get(`api/order/history?limit=${limit}&page=${page}&market=${coin}-${market}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getOrderHistory(market: string) {
        let limit = 10;
        let page = 1;

        return this.http.get(`api/order/history?limit=${limit}&page=${page}&market=${market}`)
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

