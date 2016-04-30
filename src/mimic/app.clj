(ns mimic.app
  (:require [clojure.java.io :as io]
            [clojure.pprint :as pp]
            [mimic.handler :as mh]))

(pp/pprint mh/champions-db)