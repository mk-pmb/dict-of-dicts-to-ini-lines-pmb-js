/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function ifUndef(x, d) { return (x === undefined ? d : x); }

function eachKey(dict, sortCmp, iter) {
  var keys = Object.keys(dict);
  if (sortCmp) {
    if (sortCmp === true) { keys.sort(); } else { keys.sort(sortCmp); }
  }
  keys.forEach(iter);
}

function translateValues(d, v) {
  var t = (v && typeof v), s, l;
  if (t === 'string') { return v; }
  s = String(v);
  l = d[s];
  if (l === undefined) { return s; }
  if (l === null) { return undefined; }
  return l;
}

function dod2ini(sectionsDict, opt) {
  if (!opt) { opt = false; }
  var lines = [],
    transVal = opt.translateValues,
    skipSectionName = ifUndef(opt.skipSectionName, '\n'),
    pairSep = ifUndef(opt.pairSep, '='),
    pairInd = String(opt.pairInd || ''),
    eol = ifUndef(opt.eol, '');
  if (transVal && ((typeof transVal) !== 'function')) {
    transVal = translateValues.bind(null, transVal);
  }
  eachKey(sectionsDict, (opt.sectSort || opt.sort), function sect(s, i) {
    if (i > 0) { lines.push(eol); }
    if (s !== skipSectionName) { lines.push('[' + s + ']' + eol); }
    s = sectionsDict[s];
    eachKey(s, (opt.keySort || opt.sort), function pair(k) {
      [].concat(s[k]).forEach(function val(v) {
        if (transVal) { v = transVal(v); }
        if (v === undefined) { return; }
        lines.push(pairInd + String(k) + pairSep + String(v) + eol);
      });
    });
  });
  return lines;
}

dod2ini.cfg = function preconfigure(opt) {
  // §cfg
  return function custom(sectionsDict) { return dod2ini(sectionsDict, opt); };
};

module.exports = dod2ini;
