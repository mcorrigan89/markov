import { MemoryStructure } from '../core/markov';

export interface IAdaptor {
  getData(): MemoryStructure;
  setData(data: MemoryStructure): void;
};