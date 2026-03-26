in this assignment i complete my first fully functional e-commerse websit.
in this assignment i provide a proper food order, food offer system for users and resturants.
user tech - Html, css, javascript, mongodb, node.js, express.js and other external libarary line Bootstrap etc.
flowchart TB
  Browser["Browser (User)"]
  subgraph Frontend [Frontend (Static)]
    FE_HTML["index/login/signup/main/profile/cart/orders HTML"]
    FE_JS["script.js (logic)"]
    FE_CSS["style files"]
  end

  subgraph Backend [Backend]
    API["Express API (server.js)"]
    RouteAuth["auth router (auth.js)\nPOST /api/signup\nPOST /api/login"]
    DB["MongoDB (gofood database)"]
    UserColl["users collection\n{ email, password }"]
  end

  Browser --> FE_HTML
  FE_HTML --> FE_JS
  FE_JS -->|API: POST /api/signup| API
  FE_JS -->|API: POST /api/login| API
  API --> RouteAuth
  RouteAuth --> DB
  DB --> UserColl

  subgraph ClientStorage [Client Storage]
    LS_User["localStorage.user"]
    LS_Cart["localStorage.cart"]
    LS_Orders["localStorage.orders"]
  end

  FE_JS --> LS_User
  FE_JS --> LS_Cart
  FE_JS --> LS_Orders



Client UI in front end/ (static HTML+JS)
Auth user -> server API server.js
Data store -> MongoDB db.js
Model -> user.js
Router -> auth.js
Client persists cart+orders in browser
