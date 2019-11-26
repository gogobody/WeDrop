package stat

import (
	"WeDrop/server/api"
	"WeDrop/server/core/meta"
	"encoding/json"
	"github.com/kataras/iris"
)

func GetFileMetaHandler(ctx iris.Context) {
	filehash := ctx.FormValue("filehash")
	fmeta := meta.GetFileMeta(filehash)
	data, err := json.Marshal(fmeta)
	if err != nil {
		api.Success(ctx, "", data)
	}
}
