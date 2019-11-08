package config

import (
	"github.com/BurntSushi/toml"
	"log"
)

type Config struct {
	Common commonInfo
	Upload uploadInfo
	Aliyun aliyunOss
}

type commonInfo struct {
	AppName    string //"app name"`
	Host       string //"backend host"`
	Port       string //"backend port"`
	ApiVersion string
}

type uploadInfo struct {
	MaxSize      int64  //"allowed max file size"`
	UploadPath   string //"upload file path"`
	UploadSecret string
}

type aliyunOss struct {
	Endpoint        string
	accessKeyId     string
	accessKeySecret string
	bucketName      string
}

var conf Config

func getPath() string {
	filename := "config/config.toml"
	return filename
}

func Get() Config {

	if _, err := toml.DecodeFile(getPath(), &conf); err != nil {
		//		// handle error
		log.Fatal("配置文件读取失败！", err)
	} else {
		conf.Upload.MaxSize = conf.Upload.MaxSize << 20
	}

	return conf
}
