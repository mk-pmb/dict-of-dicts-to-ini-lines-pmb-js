
<!--#echo json="package.json" key="name" underline="=" -->
dict-of-dicts-to-ini-lines-pmb
==============================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Translate your dictionary object of dictionary objects to an array of strings
that could be lines of a .ini file.
<!--/#echo -->



API
---

This module exports one function that holds some methods:

### dod2ini(sectionsDict[, opt])

Where `sectionsDict` is an object that maps section titles to dictionaries
that will be used as the key-value-pairs.

`opt` is an optional options object that supports these keys:

* `sort`: Whether and how to sort sections (if `sectSort` is false-y)
  and/or keys (if `keySort` is false-y).
  This does not affect the order of multiple values for one key.
  If `true`, sort with default algorithm.
  Any another truthy value is assumed to be, and used as,
  a custom comparison function.
* `sectSort`: If truthy, override `sort` with respect to sections.
* `keySort`: If truthy, override `sort` with respect to keys.
* `eol`: Append this string to each line. Defaults to empty string.
* `pairSep`: Put this string between key and value. Defaults to `'='`.



### dod2ini.cfg(opt)

<!--#include file="dod2ini.js" outdent="  " code="javascript"
  start="  // §cfg" maxln=1 -->
<!--#verbatim lncnt="3" -->
```javascript
return function custom(sectionsDict) { return dod2ini(sectionsDict, opt); };
```
<!--/include-->






Usage
-----

see [test.usage.js](test.usage.js).


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
