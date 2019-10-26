package router

import "github.com/kataras/iris"

func Routes(app *iris.Application) {
	v1 := app.Party("/v1")
	{
		UploadRoutes(v1)

	}
}
