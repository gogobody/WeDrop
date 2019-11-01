package router

import (
	"WeDrop/server/api/common"
	"github.com/kataras/iris"
)

func CommonRoutes(party iris.Party) {
	commonroute := party.Party("/common")
	{
		loadConfig(commonroute)
	}
}

func loadConfig(party iris.Party) {
	party.Post("/loadconfig", common.LoadConfig)
}
