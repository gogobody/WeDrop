package update

import (
	"WeDrop/server/api"
	"WeDrop/server/core/meta"
	"encoding/json"
	"github.com/kataras/iris"
)

func FileUpdateMetaHandler(ctx iris.Context) {
	opType := ctx.FormValue("op")
	fileSha1 := ctx.FormValue("filehash")
	newFielName := ctx.FormValue("filename")

	if opType != "0" {
		api.Error(ctx, 405, "", "")
	}
	curFilemeta := meta.GetFileMeta(fileSha1)
	curFilemeta.FileName = newFielName
	meta.UpdateFileMeta(curFilemeta)
	data, err := json.Marshal(curFilemeta)
	if err != nil {
		api.Error(ctx, 405, err.Error(), "")
	}
	api.Success(ctx, "", data)

}
