(ns mimic.champions
  (:require [clojure.java.io :as io]
            [environ.core :refer [env]]
            [clj-lolapi.query :as query]
            [taoensso.timbre :refer [info]])
  (:import (java.io PushbackReader)))

(defonce champions-db
  (if (env :riot-api-key)
    (do
      (info "Using Riot API Key")
      (query/static "na" ["champion"]))
    (with-open
      [in (PushbackReader. (-> "champions.edn"
                               io/resource
                               io/reader))]
      (info "Using dev-resources: champions.edn")
      (read in))))

(def champions-by-name
  "Returns an array containing all champions"
  (mapv second
        (->> champions-db
             :data
             (sort-by #(-> % val :name)))))
