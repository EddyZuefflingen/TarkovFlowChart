import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarkovQuestGraphComponent } from './tarkov-quest-graph.component';

describe('TarkovQuestGraphComponent', () => {
  let component: TarkovQuestGraphComponent;
  let fixture: ComponentFixture<TarkovQuestGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarkovQuestGraphComponent]
    });
    fixture = TestBed.createComponent(TarkovQuestGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
