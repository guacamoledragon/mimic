(ns mimic.app
  (:use [com.rpl.specter])
  (:require [clojure.java.io :as io]
            [clojure.pprint :as pp]
            [clj-lolapi.core :as lol]
            [clj-lolapi.query :as query]))

;(pp/pprint mh/champions-db)

;(pp/pprint (query/static "na" ["mastery"] {:masteryListData "ranks"}))

;(pp/pprint (mastery-rows :Ferocity mastery-tree))
;(pp/pprint mastery-catalog)


