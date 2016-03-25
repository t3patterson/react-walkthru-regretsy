// es5, 6, and 7 polyfills, powered by babel
import polyfill from "babel-polyfill"

//
// fetch method, returns es6 promises
// if you uncomment 'universal-utils' below, you can comment out this line
import fetch from "isomorphic-fetch"


import $ from "jquery";
import _ from "underscore";
import Backbone from "backbone";


import DOM from 'react-dom'
import React, {Component} from 'react'

var ProductModel = Backbone.Model
var ProductCollection = Backbone.Collection.extend({
  accessToken: 'rtf0g2lb2o0xqsksl3jcro8z',

  url: function(){
    return "https://openapi.etsy.com/v2/listings/active.js?includes=Images&callback=?&api_key="+this.accessToken
  },

  parse: function(payload){
    return payload.results
  }
})

var AppRouter = Backbone.Router.extend({
  routes: {
    "*default" : "showHome"
  },

  showHome: function(){
    var myList = [
      {title: 'Endangered tiger claw'},
      {title: 'Cool tee-shirt with shoulder spikes'},
      {title: "Cape dress"},
      {title: "Prosthetic tentacle for missing limb"}
    ]

    var myBBCollection = new ProductCollection(myList);
    console.log(myList)
    DOM.render(<AppController collection={myBBCollection}/>, document.querySelector('.container'))

  },

  initialize: function(){
    console.log('routeer?')
    Backbone.history.start();
  }
})

console.log(React)

var AppController = React.createClass({
  render: function(){
    return (
      <div>
        <h1 className="principal">Regr<span className="logo">Etsy</span></h1>
        <p><small>...I have a few</small></p>
        <RegrettablesList regrettables={this.props.collection} />
      </div>
    )
  }
})

var RegrettablesList = React.createClass({
  getInitialState: function(){
    return {
      isShowing: false,
    }
  },

  _toggleMenu: function(){
    if(this.state.isShowing){
      this.setState({ isShowing: false  })
    } else {
        this.setState({ isShowing: true  })
    }
  },

  _createJSX: function(listOfTings){
    var jsxEls = listOfTings.map(function(el){
      return <li> { el.get('title') } </li>
    })

    return jsxEls
  },

  render: function(){
    if ( this.state.isShowing ){
      var styleObj = {right: "5px"}
      var btnTxt = "x"
    } else {
      var styleObj = {right: "-240px"}
      var btnTxt = "<"
    }

    return (
      <div className={"favs"} style={styleObj} onClick={this._toggleMenu}>
        <h3>Regrettables</h3>
        <ul >
          {this._createJSX(this.props.regrettables)}
        </ul>
        <button>{btnTxt}</button>
      </div>
    )
  }
})

new AppRouter()

