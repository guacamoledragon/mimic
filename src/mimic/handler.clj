(ns mimic.handler
  (:require [compojure.core :refer [GET defroutes context]]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [ring.middleware.json :as json-middleware]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.reload :refer [wrap-reload]]
            [mimic.masteries :as masteries]
            [mimic.champions :as champions]))

(defroutes app-routes
  (GET "/" [] (resp/content-type (resp/resource-response "index.html" {:root "public"}) "text/html"))
  (context "/api" []
           (GET "/champions-by-name" [] (resp/response champions/champions-by-name))
           (GET "/mastery-tree" [] (resp/response masteries/mastery-tree)))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (-> app-routes
      (json-middleware/wrap-json-body)
      (json-middleware/wrap-json-response)
      (wrap-defaults site-defaults)
      (wrap-reload)))
