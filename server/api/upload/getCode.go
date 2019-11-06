package upload

import (
	"WeDrop/server/api"
	"github.com/kataras/iris"
)

func GetCode(ctx iris.Context) {
	headers := ctx.Request().Header
	chunksize := headers.Get("chunksize") //int 100mb 限制文件大小
	downloads := headers.Get("downloads") //下载次数
	host := headers.Get("host")           //上传host
	info := headers.Get("info")           //文件信息[{"id":"o_1dor309mtqlhtll1h5pums1arta","name":"叠猫猫.rar","type":"","relativePath":"","size":141940,"origSize":141940,"loaded":0,"percent":0,"status":1,"lastModifiedDate":"2019-10-25T01:50:58.975Z","completeTimestamp":0}]
	password := headers.Get("password")   //文件提取码
	token := headers.Get("token")         //login
	username := headers.Get("username")   //login
	println(chunksize, downloads, host, info, password, token, username)

	//accessid: "LTAIOnmRC072nE5u"
	//code: 106617
	//host: "airportal-cn-north.oss-cn-beijing.aliyuncs.com"
	//key: "NXHN01LjL4"
	//policy: "asdasas"
	//signature: "+hudiZVsbIBsCpogeAz4f3NLzfk="
	res := iris.Map{
		"accessid":  123,   //OSSAccessKeyId
		"code":      123,   //提取码
		"host":      "sds", //oss host
		"key":       "",
		"signature": "",
	}
	api.Success(ctx, "", res)

}
