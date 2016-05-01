(ns mimic.masteries
  (require [com.rpl.specter :as s :refer [ALL LAST]]))

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
  (read-string (slurp "masteries.edn")))

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
