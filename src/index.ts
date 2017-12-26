import { Markov } from './core/markov';
import { idle } from './seed/idle';

const markov = new Markov();

markov.setSeparator(' ');
markov.learn(idle);
console.log(markov.seedAsk('Russia', 20));