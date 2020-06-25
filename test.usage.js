/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var dod2ini = require('.'), equal = require('equal-pmb'),
  fridge, opt, custom, want;

fridge = {
  sandwiches: {
    'cheese + bacon': 1,
    'salmon + onion': 1,
  },
  drinks: {
    water: 2,
    milk: 'empty :-(',
    juice: ['orange', 'grape'],
  },
};

want = [
  '[sandwiches]',
  'cheese + bacon=1',
  'salmon + onion=1',
  '',
  '[drinks]',
  'water=2',
  'milk=empty :-(',
  'juice=orange',
  'juice=grape',
  '',
];
equal(dod2ini(fridge), want);

opt = {
  sectSort: true,
  pairSep: ' = ',
  eol: '\n',
};
custom = dod2ini.cfg(opt);
want = [
  '[drinks]\n',
  'water = 2\n',
  'milk = empty :-(\n',
  'juice = orange\n',
  'juice = grape\n',
  '\n',
  '[sandwiches]\n',
  'cheese + bacon = 1\n',
  'salmon + onion = 1\n',
  '\n',
];
equal(dod2ini(fridge, opt), want);
equal(custom(fridge), want);

opt = { keySort: true };
custom = dod2ini.cfg(opt);
want = [
  '[sandwiches]',
  'cheese + bacon=1',
  'salmon + onion=1',
  '',
  '[drinks]',
  'juice=orange',   // <-- verify that value order is preserved.
  'juice=grape',
  'milk=empty :-(',
  'water=2',
  '',
];
equal(dod2ini(fridge, opt), want);
equal(custom(fridge), want);














console.info('+OK usage test passed.');
