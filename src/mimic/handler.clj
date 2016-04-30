(ns mimic.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [clj-lolapi.core :as lol]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (route/not-found "Not Found"))

(def app
  (wrap-defaults app-routes site-defaults))
