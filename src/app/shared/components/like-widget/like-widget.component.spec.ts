import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UniqueIdService } from '../../services/unique-id/unique-id.service';
import { LikeWidgetComponent } from './like-widget.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

describe(LikeWidgetComponent.name, () => {
  let component: LikeWidgetComponent | null = null;
  let fixture: ComponentFixture<LikeWidgetComponent> | null = null;
  //é um wrapper, que dentro dele vai ter a instancia do componente
  //onde eu posso chamar seus métodos e propriedades
  //e inclui outros métodos utilitários que posso utilizar pra criar testes

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetComponent, FontAwesomeModule],
      providers: [UniqueIdService]
    }).compileComponents();
    /*
      aguarda a compilacao do componente (html e ts),
      porque por debaixo dos panos o angular busca o template usando uma requisicao assincrona
      funciona sem o async/await se o CLI utiliza webpack (template inline) pra buildar o projeto
      caso isso mude, é preciso rodar com async/await
    */

      fixture = TestBed.createComponent(LikeWidgetComponent);
      component = fixture.componentInstance;
  });

  it("Should create component", () => {
    expect(component).toBeTruthy();
  });

  it("Should auto-generate id during ngOnInit when (@Input id) is not assigned", () => {
    fixture?.detectChanges();
    expect(component?.id).toBeTruthy();
  });

  it("Should NOT auto-generate id during ngOnInit when (@Input id) is assigned", () => {
    const someId = "someId";

    if (component) {
      component.id = someId;
    }

    fixture?.detectChanges();
    expect(component?.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
      spyOn<EventEmitter<void> | any>(component?.liked, "emit");
      fixture?.detectChanges();
      component?.like();
      expect(component?.liked.emit).toHaveBeenCalled();

      /*component?.liked.subscribe(() => {
        expect(true).toBeTrue();
        done();
      });*/
  });
});

