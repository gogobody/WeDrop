package router

import (
	"WeDrop/server/router/file"
	"github.com/kataras/iris"
)

func Routes(app *iris.Application) {

	common := app.Party("/")
	{
		common.Options("*", func(ctx iris.Context) {
			ctx.Next()
		})
		api := common.Party("/api")
		{
			CommonRoutes(api)
		}

		v1 := api.Party("/v1")
		{
			file.FileRoutes(v1)
		}
	}

}
