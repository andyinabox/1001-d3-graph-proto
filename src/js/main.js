import '../scss/main.scss';
import data from '../data.json';
import fonts from 'google-fonts';

import NetworkGraph from './network-graph.js';

fonts.add({
  'EB Garamond' : true
});

const graph = new NetworkGraph('#graph', data);
graph.draw();
