import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { FormGroup } from '@angular/forms';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should have a pending amount of 0', () => {
    expect(app.pendingAmount).toEqual(0);
  });

  it('should not have an error response', () => {
    expect(app.errorMessage).toBe('');
  });

  it('should not have a response pending', () => {
    expect(app.responsePending).toBeFalse();
  });

  it('should not have a calculation completed', () => {
    expect(app.calculated).toBeFalse();
  });

  it('should have masthead of "Trip Calculator"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.masthead-brand').textContent).toContain('Trip Calculator');
  });

  describe('ngOnInit()', () => {
    it('should have a dynamic form on initialization', () => {
      app.ngOnInit();
      expect(app.dynamicForm instanceof FormGroup).toBeTrue();
    });

    it('should have a single set of inputs on initialization', () => {
      app.ngOnInit();
      expect(app.e.length).toEqual(1);
    });
  });

  describe('addExpense()', () => {
    it('should create an additional set of inputs', () => {
      app.ngOnInit();
      app.addExpense();
      expect(app.e.length).toEqual(2);
    });
  });
});
