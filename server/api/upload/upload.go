package upload

import (
	"WeDrop/config"
	"github.com/kataras/iris"
	"io"
	"os"
)

func Uploadfile(ctx iris.Context) {
	// Get the file from the request.
	file, info, err := ctx.FormFile("uploadfile")
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.HTML("Error while uploading: <b>" + err.Error() + "</b>")
		return
	}

	defer file.Close()
	fname := info.Filename

	// Create a file with the same name
	// assuming that you have a folder named 'uploads'
	println(config.Get().UploadPath + fname)
	out, err := os.OpenFile(config.Get().UploadPath+fname,
		os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.HTML("Error while uploading: <b>" + err.Error() + "</b>")
		return
	}
	defer out.Close()

	_, err = io.Copy(out, file)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.HTML("Error while uploading: <b>" + err.Error() + "</b>")
		return
	}
}
