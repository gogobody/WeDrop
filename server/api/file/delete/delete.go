package delete

import (
	"WeDrop/server/core/meta"
	"github.com/kataras/iris"
)

func FileDelHandler(ctx iris.Context) {
	fhash := ctx.FormValue("filehash")

}

func RemoveFileMeta(fileSha1 string) {
	delete(meta.FileMetas, fileSha1)
}
