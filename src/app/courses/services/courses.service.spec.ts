import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
    TestRequest,
} from '@angular/common/http/testing';
import { COURSES } from '../../../../server/db-data';
import { Course } from '../model/course';

describe('CoursesService', () => {
    let coursesService: CoursesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CoursesService],
        });

        coursesService = TestBed.inject(CoursesService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    it('should retrieve all courses', () => {
        coursesService.findAllCourses().subscribe((courses) => {
            expect(courses).toBeTruthy('No courses returned');
            expect(courses.length).toBe(12, 'Incorrect number of courses');

            const course = courses.find((course) => course.id === 12);

            expect(course.titles.description).toBe('Angular Testing Course');
        });

        const req = httpTestingController.expectOne('/api/courses');
        expect(req.request.method).toEqual('GET');
        req.flush({
            payload: Object.values(COURSES),
        });
    });

    it('should find a course by id', () => {
        coursesService.findCourseById(12).subscribe((course) => {
            expect(course).toBeTruthy();
            expect(course.id).toBe(12);
        });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('GET');
        req.flush(COURSES[12]);
    });

    it('should save the course data', () => {
        const data: Partial<Course> = {
            titles: {
                description: 'Testing Course',
            },
        };

        coursesService.saveCourse(12, data).subscribe((course) => {
            expect(course).toBeTruthy();
            expect(course.id).toBe(12);
        });

        const req = httpTestingController.expectOne('/api/courses/12');
        expect(req.request.method).toEqual('PUT');
        expect(req.request.body.titles.description).toBe(data.titles.description);

        req.flush({
            ...COURSES[12],
            ...data,
        });
    });

    afterEach(() => {
        httpTestingController.verify();
    });
});
