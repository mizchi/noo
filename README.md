# Noo

Agnostic mock object with reporter by es6 proxy.

```
$ npm install noo --save
```

## How to use

Noo needs `--harmony` option

```
$ node --harmony main.js
$ coffee --nodejs --harmony main.js
```

```javascript
var Noo = require('noo');
var mock = Noo.createMock();
```

## API

- `Noo.createMock(): Mock`
- `Noo.getChildReport(report, ...keys: string[]): Report`
- `Noo.getProp(mock, ...keys: string[]): any`

## Example

```coffee
var Noo = require('noo');
mock = Noo.createMock();
mock.it.allows.eternal.property.access.and.callable().so.enjoy();
mock(1);
mock.it();
mock.everyelse.assignable = {};
mock.it.is.three = 3;
mock.it.allows();

var util = require('util');
console.log(util.inspect(mock.report(), false, null));
```

Dump
```
{ getCount: { it: 3 },
setCount: {},
  setItems: {},
    applyCount: 1,
    applyArgumentsList: [ [ 1 ] ],
    properties:
    { it:
      { getCount: { allows: 2 },
      setCount: {},
        setItems: {},
          applyCount: 1,
          applyArgumentsList: [ [] ],
          properties:
          { allows:
            { getCount: { eternal: 1 },
            setCount: {},
              setItems: {},
                applyCount: 1,
                applyArgumentsList: [ [] ],
                properties:
                { eternal:
                  { getCount: { property: 1 },
                  setCount: {},
                    setItems: {},
                      applyCount: 0,
                      applyArgumentsList: [],
                      properties:
                      { property:
                        { getCount: { access: 1 },
                        setCount: {},
                          setItems: {},
                            applyCount: 0,
                            applyArgumentsList: [],
                            properties:
                            { access:
                              { getCount: { with: 1 },
                              setCount: {},
                                setItems: {},
                                  applyCount: 0,
                                  applyArgumentsList: [],
                                  properties:
                                  { with:
                                    { getCount: { callable: 1 },
                                    setCount: {},
                                      setItems: {},
                                        applyCount: 0,
                                        applyArgumentsList: [],
                                        properties:
                                        { callable:
                                          { getCount: {},
                                            setCount: {},
                                              setItems: {},
                                                applyCount: 1,
                                                applyArgumentsList: [ [] ],
                                                properties: {} } } } } } } } } } } } } } } }
```


## LICENSE

MIT
