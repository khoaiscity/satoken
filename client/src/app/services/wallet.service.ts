import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from '@angular/common';

@Injectable({providedIn: "root"})

export class WalletService {
    constructor(private http: HttpClient,
                private datePipe: DatePipe) {}

    getAmount(coin: string) {
        let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

        return this.http.get(`api/wallet/balance?wallet_type=${coin}&transaction_date=${today}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getWallets() {
        let page = 1;
        let limit = 10;
        let today = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

        return this.http.get(`api/wallets?page=${page}&limit=${limit}&transaction_date=${today}`)
          .toPromise()
          .then(this.extractData)
          .catch(this.handleErrorPromise);
    }

    getTransactions() {
        let limit = 10;
        let page = 1;

        return this.http.get(`api/statement/list?limit=${limit}&page=${page}`)
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
