import {
  searchCharacter
} from '../src/searchRick';
import {
  characters
} from './fixtures/characters';
import fetch from 'node-fetch';

jest.mock('node-fetch');



describe('searchCharacter', () => {

  it('gets the character data', async () => {
    const response = {
      status: 200,
      json: () => {
        return {
          results: [characters['annie']]
        }
      }
    }

    fetch.mockResolvedValueOnce(response);

    const data = await searchCharacter('Aqua');
    expect(data.name).toBe('Aqua Morty');

  })

  describe('when there are more than one characters', () => {
    it('gets the first one', async () => {
      const response = {
        status: 200,
        json: () => {
          return {
            results: [characters['annie'], characters['attila']]
          }
        }
      }

      fetch.mockResolvedValueOnce(response);

      const data = await searchCharacter('Aqua');
      expect(data.name).toBe('Aqua Morty');
    });
  });

  describe('when there is an HTTP error', () => {
    it('returns a rejected promise with the error', async () => {
      const response = {
        status: 500
      }

      fetch.mockResolvedValueOnce(response);

      try {
        await searchCharacter('Jaime');
      } catch (error) {
        expect(error).toBe(`Error: 500`);
      }
    });
  });

  describe('when no data is found', () => {
    it('returns "personaje no encontrado"', async () => {
      const response = {
        status: 404
      }

      fetch.mockResolvedValueOnce(response);

      try {
        await searchCharacter('Jaime');
      } catch (error) {
        expect(error).toBe(`Personaje no encontrado`);
      }
    });
  });


});