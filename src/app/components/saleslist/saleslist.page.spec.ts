import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleslistPage } from './saleslist.page';

describe('SaleslistPage', () => {
  let component: SaleslistPage;
  let fixture: ComponentFixture<SaleslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleslistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
