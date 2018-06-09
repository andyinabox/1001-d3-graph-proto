import '../scss/main.scss';
import data from '../data.json';
import NetworkGraph from './network-graph.js';

const graph = new NetworkGraph('#graph', data);
graph.draw();
