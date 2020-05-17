package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	for _, route := range routes {
		var handler http.Handler
		handler = route.HandlerFunc
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)

	}

	return router
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World!")
}

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/s-gbz/MemeScout25/1.0.0/",
		Index,
	},

	Route{
		"MemesPost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/memes",
		MemesPost,
	},

	Route{
		"MemesRatePost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/memes/rate",
		MemesRatePost,
	},

	Route{
		"MemesUploadPost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/memes/upload",
		MemesUploadPost,
	},

	Route{
		"UserLoginPost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/user/login",
		UserLoginPost,
	},

	Route{
		"UserMessagesPost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/user/messages",
		UserMessagesPost,
	},

	Route{
		"UserMessagesWritePost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/user/messages/write",
		UserMessagesWritePost,
	},

	Route{
		"UserProfileEditPost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/user/profile/edit",
		UserProfileEditPost,
	},

	Route{
		"UserProfilePost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/user/profile",
		UserProfilePost,
	},

	Route{
		"UserRegisterPost",
		strings.ToUpper("Post"),
		"/s-gbz/MemeScout25/1.0.0/user/register",
		UserRegisterPost,
	},
}
