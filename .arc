@app
sjcchoops

@http
get /admin/players
get /admin/players/new
get /admin/players/:playerId
post /admin/players
post /admin/players/:playerId
get /error

@static

@tables
players
  playerId *String

@indexes
players
  email *String

@aws
profile arc
region us-west-1
  