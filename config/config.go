package config

import (
	"github.com/BurntSushi/toml"
	"log"
)

type Config struct {
	MaxSize    int64
	UploadPath string
}

var conf Config

func getPath() string {
	filename := "config.toml"
	return filename
}

func Get() Config {
	if _, err := toml.Decode(getPath(), &conf); err != nil {
		// handle error
		log.Fatal("配置文件读取失败！", err)
	}

	return conf
}
