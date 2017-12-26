import { Markov, MemoryStructure } from './markov';
import { IAdaptor } from '../adaptor/adaptor';

describe('Markov Class', () => {
  test('will learn()', () => {
    let markov = new Markov();
    markov.learn('aab');
    let mockMemory: MemoryStructure = {
      '': ['a'],
      'a': ['a', 'b']
    };
    expect(markov.printMemory()).toEqual(mockMemory)
  });

  test('will update separator on setSeparator()', () => {
    let markov = new Markov();
    markov.setSeparator(' ');
    markov.learn('foo bar bar');
    let mockMemory: MemoryStructure = {
      '': ['foo'],
      'foo': ['bar'],
      'bar': ['bar']
    };
    expect(markov.printMemory()).toEqual(mockMemory);
  });

  test('prints on ask()', () => {
    let markov = new Markov();
    markov.setSeparator(' ');
    const learnedString = 'foo bar';
    markov.learn(learnedString);
    expect(markov.ask(3)).toEqual(' ' + learnedString);
  });

  test('prints on seedAsk() with seed word first', () => {
    let markov = new Markov();
    markov.setSeparator(' ');
    const learnedString = 'foo bar bar';
    markov.learn(learnedString);
    expect(markov.seedAsk('foo', 3).split(' ')[0]).toEqual('foo');
  });

  test('should clear memory on clearMemory()', () => {
    let markov = new Markov();
    markov.setSeparator(' ');
    markov.learn('foo bar bar');
    let mockMemory: MemoryStructure = {
      '': ['foo'],
      'foo': ['bar'],
      'bar': ['bar']
    };
    expect(markov.printMemory()).toEqual(mockMemory);
    markov.clearMemory();
    expect(markov.printMemory()).toEqual({});
  });

  test('constructor() called with seed data', () => {
    let mockMemory: MemoryStructure = {
      '': ['foo'],
      'foo': ['bar'],
      'bar': ['bar']
    };
    let dataMock: IAdaptor = {
      getData: () => mockMemory,
      setData: (data) => null
    };

    let markov = new Markov(dataMock);
    expect(markov.printMemory()).toEqual(mockMemory);
  });
})