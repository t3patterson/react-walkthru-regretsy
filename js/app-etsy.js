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
})

var EtsyCollection = Backbone.Collection.extend({
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
    var regretsColl = new ProductCollection()

    var myList = [
      {title: 'Endangered tiger claw'},
      {title: 'Cool tee-shirt with shoulder spikes'},
      {title: "Cape dress"},
      {title: "Prosthetic tentacle for missing limb"}
    ]
    
    var myBBCollection = new ProductCollection(myList);

    var etsyProducts = new EtsyCollection()
    
    console.log('route match')
    
    etsyProducts.fetch().then(function(x){
      console.log(x)
    })

    DOM.render(<AppViewController 
                bbCollection_Products={etsyProducts} 
                bbCollection_Regrettables = {myBBCollection} />, 

    document.querySelector('.container'))

  },

  initialize: function(){
    console.log('routeer?')
    Backbone.history.start();
  }
})

console.log(React)

var AppViewController = React.createClass({
  render: function(){
    return (
      <div>
        <Favs regrettablesColl={this.props.bbCollection_Regrettables}/>
        <MultiDisplay productsColl={this.props.bbCollection_Products}/>
      </div>
    )
  }
})

var SearchBar = React.createClass({
  render: function(){
    return (
      <div className="search-bar align-children"> 
          <input type="text"/>
          <button className="green" type="button">Go!</button> 
      </div>
    )
  }
})

var MultiDisplay = React.createClass({


  getInitialState: function(){
    console.log("multi-initstate: ", this.props)
    return {
      productsList: this.props.productsColl.models
    }
  },


  componentDidMount: function(){
    this.props.productsColl.on('sync',  this._handleSync )
  },

  _handleSync: function(){
    this.setState({
      productsList: this.props.productsColl.models
    })
  },

  _popListing: function(){
    this.setState({
      
    })
  },

  _createProducts: function(productList){
    var component = this

    return productList.map(function(m,i){
      return (
        <div key={i}>
          <img src={m.get('Images')[0].url_170x135} alt="pic"/>
          <div className="caption">
            <h5>{m.get('title').slice(0,40)+"..."}</h5>
            <p>
              <button onClick={component._popListing} data-listing={m.get('listing_id')} className="btn btn-warning" role="button">––</button>
            </p>
            <p>
              <i className="fa fa-star-o fa-2x" data-rating="1"/> 
              <i className="fa fa-star-o fa-2x" data-rating="2"/> 
              <i className="fa fa-star-o fa-2x" data-rating="3"/> 
              <i className="fa fa-star-o fa-2x" data-rating="4"/> 
              <i className="fa fa-star-o fa-2x" data-rating="5"/>
            </p>
          </div>
        </div>
      )

    })
    
  },

  render: function(){
    return (
      <div className="multi-listing align-children">
          {this._createProducts(this.state.productsList)}
      </div>
    )
  }
})

var Favs = React.createClass({
  getInitialState: function(){
    return {
      isShowing: false,
      buttonTxt: "x"

    }
  },

  _createJSX: function(listOfTings){
    var jsxEls = listOfTings.map(function(el,i){
      return <li key={i}> { el.get('title') } </li>
    })

    return jsxEls
  },

  _toggleMenu: function(){
    if(this.state.isShowing){
      this.setState({ isShowing: false  })
    } else {
        this.setState({ isShowing: true  })
    }
  },

  render: function(){
    if ( this.state.isShowing ){
      var styleObj = {left: "5px"}
      var btnTxt = "x"
    } else {
      var styleObj = {left: "-240px"}
      var btnTxt = ">"
    }


    return (
      <div className={"favs"} style={styleObj} onClick={this._toggleMenu}>
        <ul >
          {this._createJSX(this.props.regrettablesColl)}
        </ul>
        <button>{btnTxt}</button>
      </div>
    )

  }
})

new AppRouter()

