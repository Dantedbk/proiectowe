import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    (<HTMLInputElement>document.getElementById('txtEmail')).value='juan';
    (<HTMLInputElement>document.getElementById('txtClave')).value='1234';
    document.getElementById('btnLogin')?.click();
    const resultado = (<HTMLInputElement>document.getElementById('txtResultado')).value;

    expect(resultado).toEqual('Usuario no válido');
  });

  it('return an empty array', () => {
    expect(component.getLista()).toEqual([]);
  });


  
});
