(ns mimic.handler
  (:require [compojure.core :refer [GET defroutes context]]
            [compojure.route :as route]
            [ring.util.response :as resp]
            [ring.middleware.json :as json-middleware]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.reload :refer [wrap-reload]]
            [clojure.java.io :as io]
            [mimic.masteries :as masteries])
  (:import (java.io PushbackReader)))

(def champions-db
  (with-open
    [in (PushbackReader. (io/reader "champions.edn"))]
    (read in)))

(defn champions-by-name
  [champions-db]
  "Returns an array containing all champions"
  (map name (keys champions-db)))


(defroutes app-routes
  (GET "/" [] (resp/content-type (resp/resource-response "index.html" {:root "public"}) "text/html"))
  (context "/api" []
           (GET "/champions-by-name" [] (resp/response (champions-by-name champions-db)))
           (GET "/mastery-tree" [] (resp/response masteries/mastery-tree)))
  (route/resources "/")
  (route/not-found "Not Found"))

(def app
  (-> app-routes
      (json-middleware/wrap-json-body)
      (json-middleware/wrap-json-response)
      (wrap-defaults site-defaults)
      (wrap-reload)))
