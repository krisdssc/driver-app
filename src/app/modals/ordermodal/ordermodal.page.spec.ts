import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdermodalPage } from './ordermodal.page';

describe('OrdermodalPage', () => {
  let component: OrdermodalPage;
  let fixture: ComponentFixture<OrdermodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdermodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdermodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
