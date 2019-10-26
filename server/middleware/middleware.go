package middleware

import "github.com/kataras/iris"

func Register(app *iris.Application) {
	app.Use(jwtMiddle)
	app.Use(sizeLimiter)
}
