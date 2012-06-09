// Generated by CoffeeScript 1.3.1
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BH.Models.Day = (function(_super) {

    __extends(Day, _super);

    Day.name = 'Day';

    function Day() {
      return Day.__super__.constructor.apply(this, arguments);
    }

    Day.prototype.format = {
      title: chrome.i18n.getMessage('day_date'),
      formalDate: chrome.i18n.getMessage('formal_date'),
      id: 'D'
    };

    Day.prototype.initialize = function(properties, options) {
      var id;
      this.options = options;
      id = this._dateFormat('id');
      return this.set({
        title: this._dateFormat('title'),
        inFuture: moment() < this.get('date'),
        formalDate: this._dateFormat('formalDate'),
        id: id,
        url: BH.Lib.Url.day(this.get('weekId'), id)
      });
    };

    Day.prototype.toTemplate = function() {
      return this.toJSON();
    };

    Day.prototype.toChrome = function() {
      return {
        text: this.get('filter') || '',
        startTime: this._getSOD(),
        endTime: this._getEOD()
      };
    };

    Day.prototype.sync = function(method, model, options) {
      if (method === 'read') {
        return chromeAPI.history.search(this.toChrome(), function(history) {
          return options.success(GroupBy.time(history, settings.timeGrouping()));
        });
      }
    };

    Day.prototype.clear = function() {
      var _this = this;
      return chrome.history.deleteRange({
        startTime: this._getSOD(),
        endTime: this._getEOD()
      }, function() {
        return _this.set({
          history: new BH.Collections.Intervals()
        });
      });
    };

    Day.prototype.parse = function(data) {
      var count, history;
      history = new BH.Collections.Intervals();
      count = 0;
      $.each(data, function() {
        history.add({
          id: this.id,
          datetime: this.datetime,
          pageVisits: new BH.Collections.Visits(this.pageVisits)
        });
        return count += this.pageVisits.length;
      });
      return {
        history: history,
        count: count
      };
    };

    Day.prototype._getSOD = function() {
      return new Date(this.get('date').sod()).getTime();
    };

    Day.prototype._getEOD = function() {
      return new Date(this.get('date').eod()).getTime();
    };

    Day.prototype._dateFormat = function(type) {
      return this.get('date').format(this.format[type]);
    };

    return Day;

  })(Backbone.Model);

}).call(this);
