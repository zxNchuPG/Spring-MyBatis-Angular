import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MyngFirstInfoComponent } from './info.component';

describe('MyngFirstInfoComponent', () => {
  let component: MyngFirstInfoComponent;
  let fixture: ComponentFixture<MyngFirstInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyngFirstInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyngFirstInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
