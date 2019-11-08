package upload

import (
	"WeDrop/server/api"
	"fmt"
	"github.com/kataras/iris"
)

func GetCode(ctx iris.Context) {
	chunksize := ctx.FormValue("chunksize") //int 100mb 限制文件大小
	downloads := ctx.FormValue("downloads") //下载次数
	host := ctx.FormValue("host")           //上传host
	info := ctx.FormValue("info")           //文件信息[{"id":"o_1dor309mtqlhtll1h5pums1arta","name":"叠猫猫.rar","type":"","relativePath":"","size":141940,"origSize":141940,"loaded":0,"percent":0,"status":1,"lastModifiedDate":"2019-10-25T01:50:58.975Z","completeTimestamp":0}]
	password := ctx.FormValue("password")   //文件提取码
	token := ctx.FormValue("token")         //login
	username := ctx.FormValue("username")   //login
	fmt.Println(chunksize, downloads, host, info, password, token, username)
	//log.Fatalf(chunksize, downloads, host, info, password, token, username)
	//accessid: "LTAIOnmRC072nE5u"
	//code: 106617
	//host: "airportal-cn-north.oss-cn-beijing.aliyuncs.com"
	//key: "NXHN01LjL4"
	//policy: "asdasas"
	//signature: "+hudiZVsbIBsCpogeAz4f3NLzfk="
	res := iris.Map{
		"accessid":  2131212,       //OSSAccessKeyId
		"code":      1231231,       //提取码
		"host":      "upload host", //oss host
		"key":       "key",
		"signature": "signature",
	}
	api.Success(ctx, "", res)

}
