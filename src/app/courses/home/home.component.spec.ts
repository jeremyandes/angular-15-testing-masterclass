import { DebugElement } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CoursesModule } from '../courses.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesService } from '../services/courses.service';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { click } from '../common/test-utils';

describe('CoursesCardListComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let debugElement: DebugElement;
    let coursesService: any;

    const begginerCourses = setupCourses().filter((course) => course.category === 'BEGINNER');
    const advancedCourses = setupCourses().filter((course) => course.category === 'ADVANCED');

    beforeEach(waitForAsync(() => {
        const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

        TestBed.configureTestingModule({
            imports: [CoursesModule, NoopAnimationsModule],
            providers: [
                {
                    provide: CoursesService,
                    useValue: coursesServiceSpy,
                },
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(HomeComponent);
                component = fixture.componentInstance;
                debugElement = fixture.debugElement;
                coursesService = TestBed.inject<CoursesService>(CoursesService);
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display only beginner courses', () => {
        coursesService.findAllCourses.and.returnValue(of(begginerCourses));
        fixture.detectChanges();

        const tabs = debugElement.queryAll(By.css('.mdc-tab'));

        expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
    });

    it('should display only advanced courses', () => {
        coursesService.findAllCourses.and.returnValue(of(advancedCourses));
        fixture.detectChanges();

        const tabs = debugElement.queryAll(By.css('.mdc-tab'));

        expect(tabs.length).toBe(1, 'Unexpected number of tabs found');
    });

    it('should display both tabs', () => {
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = debugElement.queryAll(By.css('.mdc-tab'));

        expect(tabs.length).toBe(2, 'Unexpected number of tabs found');
    });

    it('should display advanced courses when tab clicked', () => {
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));
        fixture.detectChanges();

        const tabs = debugElement.queryAll(By.css('.mdc-tab'));

        click(tabs[1]);
        fixture.detectChanges();

        const titles = debugElement.queryAll(By.css('.mat-mdc-card-title'));

        expect(titles).toBeTruthy();
        expect(titles.length).toBeGreaterThan(0, 'Could not find card titles');
        expect((titles[0].nativeElement as HTMLElement).textContent).toContain('Angular Security Course');
    });
});
