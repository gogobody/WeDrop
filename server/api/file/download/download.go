package download

import (
	"WeDrop/server/api"
	"WeDrop/server/core/meta"
	"github.com/kataras/iris"
)

func DownloadHandler(ctx iris.Context) {
	fhash := ctx.FormValue("filehash")
	if fhash != "" {
		fm := meta.GetFileMeta(fhash)
		ctx.Header("Content-Type", "application/octect-stream")
		ctx.Header("Content-Descrption", "attachment;filename=\""+fm.FileName+"\"")

		err := ctx.SendFile(fm.Location, fm.FileName)
		if err != nil {
			api.Success(ctx, "", "")
		}
	}

}
