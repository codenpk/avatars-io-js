// Generated by CoffeeScript 1.3.3
var AvatarsIO;

AvatarsIO = (function() {

  function AvatarsIO(token) {
    this.token = token;
  }

  AvatarsIO.prototype.create = function(selector) {
    return new AvatarsIO.Uploader(this.token, selector);
  };

  return AvatarsIO;

})();

AvatarsIO.Uploader = (function() {

  Uploader.prototype.listeners = {};

  Uploader.prototype.state = 'new';

  Uploader.prototype.currentShortcut = '';

  function Uploader(token, selector) {
    var _this = this;
    this.token = token;
    this.selector = selector;
    this.widget = new AjaxUpload($(this.selector)[0], {
      action: "http://avatars.io/v1/upload?shortcut=" + this.currentShortcut + "&authorization=" + this.token,
      name: 'avatar',
      allowedExtensions: ['jpg', 'jpeg', 'png', 'gif'],
      onSubmit: function() {
        _this.currentShortcut = _this.shortcut();
        _this.widget._settings.action = "http://avatars.io/v1/upload?shortcut=" + _this.currentShortcut + "&authorization=" + _this.token;
        return _this.emit('new');
      },
      onComplete: function() {
        return _this.emit('complete', "http://avatars.io/" + _this.currentShortcut);
      }
    });
    this.emit('init');
  }

  Uploader.prototype.on = function(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    return this.listeners[event].push(listener);
  };

  Uploader.prototype.emit = function(event, args, context) {
    var listener, _i, _len, _ref;
    if (context == null) {
      context = this;
    }
    if (!this.listeners[event]) {
      return;
    }
    _ref = this.listeners[event];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      listener = _ref[_i];
      listener.apply(context, [args]);
    }
    return void 0;
  };

  Uploader.prototype.shortcut = function() {
    var possible, value;
    value = 'u';
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    while (true) {
      if (value.length === 10) {
        break;
      }
      value += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return value;
  };

  return Uploader;

})();