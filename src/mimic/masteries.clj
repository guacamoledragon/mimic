(ns mimic.masteries
  (require [com.rpl.specter :as s :refer [ALL LAST]]
           [clojure.java.io :as io]))

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

(def masteries-db
  ; hook up to the actual service
  ;(query/static "na" ["mastery"] {:masteryListData "ranks"})
  (-> "masteries.edn"
      io/resource
      io/file
      slurp
      read-string))

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
