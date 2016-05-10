(ns mimic.champions
  (:require [clojure.java.io :as io]
            [com.rpl.specter :as s :refer [ALL LAST]]
            [environ.core :refer [env]]
            [clj-lolapi.query :as query]
            [taoensso.timbre :refer [info]])
  (:import (java.io PushbackReader)))

(defonce champions-db
         (s/select [:data ALL LAST]
                   (if (env :riot-api-key)
                     (do
                       (info "Using Riot API Key")
                       (query/static "na" ["champion"]))
                     (with-open
                       [in (PushbackReader. (-> "champions.edn"
                                                io/resource
                                                io/reader))]
                       (info "Using dev-resources: champions.edn")
                       (read in)))))

(def champions-by-name
  "Returns an array containing all champions"
  (->> champions-db
       (sort-by :name)
       (mapv #(select-keys % [:id :key :name]))))

(defn champion
  [id]
  (query/static "na" ["champion" id] {:champData "blurb,stats"}))

