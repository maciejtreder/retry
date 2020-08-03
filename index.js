import { RxHR } from '@akanass/rx-http-request';
import { retry, catchError, tap } from 'rxjs/operators';
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
            tap(response => {
                if (response.response.statusCode >= 400)
                    throw new Error(`StatusCode: ${response.response.statusCode}`)
            }),
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
        console.log(results.body);
    } catch(error) {
        console.log('The URL fell down!');
    }
})();

// http://httpstat.us/
// http://non-existing.com/api