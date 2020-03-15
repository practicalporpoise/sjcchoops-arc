const arc = require('@architect/functions');

module.exports = function Layout(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>SJCCHoops</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sscaffold-css@0.1.0/sscaffold.min.css" integrity="sha256-NxJ/Enl6+QKA3ysgZq44/qc6cWmUXbAB/hl+QFBuMck=" crossorigin="anonymous">
        <link rel="stylesheet" href="${arc.http.helpers.static('/app.css')}">
      </head>
      <body>
        <header>
          <span class="title">
            SJCC Hoops
          </span>
        </header>
        <main role="main" class="container">
          ${content}
        </main>
        <script type="application/javascript" src="${arc.http.helpers.static('/app.js')}"></script>
      </body>
    </html>
  `;
}