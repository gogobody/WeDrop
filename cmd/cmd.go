package cmd

import (
	"WeDrop/server"
	"errors"
	"fmt"
	"github.com/kataras/iris"
	"github.com/urfave/cli"
	"sync"
)

var Version = "0.0.1"
var helpTemplate = `NAME:
{{.Name}} - {{.Usage}}

DESCRIPTION:
{{.Description}}

USAGE:
{{.Name}} {{if .Flags}}[flags] {{end}}command{{if .Flags}}{{end}} [arguments...]

COMMANDS:
{{range .Commands}}{{join .Names ", "}}{{ "\t" }}{{.Usage}}
{{end}}{{if .Flags}}
FLAGS:
{{range .Flags}}{{.}}
{{end}}{{end}}
VERSION:
` + Version +
	`{{ "\n"}}`

var globalFlags = []cli.Flag{
	cli.StringFlag{
		Name:  "listener,l",
		Usage: "default host is 127.0.0.1:8080",
		Value: "127.0.0.1:8080",
	},
}

type Cmd struct {
	*cli.App
}

func New() *Cmd {
	//logger:=log.New(os.Stdout,"",log.LstdFlags)
	app := cli.NewApp()
	app.Name = "WeDrop"
	app.Author = "gogobody"
	app.Usage = " -help"
	app.Description = "share file or save file"
	app.Version = Version
	app.Flags = globalFlags
	app.CustomAppHelpTemplate = helpTemplate

	app.Before = func(c *cli.Context) error {
		return nil
	}

	app.CommandNotFound = func(c *cli.Context, command string) {
		fmt.Fprintf(c.App.Writer, "Thar be no %q here.\n", command)
	}
	var wg sync.WaitGroup
	app.Action = func(c *cli.Context) error {
		cli.HandleExitCoder(errors.New("not an exit coder, though"))
		//cli.ShowAppHelp(c)
		//cli.ShowCommandCompletions(c, "nope")
		//cli.ShowCommandHelp(c, "also-nope")
		//cli.ShowCompletions(c)
		//cli.ShowSubcommandHelp(c)
		//cli.ShowVersion(c)

		if v := c.String("listener"); v != "" {
			println("start listen", v)
			wg.Add(1)
			go func() {
				svr := server.New()
				svr.Run(iris.Addr(v), iris.WithoutServerError(iris.ErrServerClosed))
				wg.Done()
				println("server finished")
			}()
			wg.Wait()

		}

		return nil
	}

	return &Cmd{
		app,
	}
}
