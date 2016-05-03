(defproject mimic "0.1.0-SNAPSHOT"
  :description "An application that helps a Summoner plan out their mastery selection"
  :url "https://github.com/guacamoledragon/mimic"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [com.taoensso/timbre "4.3.1"]
                 [compojure "1.5.0"]
                 [ring/ring-defaults "0.2.0"]
                 [ring/ring-devel "1.4.0"]
                 [ring/ring-json "0.4.0"]
                 [com.rpl/specter "0.10.0"]
                 [environ "1.0.2"]
                 [clj-lolapi "0.1.0-SNAPSHOT"]]
  :plugins [[lein-ring "0.9.7"]
            [lein-heroku "0.5.3"]]
  :ring {:handler       mimic.handler/app
         :auto-refresh? true}
  :heroku {:app-name      "mimic-app"
           :jdk-version   "1.8"
           :include-files ["target/mimic-0.1.0-SNAPSHOT-standalone.jar"]
           :process-types {"web" "java -jar target/mimic-0.1.0-SNAPSHOT-standalone.jar"}}

  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring/ring-mock "0.3.0"]]}}
  :aliases {"uberjar" ["ring" "uberjar"]})
