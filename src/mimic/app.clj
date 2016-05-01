(ns mimic.app
  (:require [clojure.java.io :as io]
            [clojure.pprint :as pp]
            [mimic.handler :as mh]
            [clj-lolapi.core :as lol]))

;(pp/pprint mh/champions-db)

;(pp/pprint (lol/masteries "na"))