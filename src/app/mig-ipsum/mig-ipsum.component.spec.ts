import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigIpsumComponent } from './mig-ipsum.component';

describe('MigIpsumComponent', () => {
  let component: MigIpsumComponent;
  let fixture: ComponentFixture<MigIpsumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigIpsumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigIpsumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
