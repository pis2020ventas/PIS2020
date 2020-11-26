import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CartFormPage } from './cart-form.page';

describe('CartFormPage', () => {
  let component: CartFormPage;
  let fixture: ComponentFixture<CartFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CartFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
