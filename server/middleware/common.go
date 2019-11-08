package middleware

import (
	"WeDrop/config"
	"github.com/kataras/iris"
)

//allowed max file size
var maxSize = config.Get().Upload.MaxSize

func sizeLimiter(ctx iris.Context) {
	if ctx.GetContentLength() > maxSize {
		ctx.StatusCode(iris.StatusRequestEntityTooLarge)
		return
	}
	ctx.Next()
}
