import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyngFirstUpdateComponent } from './update.component';

describe('MyngFirstUpdateComponent', () => {
  let component: MyngFirstUpdateComponent;
  let fixture: ComponentFixture<MyngFirstUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyngFirstUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyngFirstUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
