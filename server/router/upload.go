package router

import "github.com/kataras/iris"
import "WeDrop/server/api/upload"

func UploadRoutes(party iris.Party) {
	party.Post("/upload", upload.Uploadfile)
}
