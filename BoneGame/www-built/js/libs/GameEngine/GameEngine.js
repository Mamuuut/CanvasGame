define(["GameEngine/States/StateManager","GameEngine/States/LoadingState","GameEngine/States/StartMenuState","GameEngine/States/GameState"],function(e,t,n,r){function i(i,s){this._stateManager=new e;var o=new t(s,i),u=new n(s,i),a=new r(s,i);this._stateManager.addState("loading",o),this._stateManager.addState("startMenu",u),this._stateManager.addState("game",a),this._stateManager.setCurrentState("loading");var f=this._stateManager;setInterval(function(){f.update()},s.frameRate)}return i})