import { DebugElement } from '@angular/core';
import { ComponentFixture, waitForAsync, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CoursesModule } from '../courses.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesService } from '../services/courses.service';

describe('CoursesCardListComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let debugElement: DebugElement;

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
            });
    }));

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display only beginner courses', () => {
        pending();
    });

    it('should display only advanced courses', () => {
        pending();
    });

    it('should display both tabs', () => {
        pending();
    });

    it('should display advanced courses when tab clicked', () => {
        pending();
    });
});