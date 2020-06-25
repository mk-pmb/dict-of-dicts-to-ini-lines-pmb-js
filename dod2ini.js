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

function dod2ini(sectionsDict, opt) {
  if (!opt) { opt = false; }
  var lines = [], eol = ifUndef(opt.eol, ''),
    pairSep = ifUndef(opt.pairSep, '=');
  eachKey(sectionsDict, (opt.sectSort || opt.sort), function sect(s) {
    lines.push('[' + s + ']' + eol);
    s = sectionsDict[s];
    eachKey(s, (opt.keySort || opt.sort), function pair(k) {
      [].concat(s[k]).forEach(function val(v) {
        if (v === undefined) { return; }
        lines.push(String(k) + pairSep + String(v) + eol);
      });
    });
    lines.push(eol);
  });
  return lines;
}

dod2ini.cfg = function preconfigure(opt) {
  // §cfg
  return function custom(sectionsDict) { return dod2ini(sectionsDict, opt); };
};

module.exports = dod2ini;
