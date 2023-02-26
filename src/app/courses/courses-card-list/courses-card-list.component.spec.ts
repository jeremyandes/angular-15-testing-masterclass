import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { CoursesCardListComponent } from './courses-card-list.component';
import { setupCourses } from '../common/setup-test-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CoursesCardListComponent', () => {
    let component: CoursesCardListComponent;
    let fixture: ComponentFixture<CoursesCardListComponent>;
    let debugElement: DebugElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CoursesModule],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(CoursesCardListComponent);
                component = fixture.componentInstance;
                debugElement = fixture.debugElement;
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display the course list', () => {
        component.courses = setupCourses();
        fixture.detectChanges();

        const cards = debugElement.queryAll(By.css('.course-card'));

        expect(cards).toBeTruthy('Could not find cards');
        expect(cards.length).toBe(12, 'Unexpected number of courses');
    });

    it('should create the first course', () => {
        component.courses = setupCourses();
        fixture.detectChanges();

        const course = component.courses[0];
        const card = debugElement.query(By.css('.course-card:first-child'));
        const title = card.query(By.css('mat-card-title'));
        const image = card.query(By.css('img'));

        expect(course).toBeTruthy();
        expect(card).toBeTruthy();
        expect((title.nativeElement as HTMLElement).textContent).toBe(course.titles.description);
        expect((image.nativeElement as HTMLImageElement).src).toBe(course.iconUrl);
    });
});
