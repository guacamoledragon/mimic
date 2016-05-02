(ns mimic.masteries
  (require [com.rpl.specter :as s :refer [ALL LAST]]
           [clojure.java.io :as io]
           [environ.core :refer [env]]
           [clj-lolapi.query :as query]
           [taoensso.timbre :refer [info]])
  (:import (java.io PushbackReader)))

(def noop-mastery
  {:name ""
   :id 0
   :maxPoints 0})

(defn transform-mastery
  [[masteryId {:keys [id name ranks]}]]
  {masteryId
   {:name      name
    :id        id
    :maxPoints ranks}})

(defonce masteries-db
  (if (env :riot-api-key)
    (do
      (info "Using Riot API Key")
      (query/static "na" ["mastery"] {:masteryListData "ranks,tree"}))
    (with-open
      [in (PushbackReader. (-> "masteries.edn"
                               io/resource
                               io/reader))]
      (info "Using dev-resources: masteries.edn")
      (read in))))


(def mastery-catalog
  (:data
    (s/transform [:data ALL]
               transform-mastery
               masteries-db)))

(def mastery-tree
  (s/transform [ALL LAST ALL ALL]
             #(get mastery-catalog % noop-mastery)
             (s/transform [ALL LAST ALL ALL]
                        #(keyword (str (:masteryId %)))
                        (s/transform [ALL LAST ALL]
                                   :masteryTreeItems
                                   (:tree masteries-db)))))
