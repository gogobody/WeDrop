package common

import (
	"WeDrop/config"
	"WeDrop/server/api"
	"github.com/kataras/iris"
)

func LoadConfig(ctx iris.Context) {
	conf := config.Get()
	api.Success(ctx, "", conf)
}
