package main

import (
	"WeDrop/cmd"
)

func main() {
	app := cmd.New()
	app.RunAndExitOnError()

}
