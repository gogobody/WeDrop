package file

import (
	"WeDrop/config"
	"WeDrop/server/api/file/download"
	"WeDrop/server/api/file/stat"
	"WeDrop/server/api/file/update"
	"WeDrop/server/api/file/upload"
	"github.com/kataras/iris"
)

func FileRoutes(party iris.Party) {
	fileRout := party.Party("/file")
	{
		UploadRoutes(fileRout)
		StatFile(fileRout)
		Download(fileRout)
		UploadRoutes(fileRout)
	}

}

func UploadRoutes(party iris.Party) {

	party.Post("/upload", iris.LimitRequestBodySize(config.Get().Upload.MaxSize), upload.Uploadfile)
	party.Post("/getCode", upload.GetCode)
}

func Download(party iris.Party) {
	party.Get("/download", download.DownloadHandler)
}

func StatFile(party iris.Party) {
	party.Get("/stat", stat.GetFileMetaHandler)
}

func UpdateFile(party iris.Party) {
	party.Post("/update", update.FileUpdateMetaHandler)
}
