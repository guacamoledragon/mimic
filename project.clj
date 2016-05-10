(defproject mimic "0.2.0-SNAPSHOT"
  :description "An application that helps a Summoner plan out their mastery selection"
  :url "https://github.com/guacamoledragon/mimic"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [com.taoensso/timbre "4.3.1"]
                 [compojure "1.5.0"]
                 [ring/ring-defaults "0.2.0"]
                 [ring/ring-devel "1.4.0"]
                 [ring/ring-jetty-adapter "1.4.0"]
                 [ring/ring-json "0.4.0"]
                 [com.rpl/specter "0.10.0"]
                 [environ "1.0.2"]
                 [clj-lolapi "0.1.0-SNAPSHOT"]]
  :plugins [[lein-ring "0.9.7"]]
  :uberjar-name "mimic-0.2.0-SNAPSHOT-standalone.jar"
  :ring {:handler       mimic.handler/app
         :auto-refresh? true}
  :profiles {:dev     {:dependencies [[javax.servlet/servlet-api "2.5"]
                                      [ring/ring-mock "0.3.0"]]}
             :uberjar {:main mimic.handler
                       :aot :all}})
