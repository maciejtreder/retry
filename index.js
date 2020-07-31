import { RxHR } from '@akanass/rx-http-request';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


function wobblyUrl() {
    var wobbleRate = Math.round(Math.random()) * 10;
    // Backticks are hard for the blog CMS, so no string interpolation.
    console.log('wobbleRate = ' + wobbleRate);
     return (wobbleRate > 5 ? 'http://non-existing-url.com' : 'http://example.com/api');
} 

async function getAndRetry(url, retryCount) {
    return RxHR.get(
        url).pipe(
        catchError(error => {
            console.log('Tried ' + url + ' got ' + error);
            return throwError(error);
        }),
        retry(retryCount),
    ).toPromise();
}

(async () => {
    try {
        const results = await getAndRetry('https://api.mocklets.com/mock68043/', 5);
        console.log(results);
    } catch(error) {
        console.log('The URL fell down!');
    }
})();

// http://httpstat.us/
// http://non-existing.com/api