while true
do
  open "https://page.garden" -a /Applications/Google\ Chrome.app/
  sleep 60
  osascript -e 'quit app "Google Chrome"'
  sleep 1740
done