(ns mimic.champions
  (:require [clojure.java.io :as io])
  (:import (java.io PushbackReader)))

(defonce champions-db
  (with-open
    [in (PushbackReader. (-> "champions.edn"
                             io/resource
                             io/reader))]
    (read in)))

(def champions-by-name
  "Returns an array containing all champions"
  (sort (map name (keys champions-db))))