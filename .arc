@app
sjcchoops

@macros
architect/macro-http-api

@http
get /
get /:sessionDate
post /sessions
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
sessions
  date *String

@indexes
players
  email *String

@aws
profile arc
region us-west-1