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

(defonce mastery-stats
         [{:name "Fury"
           :type :percent
           :stat {:bonusattackspeed [0.8, 1.6, 2.4, 3.2, 4.0]}}
          {:name "Sorcery"
           :type :percent
           :stat {:spelldamage [0.4, 0.8, 1.2, 1.6, 2.0]}}
          {:name "Vampirism"
           :type :percent
           :stat {:spellvamp [0.4, 0.8, 1.2, 1.6, 2.0]}}
          {:name "Natural Talent"
           :type :flat
           :stat {:attackdamageperlevel [0.11, 0.22, 0.33, 0.44, 0.55]
                  :spelldamageperlevel  [0.16, 0.32, 0.50, 0.66, 0.83]}}
          {:name "Battering Blows"
           :type :percent
           :stat {:armorpen [1.4, 2.8, 4.2, 5.6, 7.0]}}
          {:name "Piercing Thoughts"
           :type :percent
           :stat {:spellpen [1.4, 2.8, 4.2, 5.6, 7.0]}}
          {:name "Precision"
           :type :flat
           :stat {:armorpenperlevel [0.06, 0.12, 0.18, 0.24, 0.30]
                  :spellpenperlevel [0.6, 1.2, 1.8, 2.4, 3.0]}}
          {:name "Intelligence"
           :type :percent
           :stat {:cdr [1, 2, 3, 4, 5]}}
          {:name "Recovery"
           :type :flat
           :stat {:hpregen [0.4, 0.8, 1.2, 1.6, 2.0]}}
          {:name "Unyielding"
           :type :percent
           :stat {:armor      [1, 2, 3, 4, 5]
                  :spellblock [1, 2, 3, 4, 5]}}
          {:name "Veteran's Scars"
           :type :flat
           :stat {:hp [9, 18, 27, 36, 45]}}])


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
