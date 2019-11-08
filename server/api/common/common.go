package common

import (
	"WeDrop/config"
	"WeDrop/server/api"
	"WeDrop/server/middleware"
	"github.com/kataras/iris"
)

func LoadConfig(ctx iris.Context) {
	conf := config.Get()
	token, _ := middleware.CreateToken()
	confDate := iris.Map{
		"AppName": conf.Common.AppName,
		//"Host":conf.Common.Host,
		//"Port":conf.Common.Port,
		"apiVersion": conf.Common.ApiVersion,
		"token":      token,
	}

	api.Success(ctx, "", confDate)
}
