(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("collections/brackets/games", function(exports, require, module) {
  var Collection, Game, Games,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Game = require('models/brackets/game');

  module.exports = Games = (function(_super) {

    __extends(Games, _super);

    function Games() {
      this.parse = __bind(this.parse, this);

      this.next = __bind(this.next, this);
      return Games.__super__.constructor.apply(this, arguments);
    }

    Games.prototype.model = Game;

    Games.prototype.comparator = function(game) {
      return game.get('number');
    };

    Games.prototype.next = function(winner) {
      var firstInProgress, firstReady;
      if (winner == null) {
        winner = null;
      }
      firstInProgress = this.find(function(game) {
        return game.get('status') === 'in progress';
      });
      firstReady = this.find(function(game) {
        return game.get('status') === 'ready';
      });
      if (firstInProgress != null) {
        firstInProgress.set('status', 'finished');
      }
      if (firstReady != null) {
        firstReady.set('status', 'in progress');
      }
      if (winner != null) {
        return firstInProgress.set('winner', _.pick(winner.attributes, 'id', 'name'));
      }
    };

    Games.prototype.parse = function(models) {
      var i, updated, _i, _ref;
      updated = [];
      for (i = _i = 0, _ref = models.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (this.at(i) != null) {
          updated[i] = this.at(i);
          updated[i].set(models[i]);
        } else {
          updated[i] = new Game(models[i]);
        }
      }
      return updated;
    };

    return Games;

  })(Collection);
  
});
window.require.register("collections/brackets/group-stages", function(exports, require, module) {
  var Collection, GroupStage, GroupStages,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  GroupStage = require('models/brackets/group-stage');

  module.exports = GroupStages = (function(_super) {

    __extends(GroupStages, _super);

    function GroupStages() {
      return GroupStages.__super__.constructor.apply(this, arguments);
    }

    GroupStages.prototype.model = GroupStage;

    return GroupStages;

  })(Collection);
  
});
window.require.register("collections/brackets/matches", function(exports, require, module) {
  var Collection, Match, Matches,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Match = require('models/brackets/match');

  module.exports = Matches = (function(_super) {

    __extends(Matches, _super);

    function Matches() {
      this.parse = __bind(this.parse, this);
      return Matches.__super__.constructor.apply(this, arguments);
    }

    Matches.prototype.model = Match;

    Matches.prototype.initialize = function(options) {
      return Matches.__super__.initialize.call(this, options);
    };

    Matches.prototype.parse = function(models) {
      var child, i, j, m, match, nc, newMatch, updated, _i, _len, _ref;
      updated = [];
      for (_i = 0, _len = models.length; _i < _len; _i++) {
        match = models[_i];
        m = this.get(match.id);
        if (m != null) {
          m.set(_.omit(m.parse(match), 'event'));
          updated.push(m);
        } else {
          newMatch = new Match();
          newMatch.set(newMatch.parse(match));
          updated.push(newMatch);
        }
      }
      for (j in updated) {
        match = updated[j];
        if (updated[match.get('parent')] != null) {
          updated[j].set('parent', updated[match.get('parent')]);
        } else {
          match.set('parent', null);
        }
        if (updated[(_ref = match.get('loserDropsTo')) != null ? _ref.match : void 0] != null) {
          match.set('loserDropsTo', {
            match: updated[match.get('loserDropsTo').match],
            slot: match.get('loserDropsTo').slot
          });
        } else {
          match.set('loserDropsTo', null);
        }
        nc = (function() {
          var _ref1, _results;
          _ref1 = match.get('children');
          _results = [];
          for (i in _ref1) {
            child = _ref1[i];
            if (updated[child] != null) {
              _results.push(updated[child]);
            } else {
              _results.push(null);
            }
          }
          return _results;
        })();
        updated[j].set('children', nc);
      }
      return updated;
    };

    return Matches;

  })(Collection);
  
});
window.require.register("collections/brackets/streams", function(exports, require, module) {
  var Collection, Stream, Streams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Stream = require('models/brackets/stream');

  module.exports = Streams = (function(_super) {

    __extends(Streams, _super);

    function Streams() {
      return Streams.__super__.constructor.apply(this, arguments);
    }

    Streams.prototype.model = Stream;

    Streams.prototype.comparator = function(stream) {
      return stream.get('name');
    };

    return Streams;

  })(Collection);
  
});
window.require.register("collections/brackets/teams", function(exports, require, module) {
  var Collection, Team, teams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Team = require('models/brackets/team');

  module.exports = teams = (function(_super) {

    __extends(teams, _super);

    function teams() {
      return teams.__super__.constructor.apply(this, arguments);
    }

    teams.prototype.model = Team;

    return teams;

  })(Collection);
  
});
window.require.register("models/brackets/bracket", function(exports, require, module) {
  var Bracket, GroupStages, Matches, Model, Teams,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Matches = require('collections/brackets/matches');

  Teams = require('collections/brackets/teams');

  GroupStages = require('collections/brackets/group-stages');

  module.exports = Bracket = (function(_super) {

    __extends(Bracket, _super);

    function Bracket() {
      this.parse = __bind(this.parse, this);
      return Bracket.__super__.constructor.apply(this, arguments);
    }

    Bracket.prototype.defaults = function() {
      return {
        userId: null,
        sessionId: null,
        title: "Your Title",
        slug: "some-slug",
        kind: "ipl6",
        labels: [],
        matches: new Matches(),
        groups: new GroupStages(),
        teams: new Teams()
      };
    };

    Bracket.prototype.initialize = function(options) {
      return Bracket.__super__.initialize.call(this, options);
    };

    Bracket.prototype.parse = function(data) {
      var matches;
      this.get('teams').update(data.teams);
      data.teams = this.get('teams');
      matches = this.get('matches');
      matches.update(data.matches, {
        parse: true
      });
      data.groups = this.get('groups');
      data.matches = matches;
      return data;
    };

    return Bracket;

  })(Model);
  
});
window.require.register("models/brackets/event", function(exports, require, module) {
  var Event, Matchup, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Matchup = require('models/brackets/matchup');

  module.exports = Event = (function(_super) {

    __extends(Event, _super);

    function Event() {
      this.autoTitle = __bind(this.autoTitle, this);

      this.toJSON = __bind(this.toJSON, this);
      return Event.__super__.constructor.apply(this, arguments);
    }

    Event.prototype.defaults = function() {
      return {
        title: "TBD vs. TBD",
        stream: {
          name: "SC2 1",
          id: "5088c239f767afac6e000001"
        },
        starts_at: moment().add('days', 10).format("MM/DD/YYYY hh:mm aZ"),
        ends_at: moment().add('days', 10).add('hours', 1).format("MM-DD-YYYYTHH:mm:ssZ"),
        rebroadcast: false,
        matchup: new Matchup(),
        groups: []
      };
    };

    Event.prototype.toJSON = function() {
      var attr;
      attr = _.clone(this.attributes);
      attr.starts_at = moment(attr.starts_at, "MM/DD/YYYY hh:mm a").format("MM-DD-YYYYTHH:mm:ssZ");
      return attr;
    };

    Event.prototype.parse = function(data) {
      data.matchup = this.get('matchup').parse(data.matchup);
      data.starts_at = moment(data.starts_at, "MM-DD-YYYYTHH:mm:ssZ").format("MM/DD/YYYY hh:mm aZ");
      return this;
    };

    Event.prototype.autoTitle = function() {
      var i, teams;
      teams = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i < 2; i = ++_i) {
          if (this.get('matchup').get('teams')[i] != null) {
            _results.push(this.get('matchup').get('teams')[i].get('name'));
          } else {
            _results.push("TBD");
          }
        }
        return _results;
      }).call(this);
      return this.set('title', teams.join(" vs. "));
    };

    return Event;

  })(Model);
  
});
window.require.register("models/brackets/game", function(exports, require, module) {
  var Game, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Game = (function(_super) {

    __extends(Game, _super);

    function Game() {
      return Game.__super__.constructor.apply(this, arguments);
    }

    Game.prototype.defaults = function() {
      return {
        number: 0,
        status: "ready"
      };
    };

    Game.prototype.endWithWinner = function(team) {
      this.set('winner', {
        id: team.id,
        name: team.get('name')
      });
      return this.set('status', 'done');
    };

    Game.prototype.start = function() {
      return this.set('status', 'active');
    };

    return Game;

  })(Model);
  
});
window.require.register("models/brackets/group-stage", function(exports, require, module) {
  var GroupStage, Matches, Model, Teams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Matches = require('collections/brackets/matches');

  Teams = require('collections/brackets/teams');

  module.exports = GroupStage = (function(_super) {

    __extends(GroupStage, _super);

    function GroupStage() {
      return GroupStage.__super__.constructor.apply(this, arguments);
    }

    GroupStage.prototype.defaults = function() {
      return {
        title: "Group",
        teams: new Teams(),
        matches: new Matches(),
        teamWL: {},
        advanceTo: [],
        finished: false,
        transform2d: {
          x: 0,
          y: 0,
          paddingX: 0,
          paddingY: 0
        }
      };
    };

    return GroupStage;

  })(Model);
  
});
window.require.register("models/brackets/match-team", function(exports, require, module) {
  var MatchTeam, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = MatchTeam = (function(_super) {

    __extends(MatchTeam, _super);

    function MatchTeam() {
      return MatchTeam.__super__.constructor.apply(this, arguments);
    }

    MatchTeam.prototype.defaults = function() {
      return {
        name: "TBD",
        points: 0,
        seed: 0
      };
    };

    MatchTeam.prototype.initialize = function(options) {
      MatchTeam.__super__.initialize.call(this, options);
      return this.set('points', 0);
    };

    return MatchTeam;

  })(Model);
  
});
window.require.register("models/brackets/match", function(exports, require, module) {
  var Event, Match, MatchTeam, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Event = require('models/brackets/event');

  MatchTeam = require('models/brackets/match-team');

  module.exports = Match = (function(_super) {

    __extends(Match, _super);

    function Match() {
      this.games = __bind(this.games, this);

      this.event = __bind(this.event, this);

      this.matchup = __bind(this.matchup, this);

      this.team = __bind(this.team, this);

      this.teams = __bind(this.teams, this);

      this.isLoser = __bind(this.isLoser, this);

      this.advance = __bind(this.advance, this);

      this.toJSON = __bind(this.toJSON, this);
      return Match.__super__.constructor.apply(this, arguments);
    }

    Match.prototype.defaults = function() {
      return {
        parent: null,
        children: [],
        loserDropsTo: null,
        hasLoserSlot: false,
        event: new Event(),
        transform2d: {
          x: 0,
          y: 0,
          paddingX: 0,
          paddingY: 0
        }
      };
    };

    Match.prototype.initialize = function(options) {
      return Match.__super__.initialize.call(this, options);
    };

    Match.prototype.parse = function(data) {
      data.event = this.get('event').parse(data.event);
      return data;
    };

    Match.prototype.toJSON = function() {
      var attr, i;
      attr = _.clone(this.attributes);
      attr.id = "mid" + _.indexOf(this.collection.models, this);
      attr.parent = attr.parent != null ? _.indexOf(this.collection.models, attr.parent) : null;
      attr.children = (function() {
        var _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = attr.children.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (attr.children[i] != null) {
            _results.push(_.indexOf(this.collection.models, attr.children[i]));
          } else {
            _results.push(null);
          }
        }
        return _results;
      }).call(this);
      if (attr.loserDropsTo != null) {
        attr.loserDropsTo.match = _.indexOf(this.collection.models, attr.loserDropsTo.match);
      } else {
        attr.loserDropsTo = null;
      }
      this.set('id', attr.id);
      return attr;
    };

    Match.prototype.advance = function(team) {
      var loser, loserMatch, parent;
      parent = this.get('parent');
      if (parent != null) {
        parent.team(parent.whichSlot(this), new MatchTeam(team.attributes));
      }
      loserMatch = this.get('loserDropsTo');
      if (loserMatch != null) {
        loser = this.teams()[0].get('name') === team.get('name') ? this.teams()[1] : this.teams()[0];
        return loserMatch.match.team(loserMatch.slot, new MatchTeam(loser.attributes));
      }
    };

    Match.prototype.whichSlot = function(childMatch) {
      if (!_.contains(this.get('children'), childMatch)) {
        return 0;
      }
      if (this.get('hasLoserSlot')) {
        return 1;
      }
      return _.indexOf(this.get('children'), childMatch);
    };

    Match.prototype.isLoser = function() {
      if (this.get('hasLoserSlot')) {
        return true;
      } else {
        return false;
      }
    };

    Match.prototype.teams = function(teamSet) {
      if (teamSet != null) {
        this.get('event').get('matchup').set('teams', teamSet);
      }
      return this.get('event').get('matchup').get('teams');
    };

    Match.prototype.team = function(at, team) {
      if (team == null) {
        team = null;
      }
      if (team != null) {
        this.teams()[at] = team;
        this.matchup().trigger('change:teams');
      }
      return this.teams()[at];
    };

    Match.prototype.matchup = function() {
      return this.get('event').get('matchup');
    };

    Match.prototype.event = function() {
      return this.get('event');
    };

    Match.prototype.games = function() {
      return this.matchup().get('games');
    };

    return Match;

  })(Model);
  
});
window.require.register("models/brackets/matchup", function(exports, require, module) {
  var Game, Games, MatchTeam, Matchup, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  Game = require('models/brackets/game');

  Games = require('collections/brackets/games');

  MatchTeam = require('models/brackets/match-team');

  module.exports = Matchup = (function(_super) {

    __extends(Matchup, _super);

    function Matchup() {
      this.pointFor = __bind(this.pointFor, this);

      this.updateGamesCount = __bind(this.updateGamesCount, this);
      return Matchup.__super__.constructor.apply(this, arguments);
    }

    Matchup.prototype.defaults = function() {
      return {
        teams: [],
        games: new Games(),
        best_of: 3
      };
    };

    Matchup.prototype.initialize = function(options) {
      var _this = this;
      Matchup.__super__.initialize.call(this, options);
      this.updateGamesCount();
      return this.on('change:best_of', function() {
        return _this.updateGamesCount();
      });
    };

    Matchup.prototype.parse = function(data) {
      var i, matchTeams, nTeams, team;
      nTeams = (function() {
        var _ref, _results;
        _ref = data.teams;
        _results = [];
        for (i in _ref) {
          team = _ref[i];
          matchTeams = this.get('teams');
          if (matchTeams[i] != null) {
            _results.push(matchTeams[i].set(team));
          } else {
            matchTeams[i] = new MatchTeam(team);
            _results.push(matchTeams[i].set('points', team.points));
          }
        }
        return _results;
      }).call(this);
      data.games = this.get('games').update(data.games, {
        parse: true
      });
      return this;
    };

    Matchup.prototype.updateGamesCount = function() {
      var bestOf, games, i;
      bestOf = this.get('best_of');
      games = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; 0 <= bestOf ? _i < bestOf : _i > bestOf; i = 0 <= bestOf ? ++_i : --_i) {
          _results.push(new Game({
            number: i + 1
          }));
        }
        return _results;
      })();
      return this.get('games').reset(games);
    };

    Matchup.prototype.pointFor = function(teamName) {
      var team, _i, _len, _ref;
      _ref = this.get('teams');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        team = _ref[_i];
        if (!(team.get('name') === teamName)) {
          continue;
        }
        team.set('points', team.get('points') + 1);
        if (team.get('points') > this.get('best_of') / 2) {
          return {
            winner: team,
            matchDecided: true
          };
        } else {
          return {
            winner: team,
            matchDecided: false
          };
        }
      }
    };

    return Matchup;

  })(Model);
  
});
window.require.register("models/brackets/stream", function(exports, require, module) {
  var Model, Stream,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Stream = (function(_super) {

    __extends(Stream, _super);

    function Stream() {
      return Stream.__super__.constructor.apply(this, arguments);
    }

    return Stream;

  })(Model);
  
});
window.require.register("models/brackets/team", function(exports, require, module) {
  var Model, Team,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Team = (function(_super) {

    __extends(Team, _super);

    function Team() {
      return Team.__super__.constructor.apply(this, arguments);
    }

    Team.prototype.defaults = function() {
      return {
        name: "TBD",
        image_url: ""
      };
    };

    return Team;

  })(Model);
  
});
window.require.register("utility/brackets/bracket-padding", function(exports, require, module) {
  var BracketPadding;

  module.exports = BracketPadding = (function() {

    function BracketPadding() {}

    BracketPadding.padding = {
      top: 100,
      right: 100,
      bottom: 100,
      left: 100
    };

    BracketPadding.match = {
      width: 180,
      height: 44
    };

    BracketPadding.matches = null;

    BracketPadding.groups = null;

    BracketPadding.setBracket = function(bracket, $view) {
      this.$view = $view;
      this.matches = bracket.get('matches');
      this.groups = bracket.get('groups');
      return this;
    };

    BracketPadding.addPadding = function(options) {
      var k, v;
      if (this.matches == null) {
        return false;
      }
      for (k in options) {
        v = options[k];
        if (this.padding[k] != null) {
          this.padding[k] += parseInt(v);
        }
      }
      this.updateBounds();
      return this;
    };

    BracketPadding.setPadding = function(options) {
      var k, v;
      if (this.matches == null) {
        return false;
      }
      for (k in options) {
        v = options[k];
        if (this.padding[k] != null) {
          this.padding[k] = parseInt(v);
        }
      }
      this.updateBounds();
      return this;
    };

    BracketPadding.moveMatches = function(x, y) {
      var _this = this;
      if (y == null) {
        y = 0;
      }
      if (this.matches == null) {
        return false;
      }
      this.matches.each(function(match) {
        var t2d;
        t2d = _.clone(match.get('transform2d'));
        t2d.x += x;
        t2d.y += y;
        return match.set('transform2d', t2d);
      });
      this.updateBounds();
      return this;
    };

    BracketPadding.updateBounds = function() {
      var match, maxX, maxY, _i, _j, _len, _len1, _ref, _ref1,
        _this = this;
      this.groups.each(function(group) {
        var t2d;
        t2d = _.clone(group.get('transform2d'));
        t2d.paddingX = _this.padding.left;
        t2d.paddingY = _this.padding.top;
        return group.set('transform2d', t2d);
      });
      this.matches.each(function(match) {
        var t2d;
        t2d = _.clone(match.get('transform2d'));
        t2d.paddingX = _this.padding.left;
        t2d.paddingY = _this.padding.top;
        return match.set('transform2d', t2d);
      });
      maxX = maxY = 0;
      _ref = this.matches.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        if (match.get('transform2d').x + match.get('transform2d').paddingX > maxX) {
          maxX = match.get('transform2d').x + match.get('transform2d').paddingX;
        }
      }
      _ref1 = this.matches.models;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        match = _ref1[_j];
        if (match.get('transform2d').y + match.get('transform2d').paddingY > maxY) {
          maxY = match.get('transform2d').y + match.get('transform2d').paddingY;
        }
      }
      return this.$view.css({
        width: maxX + this.padding.right + this.match.width,
        height: maxY + this.padding.bottom
      });
    };

    return BracketPadding;

  })();
  
});
window.require.register("utility/brackets/flatten-tree", function(exports, require, module) {
  var FlattenTree;

  module.exports = FlattenTree = (function() {

    function FlattenTree() {}

    FlattenTree.flatten = function(root, buffer) {
      var child, _i, _len, _ref;
      if (buffer == null) {
        buffer = [];
      }
      buffer.push(root);
      _ref = root.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        this.flatten(child, buffer);
      }
      return buffer;
    };

    return FlattenTree;

  })();
  
});
window.require.register("utility/brackets/match-connector", function(exports, require, module) {
  var MatchConnector;

  module.exports = MatchConnector = (function() {

    function MatchConnector() {}

    MatchConnector.connect = function(root, matchViews) {
      var $el, child, childView, h, rootView, x, y, _i, _len, _ref;
      rootView = this.findView(root, matchViews);
      $el = $('<div class="match-connector"></div>');
      y = x = Math.min(Infinity);
      h = 0;
      _ref = root.get('children');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        childView = this.findView(child, matchViews);
        if (childView != null) {
          y = Math.min(childView.$el.position().top, y);
          x = Math.min(childView.$el.position().left + childView.$el.outerWidth(), x);
          h = Math.max(childView.$el.position().top, h);
        }
        true;
      }
      if (h - y > 0) {
        $el.css({
          top: y + rootView.$el.outerHeight() / 2,
          left: x,
          width: rootView.$el.position().left - x,
          height: h - y
        });
        $('<div class="top-bracket">').appendTo($el);
        $('<div class="top-line">').appendTo($el);
        $('<div class="bottom-bracket">').appendTo($el);
        $('<div class="bottom-line">').appendTo($el);
      } else {
        $el.css({
          top: rootView.$el.position().top,
          left: x,
          width: rootView.$el.position().left - x,
          height: rootView.$el.outerHeight()
        });
        $('<div class="top-line full-width">').appendTo($el);
        $('<div class="bottom-line full-width">').appendTo($el);
      }
      return $el;
    };

    MatchConnector.findView = function(root, matchViews) {
      return _.find(matchViews, function(mV) {
        if (mV.model === root) {
          return true;
        } else {
          return false;
        }
      });
    };

    return MatchConnector;

  })();
  
});
window.require.register("utility/brackets/match-pruner", function(exports, require, module) {
  var MatchPruner;

  module.exports = MatchPruner = (function() {

    function MatchPruner() {}

    MatchPruner.prune = function(matches, seedLimit) {
      var m, noOver, parent, t, validMatches, _i, _j, _len, _len1, _ref;
      validMatches = [];
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        m = matches[_i];
        noOver = true;
        _ref = m.teams();
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          t = _ref[_j];
          if (parseInt(t.get('seed')) > seedLimit) {
            noOver = false;
          }
        }
        if (noOver) {
          validMatches.push(m);
        } else {
          parent = m.get('parent');
          parent.set('children', _.filter(parent.get('children'), function(child) {
            return child !== m;
          }));
        }
      }
      return validMatches;
    };

    return MatchPruner;

  })();
  
});
window.require.register("utility/brackets/root-finder", function(exports, require, module) {
  var RootFinder;

  module.exports = RootFinder = (function() {

    function RootFinder() {}

    RootFinder.find = function(matches) {
      var match, _i, _len;
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        if (match.get('parent') == null) {
          return match;
        }
      }
    };

    RootFinder.findLoserRoot = function(matches) {
      var match, _i, _len;
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        if (match.get('parent') == null) {
          return match.get('children')[1];
        }
      }
    };

    RootFinder.findWinnerRoot = function(matches) {
      var match, _i, _len;
      for (_i = 0, _len = matches.length; _i < _len; _i++) {
        match = matches[_i];
        if (match.get('parent') == null) {
          return match.get('children')[0];
        }
      }
    };

    return RootFinder;

  }).call(this);
  
});
window.require.register("utility/brackets/rounds-from-match-list", function(exports, require, module) {
  var RoundsFromMatchList;

  module.exports = RoundsFromMatchList = (function() {

    function RoundsFromMatchList() {}

    RoundsFromMatchList.convert = function(root) {
      var rnds;
      rnds = [];
      if (root != null) {
        RoundsFromMatchList.rec(root, 0, rnds);
      }
      return rnds.reverse();
    };

    RoundsFromMatchList.rec = function(ti, depth, buffer) {
      var i, _i, _ref, _results;
      if (buffer[depth] == null) {
        buffer[depth] = [];
      }
      buffer[depth].push(ti);
      _results = [];
      for (i = _i = 0, _ref = ti.get('children').length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (ti.get('children')[i] != null) {
          _results.push(RoundsFromMatchList.rec(ti.get('children')[i], depth + 1, buffer));
        }
      }
      return _results;
    };

    return RoundsFromMatchList;

  }).call(this);
  
});
window.require.register("utility/brackets/tree-view-formatter", function(exports, require, module) {
  var RootFinder, Rounds, TreeViewFormatter;

  RootFinder = require('utility/brackets/root-finder');

  Rounds = require('utility/brackets/rounds-from-match-list');

  module.exports = TreeViewFormatter = (function() {

    function TreeViewFormatter() {}

    TreeViewFormatter.format = function(root, xSpacing, ySpacing) {
      var lMax, loserHead, loserRounds, rounds, t2d, wMax, winnerHead, winnerRounds, winnerSpacing;
      loserHead = root.get('children')[1];
      winnerHead = root.get('children')[0];
      if (root.get('children')[1].get('hasLoserSlot')) {
        loserRounds = Rounds.convert(loserHead);
        winnerRounds = Rounds.convert(winnerHead);
        lMax = this.singleTree(loserRounds, xSpacing, ySpacing);
        winnerSpacing = lMax.x / (winnerRounds.length - 1);
        wMax = this.singleTree(winnerRounds, winnerSpacing, ySpacing);
        this.addOffset(loserHead, 0, wMax.y + ySpacing + 20);
        t2d = _.clone(root.get('transform2d'));
        t2d.x = wMax.x + winnerSpacing;
        t2d.y = this.between(winnerHead, loserHead);
        return root.set('transform2d', t2d);
      } else {
        rounds = Rounds.convert(root);
        return this.singleTree(rounds, xSpacing, ySpacing);
      }
    };

    TreeViewFormatter.singleTree = function(rounds, xSpacing, ySpacing) {
      var a, i, j, max, startRound, t2d, _i, _j, _k, _l, _len, _m, _n, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      startRound = 0;
      max = {
        x: 0,
        y: 0
      };
      for (i = _i = 0, _ref = rounds.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (rounds[i].length > rounds[startRound].length) {
          startRound = i;
        }
      }
      for (i = _j = startRound, _ref1 = rounds.length; startRound <= _ref1 ? _j < _ref1 : _j > _ref1; i = startRound <= _ref1 ? ++_j : --_j) {
        for (j = _k = 0, _ref2 = rounds[i].length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; j = 0 <= _ref2 ? ++_k : --_k) {
          t2d = {
            x: i * xSpacing,
            y: 0
          };
          if (i === startRound) {
            t2d.y = j * ySpacing;
          } else if (((_ref3 = rounds[i][j].get('children')) != null ? _ref3.length : void 0) > 0) {
            _ref4 = rounds[i][j].get('children');
            for (_l = 0, _len = _ref4.length; _l < _len; _l++) {
              a = _ref4[_l];
              if (a != null) {
                t2d.y += a.get('transform2d').y;
              }
            }
            t2d.y /= rounds[i][j].get('children').length;
          }
          rounds[i][j].set('transform2d', t2d);
          max.x = Math.max(t2d.x, max.x);
          max.y = Math.max(t2d.y, max.y);
        }
      }
      for (i = _m = startRound; startRound <= 0 ? _m < 0 : _m > 0; i = startRound <= 0 ? ++_m : --_m) {
        for (j = _n = 0, _ref5 = rounds[i - 1].length; 0 <= _ref5 ? _n < _ref5 : _n > _ref5; j = 0 <= _ref5 ? ++_n : --_n) {
          t2d = {
            x: (i - 1) * xSpacing,
            y: rounds[i - 1][j].get('parent').get('transform2d').y
          };
          rounds[i - 1][j].set('transform2d', t2d);
        }
      }
      return max;
    };

    TreeViewFormatter.between = function(leftHead, rightHead) {
      var half;
      return half = (leftHead.get('transform2d').y + rightHead.get('transform2d').y) / 2;
    };

    TreeViewFormatter.addOffset = function(root, xOff, yOff) {
      var child, t2d, _i, _len, _ref, _results;
      if (xOff == null) {
        xOff = 0;
      }
      if (yOff == null) {
        yOff = 0;
      }
      t2d = _.clone(root.get('transform2d'));
      t2d.x += xOff;
      t2d.y += yOff;
      root.set('transform2d', t2d);
      _ref = root.get('children');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(TreeViewFormatter.addOffset(child, xOff, yOff));
      }
      return _results;
    };

    return TreeViewFormatter;

  }).call(this);
  
});
window.require.register("views/bracket-editor-view", function(exports, require, module) {
  var BracketEditorView, BracketView, Collection, View, mediator,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  Collection = require('models/base/collection');

  BracketView = require('views/brackets/bracket-view');

  mediator = require('mediator');

  module.exports = BracketEditorView = (function(_super) {

    __extends(BracketEditorView, _super);

    function BracketEditorView() {
      this.saveTitle = __bind(this.saveTitle, this);

      this.editTitle = __bind(this.editTitle, this);

      this.deselect = __bind(this.deselect, this);
      return BracketEditorView.__super__.constructor.apply(this, arguments);
    }

    BracketEditorView.prototype.initialize = function(options) {
      BracketEditorView.__super__.initialize.call(this, options);
      this.delegate('click', '.match', function(ev) {
        return this.clickMatch(ev);
      });
      this.delegate('click', '.hotzone', function() {
        return this.deselect();
      });
      this.delegate('click', '.bracket-title', function(ev) {
        return this.editTitle(ev);
      });
      this.delegate('blur', '.bracket-title-input', function(ev) {
        return this.saveTitle(ev);
      });
      return this.selected = [];
    };

    BracketEditorView.prototype.render = function() {
      BracketEditorView.__super__.render.apply(this, arguments);
      $('<div class="hotzone">').appendTo(this.$el).width(this.$el.width()).height(this.$el.height());
      $('<input type="text" class="bracket-title-input">').appendTo(this.$('.label-layer span.bracket-title'));
      return this;
    };

    BracketEditorView.prototype.clickMatch = function(ev) {
      if (ev.shiftKey !== true) {
        this.deselect();
      }
      $(ev.currentTarget).addClass('activeSelect');
      this.selected.push($(ev.currentTarget).data('match'));
      return mediator.publish('change:selected', this.selected);
    };

    BracketEditorView.prototype.deselect = function() {
      $('.match.activeSelect').removeClass('activeSelect');
      this.selected = [];
      this.model.url = function() {
        return "http://test.ign.com:2121/brackets/v6/api/";
      };
      return this.model.save();
    };

    BracketEditorView.prototype.editTitle = function(ev) {
      $(ev.currentTarget).addClass('editing');
      return $(ev.currentTarget).find('input').focus().val(this.model.get('title'));
    };

    BracketEditorView.prototype.saveTitle = function(ev) {
      var newTitle;
      $(ev.currentTarget).parent('span').removeClass('editing');
      newTitle = String($(ev.currentTarget).val().trim());
      this.model.set('title', newTitle);
      this.model.set('slug', newTitle.toLowerCase().replace(/\ /g, '-'));
      return this.$('.bracket-title h1').text(newTitle);
    };

    return BracketEditorView;

  })(BracketView);
  
});
window.require.register("views/brackets/bracket-view", function(exports, require, module) {
  var BracketView, Connector, Formatter, GroupView, MatchView, Padding, RootFinder, Rounds, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/brackets/bracket');

  MatchView = require('views/brackets/match-view');

  GroupView = require('views/brackets/group-view');

  RootFinder = require('utility/brackets/root-finder');

  Rounds = require('utility/brackets/rounds-from-match-list');

  Formatter = require('utility/brackets/tree-view-formatter');

  Padding = require('utility/brackets/bracket-padding');

  Connector = require('utility/brackets/match-connector');

  module.exports = BracketView = (function(_super) {

    __extends(BracketView, _super);

    function BracketView() {
      return BracketView.__super__.constructor.apply(this, arguments);
    }

    BracketView.prototype.template = template;

    BracketView.prototype.container = '#bracket-container';

    BracketView.prototype.id = 'bracket-layer';

    BracketView.prototype.autoRender = true;

    BracketView.prototype.initialize = function(options, padding) {
      var _this = this;
      if (padding == null) {
        padding = {
          top: 200,
          right: 400,
          bottom: 200,
          left: 100
        };
      }
      BracketView.__super__.initialize.apply(this, arguments);
      this.listenTo(this.model.get('matches'), 'reset', function() {
        _this.renderCount = 0;
        return _this.render();
      });
      this.listenTo(this.model.get('groups'), 'add', function() {
        return _this.render();
      });
      Padding.match.width = 180;
      Padding.match.height = 60;
      this.padding = padding;
      return this.renderCount = 0;
    };

    BracketView.prototype.render = function() {
      var group, groups, gv, match, matchViews, matches, mv, seed, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
      BracketView.__super__.render.apply(this, arguments);
      matches = this.model.get('matches');
      groups = this.model.get('groups');
      seed = RootFinder.find(matches.models);
      matchViews = [];
      if (seed == null) {
        return this;
      }
      if (this.renderCount < 1) {
        Formatter.format(seed, Padding.match.width, Padding.match.height);
        Padding.setBracket(this.model, this.$el);
        Padding.setPadding(this.padding);
      }
      _ref = matches.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        match = _ref[_i];
        mv = new MatchView({
          model: match
        });
        mv.$el.data('match', mv.model);
        mv.$el.appendTo(this.$el.find('.match-layer'));
        matchViews.push(mv);
      }
      _ref1 = groups.models;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        group = _ref1[_j];
        gv = new GroupView({
          model: group
        });
        gv.$el.data('group', gv.model);
        gv.$el.appendTo(this.$el.find('.match-layer'));
      }
      Padding.updateBounds();
      this.$('span.bracket-title h1').text(this.model.get('title'));
      this.$('span.bracket-title').css({
        position: 'absolute',
        top: Padding.padding.top - 70,
        left: Padding.padding.left
      });
      _ref2 = matches.models;
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        match = _ref2[_k];
        if (match.get('children').length > 0) {
          Connector.connect(match, matchViews).appendTo(this.$el.find('.line-layer'));
        }
      }
      return ++this.renderCount;
    };

    BracketView;


    return BracketView;

  })(View);
  
});
window.require.register("views/brackets/group-view", function(exports, require, module) {
  var GroupView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/brackets/group-stage');

  module.exports = GroupView = (function(_super) {

    __extends(GroupView, _super);

    function GroupView() {
      this.updatePosition = __bind(this.updatePosition, this);
      return GroupView.__super__.constructor.apply(this, arguments);
    }

    GroupView.prototype.template = template;

    GroupView.prototype.autoRender = true;

    GroupView.prototype.className = 'group';

    GroupView.prototype.initialize = function() {
      GroupView.__super__.initialize.apply(this, arguments);
      this.model.on('change:transform2d', this.updatePosition);
      this.listenTo(this.model.get('teams'), 'add remove', this.render);
      return this.listenTo(this.model.get('matches'), 'add remove', this.render);
    };

    GroupView.prototype.updatePosition = function() {
      var t2d;
      t2d = this.model.get('transform2d');
      return this.$el.css({
        top: t2d.y + t2d.paddingY,
        left: t2d.x + t2d.paddingX
      });
    };

    GroupView.prototype.render = function() {
      var group, i, match, matches, _ref;
      GroupView.__super__.render.apply(this, arguments);
      group = {};
      group.title = this.model.get('title');
      group.matches = (function() {
        var _ref, _results;
        _ref = this.model.get('matches').models;
        _results = [];
        for (i in _ref) {
          match = _ref[i];
          _results.push(parseInt(i) + 1);
        }
        return _results;
      }).call(this);
      group.teams = this.model.get('teams').map(function(team) {
        return team.get('name');
      });
      this.$el.html(this.template(group));
      matches = this.model.get('matches');
      _ref = matches.models;
      for (i in _ref) {
        match = _ref[i];
        this.$('.match').eq(i).data('match', match);
      }
      return this;
    };

    return GroupView;

  })(View);
  
});
window.require.register("views/brackets/match-view", function(exports, require, module) {
  var MatchView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/brackets/match');

  module.exports = MatchView = (function(_super) {

    __extends(MatchView, _super);

    function MatchView() {
      this.updatePosition = __bind(this.updatePosition, this);

      this.changeTeams = __bind(this.changeTeams, this);
      return MatchView.__super__.constructor.apply(this, arguments);
    }

    MatchView.prototype.template = template;

    MatchView.prototype.autoRender = true;

    MatchView.prototype.className = 'match';

    MatchView.prototype.initialize = function() {
      var _this = this;
      MatchView.__super__.initialize.apply(this, arguments);
      this.model.on('change:transform2d', this.updatePosition);
      return this.listenTo(this.model.get('event').get('matchup'), 'change:teams', function() {
        return _this.changeTeams();
      });
    };

    MatchView.prototype.render = function() {
      var a, team, teamsObs;
      MatchView.__super__.render.apply(this, arguments);
      teamsObs = (function() {
        var _i, _len, _ref, _results;
        _ref = this.model.teams();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          team = {};
          team.name = a != null ? a.get('name') : '';
          team.points = (a != null) && a.get('name') !== '' ? a.get('points') : '';
          _results.push(team);
        }
        return _results;
      }).call(this);
      this.$el.html(this.template({
        teams: teamsObs
      }));
      this.updatePosition();
      return this;
    };

    MatchView.prototype.changeTeams = function() {
      var team, _i, _len, _ref,
        _this = this;
      this.stopListening();
      this.listenTo(this.model.get('event').get('matchup'), 'change:teams', function() {
        return _this.changeTeams();
      });
      _ref = this.model.teams();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        team = _ref[_i];
        this.listenTo(team, 'change', function() {
          return _this.render();
        });
      }
      return this.render();
    };

    MatchView.prototype.updatePosition = function() {
      var t2d;
      t2d = this.model.get('transform2d');
      return this.$el.css({
        top: t2d.y + t2d.paddingY,
        left: t2d.x + t2d.paddingX
      });
    };

    return MatchView;

  })(View);
  
});
