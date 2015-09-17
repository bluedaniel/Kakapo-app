import "Intl";
import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router";
import routes from "./routes/routes";
import createHashHistory from "history/lib/createHashHistory";

ReactDOM.render(<Router history={createHashHistory({ queryKey: false })}>{routes}</Router>, document.getElementById("app"));
