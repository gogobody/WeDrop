package test

import (
	"WeDrop/config"
	"encoding/json"
)

func ConfigTest() {
	println("# config read test")
	conf := config.Get()
	jsn, _ := json.Marshal(conf)
	println(string(jsn))
}
