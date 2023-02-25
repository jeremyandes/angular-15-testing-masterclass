import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';

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

    fit('Async test example - plain Promise', fakeAsync(() => {
        let test = false;

        console.log('Creating promise');

        Promise.resolve()
            .then(() => {
                console.log('Promise first then() evaluated successfully');
                test = true;
                return Promise.resolve();
            })
            .then(() => {
                console.log('Promise second then() evaluated successfully');
            });

        console.log('Running test assertions');

        flushMicrotasks();

        expect(test).toBeTruthy();
    }));
});
