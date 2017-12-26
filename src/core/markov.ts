import { IAdaptor } from '../adaptor/adaptor';

export interface MemoryStructure {
  [key:string]: Array<string>;
}

export interface IMarkov {
  setSeparator(separator: string): void;
  clearMemory(): void;
  learn(txt: string): void;
  ask(length: number): string;
  addMemoryAdaptor?(adaptor: IAdaptor): void;
  printMemory(): MemoryStructure;
}

export class Markov implements IMarkov {

  private memory: MemoryStructure = {};
  private separator: string = '';

  public learn(txt: string) {
    let parts = txt.split(this.separator);
    let prev = '';

    parts.reduce((memory, letter) => {
      if (!memory[prev]) {
        memory[prev] = [];
      }
      memory[prev].push(letter);
      prev = letter;
      return memory;
    }, this.memory)
  }

  public seedAsk(seed: string, length: number) {
    return this.step(length, seed);
  }

  public ask(length: number) {
    return this.step(length);
  }

  public setSeparator(separator: string) {
    this.separator = separator;
  }

  public clearMemory() {
    this.memory = {};
  }

  public printMemory() {
    return this.memory;
  }

  private step(length: number, state: string = ''): string {
    if (!length) {
      return state;
    }
    let nextState = this.memory[state] || [''];
    let next = nextState[Math.floor(Math.random()*nextState.length)]
    if (!next) {
      return state;
    }
    return state + this.separator + this.step(length - 1, next);
  }
}