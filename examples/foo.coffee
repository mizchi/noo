Noo = require './'
util = require 'util'

mock = Noo.createMock();
mock.it.allows.eternal.property.access.with.callable().enjoy()
mock(1)
mock.it()
mock.it.allows()

console.log util.inspect mock.report(), false, null
