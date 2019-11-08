package server

import (
	"WeDrop/server/middleware"
	"WeDrop/server/router"
	"github.com/kataras/iris"
	"github.com/kataras/iris/middleware/logger"
	"github.com/kataras/iris/middleware/recover"
)

type Server struct {
	*iris.Application
}

func New() *Server {

	app := iris.New()
	app.Logger().SetLevel("debug")
	app.Use(recover.New())
	app.Use(logger.New())
	middleware.Register(app)
	router.Routes(app)

	app.Get("/hello", func(ctx iris.Context) {
		ctx.JSON(iris.Map{"message": "Hello Iris!"})
	})

	return &Server{
		app,
	}
}
