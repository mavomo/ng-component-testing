import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Input, NO_ERRORS_SCHEMA} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';
import {HeroComponent} from '../hero/hero.component';

describe('Heroes component should', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let heroesComponent: HeroesComponent;
  const heroServiceMock = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
  const HEROES = [
    {id: 1, name: 'me', strength: 0},
    {id: 2, name: 'superman', strength: 3},
    {id: 3, name: 'wolverine', strength: 4},
  ];

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
  })
  class FakeHeroComponent {
    @Input()
    hero: Hero;
  }

  describe('run *swallow* integration tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          HeroesComponent,
          FakeHeroComponent],
        providers: [
          {provide: HeroService, useValue: heroServiceMock}
        ]
      });
      fixture = TestBed.createComponent(HeroesComponent);
      heroesComponent = fixture.componentInstance;
    });
    it('create a component', () => {
      expect(heroesComponent).toBeTruthy('component should be intialized');
    });

    it('set the heroes correctly from the service', () => {
      heroServiceMock.getHeroes.and.returnValues(of(HEROES));
      fixture.detectChanges();
      expect(heroesComponent.heroes).toEqual(HEROES, 'heroes should be set in the component');
    });

    it('bind the heroes to the DOM as an ordered list', () => {
      heroServiceMock.getHeroes.and.returnValues(of(HEROES));
      fixture.detectChanges();

      const liTag = fixture.debugElement.queryAll(By.css('li'));

      expect(liTag.length).toEqual(3, 'number of heroes should be 3');
    });

  });

  describe('run *deep integration tests*', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HeroesComponent, HeroComponent],
        providers: [
          {provide: HeroService, useValue: heroServiceMock}
        ],
        schemas: [NO_ERRORS_SCHEMA]
      });
      fixture = TestBed.createComponent(HeroesComponent);
      heroesComponent = fixture.componentInstance;
    });

    it('render each hero as HeroComponent', () => {
      heroServiceMock.getHeroes.and.returnValues(of(HEROES));

      fixture.detectChanges();

      const heroComponentDEs = fixture.debugElement.queryAll((By.directive(HeroComponent)));

      expect(heroComponentDEs.length).toBe(3, 'should contain 3 li nodes');
      for (let i = 0; i < heroComponentDEs.length; i++) {
        expect(heroComponentDEs[i].componentInstance.hero.name).toBe(HEROES[i].name, 'should return the name of the first hero');
      }
    });

    it(` calls heroService.deleteHero when the hero component's delete btn is clicked`, () => {
      spyOn(fixture.componentInstance, 'delete');

      heroServiceMock.getHeroes.and.returnValues(of(HEROES));

      fixture.detectChanges();

      const heroComponentDEs = fixture.debugElement.queryAll((By.directive(HeroComponent)));

      clickHeroAction(heroComponentDEs[0]);

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(Object(HEROES[0]));
    });
  });


  function clickHeroAction(debugElement) {
    debugElement.query(By.css('button')).triggerEventHandler('click',
      {
        stopPropagation: () => {
        }
      });
  }

});
