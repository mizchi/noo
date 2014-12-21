util = require 'util'
assert = require 'assert'

Noo = require '../'

mock = Noo.createMock()
mock.prop1.fuga.baz().a.b.c
mock.prop2.fuga.baz().a.b.c
mock()
mock(1)

console.log util.inspect mock.report(), false, null
console.log util.inspect (Noo.getChildReport mock.report(), 'prop2', 'fuga'), false, null

mock2 = Noo.createMock()
mock2.arr = [1, 2, 3]
mock2.arr[1] = 6
mock2.arr[1] = 5
mock2.arr[1]()

assert.equal Noo.getProp(mock2, 'arr', '1'), 5
