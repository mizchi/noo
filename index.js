// Generated by CoffeeScript 1.8.0
(function() {
  var Noo, Reflect, createMock, getChildReport, getProp, registeredKeys,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice;

  Reflect = require('harmony-reflect');

  Noo = {};

  registeredKeys = ['inspect', 'valueOf', 'toString', '_properties', '_get_count_map', '_set_count_map', '_set_item', '_apply_counter_', '_apply_arguments_', 'report'];

  Noo.createMock = createMock = function() {
    var mock, proxy;
    mock = function() {};
    mock._get_count_map = {};
    mock._set_count_map = {};
    mock._set_item_map = {};
    mock._apply_counter = 0;
    mock._apply_arguments = [];
    mock._properties = {};
    mock.report = function() {
      return {
        getCount: mock._get_count_map,
        setCount: mock._set_count_map,
        setItems: mock._set_item_map,
        applyCount: mock._apply_counter,
        applyArgumentsList: mock._apply_arguments,
        properties: (function() {
          var child, key, obj, _ref;
          obj = {};
          _ref = mock._properties;
          for (key in _ref) {
            child = _ref[key];
            obj[key] = child.report();
          }
          return obj;
        })()
      };
    };
    return proxy = new Proxy(mock, {
      get: function(target, name) {
        var child;
        if (__indexOf.call(registeredKeys, name) >= 0) {
          return Reflect.get(target, name);
        }
        if (mock._properties[name]) {
          mock._get_count_map[name] += 1;
          return mock._properties[name];
        } else {
          mock._get_count_map[name] = 1;
          child = createMock();
          mock._properties[name] = child;
          return child;
        }
      },
      set: function(target, name, val) {
        if (__indexOf.call(registeredKeys, name) >= 0) {
          return Reflect.set(target, name, val);
        }
        if (mock._set_count_map[name] != null) {
          mock._set_count_map[name] += 1;
        } else {
          mock._set_count_map[name] = 1;
        }
        if (mock._set_item_map[name] != null) {
          return mock._set_item_map[name].push(val);
        } else {
          return mock._set_item_map[name] = [val];
        }
      },
      apply: function(target, receiver, args) {
        mock._apply_counter++;
        mock._apply_arguments.push(args);
        return createMock();
      }
    });
  };

  Noo.getChildReport = getChildReport = function() {
    var k, keys, loc, report;
    report = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    loc = report;
    while (k = keys.shift()) {
      loc = loc.properties[k];
    }
    return loc;
  };

  Noo.getProp = getProp = function() {
    var k, keys, last, loc, m, report, v;
    m = arguments[0], keys = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    report = m.report();
    loc = report;
    last = keys.pop();
    while (k = keys.shift()) {
      loc = loc.properties[k];
    }
    v = loc.setItems[last];
    if (v) {
      return v[v.length - 1];
    } else {
      return null;
    }
  };

  module.exports = Noo;

}).call(this);
