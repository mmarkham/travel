import {CalcTripLength} from '../src/client/js/tripLength';
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe('Test the function CalcTripLength()' , () => {
      test('Test that the function is defined', async () => {
          expect(CalcTripLength).toBeDefined();
      });  
    });