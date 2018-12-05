import {HeroComponent} from './hero.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('Hero component should', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let heroComponent: HeroComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
    heroComponent = fixture.componentInstance;
  });

  it('have the correct hero', () => {
    heroComponent.hero = {id: 1, name: 'super', strength: 3};

    expect(heroComponent.hero.name).toEqual('super', 'the name should be *super*');
  });

  it('render the hero name in an anchor tag', () => {
    heroComponent.hero = {id: 1, name: 'super', strength: 3};

    const anchorTag = fixture.nativeElement.querySelector('a');
    fixture.detectChanges();

    expect(anchorTag.textContent).toContain(  'super', 'the name should be *super*');
  });

});


