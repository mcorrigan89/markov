import { IAdaptor } from '../adaptor/adaptor';

export interface MemoryStructure {
  [key:string]: Array<string>;
}

export interface IMarkov {
  setSeparator(separator: string): void;
  clearMemory(): void;
  learn(txt: string): void;
  ask(length: number): string;
  printMemory(): MemoryStructure;
}

export class Markov implements IMarkov {

  private memory: MemoryStructure = {};
  private separator: string = '';

  constructor(private datasource?: IAdaptor) {
    if (this.datasource) {
      this.memory = this.datasource.getData();
    }
  }

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
    if (this.datasource) 
      this.datasource.setData(this.memory);
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
    if (this.datasource)
      this.datasource.setData(this.memory);
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