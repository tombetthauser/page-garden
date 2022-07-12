while true
do
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --dump-dom https://sound-garden.herokuapp.com
  say done with 1
  /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --dump-dom https://sound-garden.herokuapp.com
  say done with 2
  # /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --disable-gpu --dump-dom https://YOURHEROKUSITE2.com
    # open "https://imagesplash.cool" -a /Applications/Google\ Chrome.app/
  # sleep 60
  # osascript -e 'quit app "Google Chrome"'
  # sleep 1740
  sleep 10
done