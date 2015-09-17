import React from "react";
import Reflux from "reflux";
import Rx from "rx";
import { Settings, Sounds, Theme } from "../stores";
import { Header, Topnav, SoundList } from "../components";

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  mixins: [ Reflux.connect(Sounds, "sounds"), Reflux.connect(Theme, "theme"), Reflux.connect(Settings, "settings") ],
  componentDidMount() {
    Rx.Observable.fromEvent(window, "keyup")
      .map(e => e.keyCode)
      .windowWithCount(10, 1)
      .selectMany(x => x.toArray())
      .filter(seq => seq.toString() === [38, 38, 40, 40, 37, 39, 37, 39, 66, 65].toString())
      .subscribe(() => console.log("Konami!"));
  },
  render() {
    return (
      <div className="wrapper">
        <Topnav {...this.state.settings.intlData}/>
        <Header {...this.state.settings.intlData}/>
        <div className="container">
          <SoundList sounds={this.state.sounds} {...this.state.settings.intlData}/>
          {this.props.children && React.cloneElement(this.props.children, {...this.state.settings.intlData})}
          <aside className="toast-view"></aside>
        </div>
      </div>
    );
  }
});
