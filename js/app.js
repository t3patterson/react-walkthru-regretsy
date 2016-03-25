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

var AppViewController = React.createClass({
  getInitialState: function(){
    return {
      bbCollection_Products: this.props.bbCollection_Products.models,
      bbCollection_Regrettables: this.props.bbCollection_Regrettables,
    }
  },

  _handleDataSync: function(){
    this.setState({
      bbCollection_Products: this.props.bbCollection_Products
    })
  },

  _handleRatingClick: function(){},

  _removeProductFromList: function(e){
    console.log(e)
    console.log(e.target.dataset['listing'])
    var listingIdTgt = e.target.dataset['listing']
    this.setState({
      bbCollection_Products: this.state.bbCollection_Products.filter(function(mdl){
        return mdl.get('listing_id') !== parseInt(listingIdTgt)
      })
    })
  },

  _registerAppEvents: function(events){
    events.forEach(function(eObj){
      Backbone.Events.on(eObj.evtName, eObj.evtCb)
    }.bind(this))
  },

  componentDidMount: function(){
    var eventsList = [
      {evtName: "productRated",   evtCb: this._handleRatingClick},
      {evtName: "productRemoved", evtCb: this._removeProductFromList}
    ]
    
    this.props.bbCollection_Products.on('sync', this._handleDataSync )
    this._registerAppEvents(eventsList)
  },


  render: function(){
    return (
      <div>
        <h1 className="principal">Regr<span className="logo">Etsy</span></h1>
        <p><small>...I have a few</small></p>
        <RegrettablesList regrettablesColl={this.state.bbCollection_Regrettables}/>
        <MultiDisplay 
          productsCollModels={this.state.bbCollection_Products}
        />
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

  // 1b 
  _appPopListing: function(evt){
    console.log('triggering: product removed')
    Backbone.Events.trigger("productRemoved", evt)
  },

  _appRateClick: function(e){
    console.log(e.target.dataset)
    console.log(e.target.dataset['user_rating'])
    console.log(e.target.dataset['listing'])

    // id the model
    var modelToChange = this.state.productsList.find(function(mdl, i){
      return parseInt(e.target.dataset['listing']) === mdl.get('listing_id')
    })

    var updatedProducts = this.state.productsList.map(function(mdl, i){
      if ( parseInt(e.target.dataset['listing']) === mdl.get('listing_id') ){
        mdl.set({
          _theRating: e.target.dataset['user_rating']
        })
      }
      return mdl
    })

    console.log('triggering new regret')
    if ( e.target.dataset['user_rating'] === "boo" ) { Backbone.Events.trigger("newRegret", modelToChange) }

    this.setState({
      productsList: updatedProducts
    })
  },

  _createYayBooJSX(rating){
    if (rating === undefined) { return }

    var cssName

    if (rating === 'yay'){
      cssName = "good-rating"
    } else {
      cssName = "bad-rating"
    }

    return <p className={cssName}>{rating}</p>
  },

  _createProductsJSX: function(productList){
    var component = this

    return productList.map(function(m,i){
      return (
        <div key={i}>
          <img src={m.get('Images')[0].url_170x135} alt="pic"/>
          <h5>{m.get('title').slice(0,40)+"..."}</h5>
          <p>
            <button onClick={ component._appPopListing } data-listing={m.get('listing_id')} className="btn btn-warning" role="button">––</button>
          </p>
          <p>
            <i className="fa fa-thumbs-o-down fa-3x" data-listing={m.get('listing_id')} data-user_rating="boo" onClick={component._appRateClick}/> 
            &nbsp;&nbsp;&nbsp;
            <i className="fa fa-thumbs-o-up fa-3x"   data-listing={m.get('listing_id')} data-user_rating="yay" onClick={component._appRateClick}/> 
          </p>
          {component._createYayBooJSX( m.get('_theRating') )}
        </div>
      )

    })
  },


  render: function(){
    console.log(this.props.productsCollModels)
    return (
      <div className="multi-view">
          <h2 className="product-count">{this.props.productsCollModels.length} products</h2>
          <div className="multi-listing align-children" >
            {this._createProductsJSX(this.props.productsCollModels)}
          </div>
      </div>
    )
  }
})

var RegrettablesList = React.createClass({
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

  componentDidMount: function(){
    var self = this

    console.log('Favs.regrettablesColl: ', this.props.regrettablesColl)
    Backbone.Events.on('newRegret',function(x){
      console.log('new regret!')
      console.log('payload = ', x)

      console.log(self.props.regrettablesColl)
      self.props.regrettablesColl.add({title: x.get('title')})
      console.log(self.props.regrettablesColl)

    })

    this.props.regrettablesColl.on("add", function(){
      console.log('ADDkk on regrettables heard!!')
      self.forceUpdate() 
    })
  },

  render: function(){
    if ( this.state.isShowing ){
      var styleObj = {right: "5px"}
      var btnTxt = "x"
    } else {
      var styleObj = {right: "-240px"}
      var btnTxt = ">"
    }


    return (
      <div className={"regrets-list"} style={styleObj} >
        <h3>Regrettables</h3>
        <ul>
          {this._createJSX(this.props.regrettablesColl)}
        </ul>
        <button onClick={this._toggleMenu}>{btnTxt}</button>
      </div>
    )

  }
})

new AppRouter()

