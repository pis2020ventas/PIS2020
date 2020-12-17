import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RankingclientesPage } from './rankingclientes.page';

describe('RankingclientesPage', () => {
  let component: RankingclientesPage;
  let fixture: ComponentFixture<RankingclientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingclientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RankingclientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
