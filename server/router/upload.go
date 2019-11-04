package router

import (
	"WeDrop/config"
	"github.com/kataras/iris"
)
import "WeDrop/server/api/upload"

func UploadRoutes(party iris.Party) {
	party.Post("/upload", iris.LimitRequestBodySize(config.Get().Upload.MaxSize), upload.Uploadfile)
	party.Party("/getCode", upload.GetCode)
}
