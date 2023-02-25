import { fakeAsync, flush, tick } from '@angular/core/testing';

describe('Async Testing Examples', () => {
    it('Async test example with Jasmine done()', (done: DoneFn) => {
        let test = false;

        setTimeout(() => {
            console.log('running assertions');
            test = true;
            expect(test).toBeTruthy();

            done();
        }, 1000);
    });

    it('Async test example - setTimeout()', fakeAsync(() => {
        let test = false;

        setTimeout(() => {}, 1001);

        setTimeout(() => {
            console.log('running assertions');
            test = true;
        }, 1000);

        // tick(1000);
        flush();
        expect(test).toBeTruthy();
    }));

    fit('Async test example - plain Promise', () => {
        let test = false;

        console.log('Creating promise');

        setTimeout(() => {
            console.log('setTimeout() first callback triggered');
        });

        setTimeout(() => {
            console.log('setTimeout() second callback triggered');
        });

        Promise.resolve()
            .then(() => {
                console.log('Promise first evaluated successfully');
                return Promise.resolve();
            })
            .then(() => {
                console.log('Promise second evaluated successfully');
                test = true;
            });

        console.log('Running test assertions');

        expect(test).toBeTruthy();
    });
});
