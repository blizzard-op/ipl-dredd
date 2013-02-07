window.require.register("views/templates/admin-toolbar", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	<button class=\"btn\" id=\"";
    stack1 = depth0.slug;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" >\n		";
    stack1 = depth0.label;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\n	</button>\n	";
    return buffer;}

    buffer += "<div class=\"btn-group btn-group\">\n	";
    stack1 = depth0.btns;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>";
    return buffer;});
});
window.require.register("views/templates/admin-workspace", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"bracket-container\">\n</div>\n<div id=\"toolbar-container\"></div>\n<div id=\"menu-container\"></div>\n";});
});
window.require.register("views/templates/brackets/bracket", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"line-layer\">\n</div>\n<div class=\"match-layer\">\n</div>\n<div class=\"label-layer\">\n<span class=\"bracket-title\"><h1></h1></span>\n</div>";});
});
window.require.register("views/templates/brackets/group-stage", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    buffer += "\n		<li>";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + "</li>\n	";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "";
    buffer += "\n		<li><button class=\"btn btn-mini match\">";
    depth0 = typeof depth0 === functionType ? depth0() : depth0;
    buffer += escapeExpression(depth0) + "</button></li>\n	";
    return buffer;}

    buffer += "<h3>";
    foundHelper = helpers.title;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</h3>\n<ul class=\"group-team-list\">\n	";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>\n<ul class=\"match-list\">\n	";
    stack1 = depth0.matches;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>";
    return buffer;});
});
window.require.register("views/templates/brackets/match", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	<span class=\"team-label\">";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</span>\n	<span class=\"team-score\">";
    stack1 = depth0.points;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</span>\n";
    return buffer;}

    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { return stack1; }
    else { return ''; }});
});
window.require.register("views/templates/game-sub", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		<button class=\"btn btn-small btn-primary btn-block team-btn\">";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</button>\n	";
    return buffer;}

  function program3(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		<button class=\"btn btn-small btn-block\" disabled>";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</button>\n	";
    return buffer;}

    buffer += "<div class=\"ready\">\n	<div class=\"game-header\">Game #";
    foundHelper = helpers.gameNumber;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.gameNumber; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</div>\n</div>\n<div class=\"in-progress\">\n	<span>Winner:</span>\n	";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>\n<div class=\"finished\">\n	";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</div>";
    return buffer;});
});
window.require.register("views/templates/group-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n		<li class=\"clearfix\">\n			<strong>";
    stack1 = depth0.title;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</strong>\n			<div class=\"group-input\">\n				<label>Players</label>\n				<input type=\"text\" value=\"";
    stack1 = depth0.players;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" class=\"span1 group-players-input\" >\n			</div>\n			<div class=\"group-input\">\n				<label>Matches</label>\n				<input type=\"text\" value=\"";
    stack1 = depth0.matches;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" class=\"span1 group-matches-input\">\n			</div>\n		</li>\n	";
    return buffer;}

    buffer += "<form>\n	<fieldset>\n	<legend>Edit Groups</legend>\n	<ul>\n	";
    stack1 = depth0.groups;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	</ul>\n	<hr>\n	<label>Add Group</label>\n	<button class=\"btn btn-success\">+</button>\n	</fieldset>\n</form>";
    return buffer;});
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"navbar-inner\">\n<div class=\"brand\">\n</div>\n<ul class=\"nav\">\n	<li>\n		<a class=\"header-link\" href=\"test/\">Load Bracket</a>\n	</li>\n	<li>\n		<a class=\"header-link\" href=\"http://brunch.readthedocs.org/\">Publish</a>\n	</li>\n</ul>\n</div>";});
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<a href=\"http://brunch.io/\">\n  <img src=\"http://brunch.io/images/brunch.png\" alt=\"Brunch\" />\n</a>\n";});
});
window.require.register("views/templates/match-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<form>\n	<fieldset>\n	<legend>Edit Match</legend>\n\n	<div id=\"teams-area\">\n		<label>Title</label>\n		<input type=\"text\" id=\"match-title\" value=\"";
    foundHelper = helpers.title;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">\n		<label>Teams</label>\n		<select id=\"team1\" class=\"team-list\" slot=\"0\" >\n		</select>\n		<select id=\"team2\" class=\"team-list\" slot=\"1\" >\n		</select>\n	</div>\n\n	<div id=\"games-area\">\n		<label>Best of</label>\n		<input type=\"text\" class=\"span1 best-of-input\" value=";
    foundHelper = helpers.bestOf;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.bestOf; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + ">\n		<ul id=\"game-container\">\n		</ul>\n		<button class=\"btn btn-success\" id=\"start-game-btn\">Start Game</button>\n	</div>\n\n	<div id=\"event-area\">\n		<label>Stream</label>\n		<select id=\"stream-select\" class=\"stream-list\">\n		</select>\n		<label>Start time</label>\n		<input type=\"text\" id=\"start-time\" value=\"";
    foundHelper = helpers.startsAt;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.startsAt; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">\n		<label>Groups</label>\n		<select multiple=\"multiple\" id=\"group-select\">\n		</select></div>\n\n	<hr>\n	<a href=\"#\">Click here to edit in IPL-Koala</a>\n	</fieldset>\n</form>";
    return buffer;});
});
window.require.register("views/templates/team-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n	<li class=\"team-field\">\n		<span class=\"team-label\">";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\n			<button class=\"btn btn-mini edit-team\"><i class=\"icon-pencil\"></i></button>\n		</span>\n		<span class=\"team-edit-label\">\n			<input class=\"team-input\" value=\"";
    stack1 = depth0.name;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "\" >\n			<button class=\"btn btn-mini edit-team\"><i class=\"icon-ok\"></i></button>\n		</span>\n	</li>	\n";
    return buffer;}

    buffer += "<form>\n	<legend>\nTeam seeding\n	</legend>\n	<fieldset>\n		<label class=\"checkbox\">\n			<input id=\"enable-seeding\" type=\"checkbox\" checked > Auto-seeding\n		</label>\n		<ol id=\"team-sort-list\">\n";
    stack1 = depth0.teams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n		</ol>\n	</fieldset>\n</form>";
    return buffer;});
});
window.require.register("views/templates/wizard-menu", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<form>\n	<legend>Generate matches</legend>\n	<fieldset>\n		<label>Number of players</label>\n		<input type=\"text\" value=\"16\" id=\"num-players\">\n		<label class=\"radio\">\n  			<input type=\"radio\" name=\"optionsRadios\" id=\"optionsElimination1\" value=\"single\" checked>\n  		Single elimination\n		</label>\n		<label class=\"radio\">\n		  <input type=\"radio\" name=\"optionsRadios\" id=\"optionsElimination2\" value=\"double\">\n		  Double elimination\n		</label>\n		\n			<button type=\"submit\" class=\"btn btn-primary\">Generate</button>\n		\n	</fieldset>\n</form>";});
});
