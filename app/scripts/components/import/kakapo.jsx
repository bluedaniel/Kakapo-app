import React from "react";
import Reflux from "reflux";
import Radium from "radium";
import { IntlMixin } from "react-intl";
import classNames from "classnames";
import { searchActions } from "../../actions";
import { Settings, Search } from "../../stores";
import KakapoListItem from "./kakapoListItem";

export default new Radium(React.createClass({
  mixins: [ IntlMixin, Reflux.connect(Search, "items") ],
  componentDidMount() {
    searchActions.getKakapoFavourites();
  },
  render() {
    return (
      <div>
        <h5>{this.getIntlMessage("import.kakapo.header")}</h5>
        <p>{this.getIntlMessage("import.kakapo.subheader")}</p>
          <div className={classNames({"kakapofavs-items": this.state.items.kakapofavs.length})}>
            {this.state.items.kakapofavs.map(y =>
              <KakapoListItem
                key={y.name}
                {...y}
                {...Settings.opts.intlData}
              />, this)}
          </div>
      </div>
    );
  }
}));
