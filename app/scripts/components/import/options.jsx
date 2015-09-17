import Radium from "radium";
import React from "react";
import Reflux from "reflux";
import classNames from "classnames";
import { IntlMixin } from "react-intl";
import { Link } from "react-router";
import { Sounds } from "../../stores";
import { DownloadList } from "../../components";

export default new Radium(React.createClass({
  mixins: [ IntlMixin, Reflux.connect(Sounds, "sounds") ],
  render() {
    let activeDownloads = this.state.sounds.filter(s => s.recentlyDownloaded);
    return (
      <div className="media">
        <div className="options-kakapo">
          <h5>{this.getIntlMessage("import.options.header")}</h5>
          <Link className="option options-kakapo" to="/downloads/kakapo">
            <i className="icon-kakapo"/> {this.getIntlMessage("import.options.kakapo")}
          </Link>
          <Link className="option options-custom" to="/downloads/custom">
            <i className="icon-file dark"/> {this.getIntlMessage("import.options.custom")}
          </Link>
          <Link className="option options-youtube" to="/downloads/youtube">
            <i className="icon-youtube"/> {this.getIntlMessage("import.options.youtube")}
          </Link>
          <Link className="option options-soundcloud" to="/downloads/soundcloud">
            <i className="icon-soundcloud"/> {this.getIntlMessage("import.options.soundcloud")}
          </Link>
        </div>
        <div className={classNames("download-wrap", {"active": activeDownloads.length})}>
          <DownloadList sounds={activeDownloads}/>
        </div>
      </div>
    );
  }
}));
