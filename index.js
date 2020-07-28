import { RxHR } from '@akanass/rx-http-request';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

async function getAndRetry(url, retryCount) {
    return RxHR.get(url).pipe(
        catchError(error => {
            console.log('This is just to ensure that call has been repeated');
            return throwError(error);
        }),
        retry(retryCount),
    ).toPromise();
}

(async () => {
    try {
        const results = await getAndRetry('http://non-existing.com', 3);
        console.log(results);
    } catch(error) {
        console.log('error catched');
    }
})();