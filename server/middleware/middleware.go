package middleware

import (
	"github.com/kataras/iris"
)

func Cors(ctx iris.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	if ctx.Request().Method == "OPTIONS" {
		ctx.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS")
		ctx.Header("Access-Control-Allow-Headers", "*")
		ctx.StatusCode(204)
		return
	}
	ctx.Next()
}
func Register(app *iris.Application) {
	app.Use(jwtMiddle)
	app.Use(sizeLimiter)
	app.Use(Cors)
}
