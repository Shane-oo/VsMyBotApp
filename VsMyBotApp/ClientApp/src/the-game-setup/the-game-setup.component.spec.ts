import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheGameSetupComponent } from './the-game-setup.component';

describe('TheGameSetupComponent', () => {
  let component: TheGameSetupComponent;
  let fixture: ComponentFixture<TheGameSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheGameSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheGameSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
