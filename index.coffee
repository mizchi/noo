Reflect = require 'harmony-reflect'
Noo = {}

registeredKeys = [
  'inspect'
  'valueOf'
  'toString'
  '_properties'
  '_get_count_map'
  '_set_count_map'
  '_set_item'
  '_apply_counter_'
  '_apply_arguments_'
  'report'
]

Noo.createMock = createMock = () ->
  mock = ->
  mock._get_count_map = {}
  mock._set_count_map = {}
  mock._set_item_map = {}
  mock._apply_counter = 0
  mock._apply_arguments = []

  mock._properties = {}
  mock.report = ->
    {
      getCount: mock._get_count_map
      setCount: mock._set_count_map
      setItems: mock._set_item_map
      applyCount: mock._apply_counter
      applyArgumentsList: mock._apply_arguments
      properties: do ->
        obj = {}
        for key, child of mock._properties
          obj[key] = child.report()
        obj
    }

  proxy = new Proxy mock,
    get: (target, name) ->
      if name in registeredKeys
        return Reflect.get target, name

      # console.log 'get:', name
      if mock._properties[name]
        mock._get_count_map[name] += 1
        return mock._properties[name]
      else
        mock._get_count_map[name] = 1
        child = createMock()
        mock._properties[name] = child
        return child

    set: (target, name, val) ->
      if name in registeredKeys
        return Reflect.set target, name, val

      if mock._set_count_map[name]?
        mock._set_count_map[name] += 1
      else
        mock._set_count_map[name] = 1

      if mock._set_item_map[name]?
        mock._set_item_map[name].push val
      else
        mock._set_item_map[name] = [val]

    apply: (target, receiver, args) ->
      mock._apply_counter++
      mock._apply_arguments.push args
      createMock()

Noo.getChildReport = getChildReport = (report, keys...) ->
  loc = report
  while k = keys.shift()
    loc = loc.properties[k]
  loc

Noo.getProp = getProp = (m, keys...) ->
  report = m.report()
  loc = report
  last = keys.pop()
  while k = keys.shift()
    loc = loc.properties[k]

  v = loc.setItems[last]

  if v
    return v[v.length - 1]
  else
    return null

module.exports = Noo
