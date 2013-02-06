Controller = require 'controllers/base/controller'
HomePageView = require 'views/home-page-view'
Bracket = require 'models/brackets/bracket'
BracketView = require 'views/brackets/bracket-view'

module.exports = class HomeController extends Controller
	index: (routeVars)->
		@bracket = new Bracket()
		@bracket.fetch
			url: "http://test.ign.com:2121/brackets/v6/api/"+routeVars.slug
			success: (data)=>
				@bracketView.render()
		@bracketLoaded()

	bracketLoaded: ->
		viewPadding =
			top: 100
			right: 100
			bottom: 100
			left: 100
		@bracketView = new BracketView({model: @bracket}, viewPadding)