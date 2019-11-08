package upload

import (
	"WeDrop/config"
	"WeDrop/server/api"
	"fmt"
	"github.com/kataras/iris"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

//only support
func Uploadfile(ctx iris.Context) {
	// Get the max post value size passed via iris.WithPostMaxMemory.
	maxSize := ctx.Application().ConfigurationReadOnly().GetPostMaxMemory()
	err := ctx.Request().ParseMultipartForm(maxSize)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		api.Error(ctx, -1, err.Error(), "")
	}
	form := ctx.Request().MultipartForm
	fmt.Println(form)
	files := form.File["file"] //the key in form

	failures := 0
	for _, file := range files {
		beforeSave(ctx, file) //do something before file upload

		_, err = saveUploadedFile(file, config.Get().Upload.UploadPath)
		if err != nil {
			failures++
			api.Error(ctx, -1, err.Error(), "failed to upload: "+file.Filename)
		}
	}
	if len(files)-failures > 0 {
		api.Success(ctx, "upload success", "")
	} else {
		api.Error(ctx, -1, fmt.Sprintf("%d files upload succeed ,%d files upload failed", len(files)-failures, failures), "")
	}
}

func saveUploadedFile(fh *multipart.FileHeader, destDirectory string) (int64, error) {
	src, err := fh.Open()
	if err != nil {
		return 0, err
	}
	defer src.Close()

	out, err := os.OpenFile(filepath.Join(destDirectory, fh.Filename),
		os.O_WRONLY|os.O_CREATE, os.FileMode(0666))
	if err != nil {
		return 0, err
	}
	defer out.Close()

	return io.Copy(out, src)
}

//modify the save file
func beforeSave(ctx iris.Context, file *multipart.FileHeader) {
	//ip := ctx.RemoteAddr()
	//// make sure you format the ip in a way
	//// that can be used for a file name (simple case):
	//ip = strings.Replace(ip, ".", "_", -1)
	//ip = strings.Replace(ip, ":", "_", -1)
	timeNow := time.Now().Unix()
	file.Filename = strconv.FormatInt(timeNow, 10) + "-" + file.Filename
}
