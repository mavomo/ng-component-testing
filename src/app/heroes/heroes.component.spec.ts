import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeroesComponent} from './heroes.component';
import {Component, Input} from '@angular/core';
import {HeroService} from '../hero.service';
import {of} from 'rxjs';
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';

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
