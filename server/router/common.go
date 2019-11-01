package router

import "github.com/kataras/iris"

func CommonRoutes(party iris.Party) {
	common := party.Party("/common")
	{
		loadConfig(common)
	}
}

func loadConfig(party iris.Party) {
	party.Post("/loadconfig")
}
