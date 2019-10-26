package middleware

import (
	"github.com/dgrijalva/jwt-go"
	//"github.com/dgrijalva/jwt-go"
	jwtmiddleware "github.com/iris-contrib/middleware/jwt"
	"github.com/kataras/iris"
	"strings"
	"time"
)

var mySecret = []byte("My Secret")

func jwtMiddle(ctx iris.Context) {

	// 页面无需验证
	if skipJWT(ctx.Path()) {
		ctx.Next()
		return
	}

	// token 验证
	jwtHandler := jwtmiddleware.New(jwtmiddleware.Config{
		ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
			return mySecret, nil
		},

		SigningMethod: jwt.SigningMethodHS256,
	})

	// jwt 验证
	if err := jwtHandler.CheckJWT(ctx); err != nil {
		ctx.StopExecution()
		return
	}

	ctx.Next()
}

// 跳过jwt的链接
func skipJWT(path string) bool {
	urls := []string{
		"",
	}
	for _, v := range urls {
		if v == path || strings.Contains(path, "debug") {
			return true
		}
	}
	return false
}

// CreateToken 新建一个Token
func CreateToken(userID uint) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"end":   time.Now().Unix() + 3600*24*15,
		"start": time.Now().Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	return token.SignedString(mySecret)
}
