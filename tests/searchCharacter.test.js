import { characters } from './fixtures/characters'

describe('searchCharacter', () => {

  it('gets the character data');

  describe('when there are more than one characters', () => {
    it('gets the first one');
  });

  describe('when there is an HTTP error', () => {
    it('returns a rejected promise with the error');
  });

  describe('when no data is found', () => {
    it('returns "personaje no encontrado"');
  });

});
