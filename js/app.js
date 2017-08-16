let apiURL = 'https://blockchain.info/ticker';

Vue.component('currency-row', {
  props: ['value', 'type'],
  template: '<tr>\
              <td>{{type}}</td>\
              <td>{{value.symbol}}{{value.last}}</td>\
              <td>{{value.symbol}}{{value.buy}}</td>\
              <td>{{value.symbol}}{{value.sell}}</td>\
            </tr>'
});

let vm = new Vue({
  el: '#app',
  data: {
    panelTitle: apiURL,
  	feedData: null,
    feedError: null
  },
  created: function () {
    this.fetchData()  
  },
  methods: {
    fetchData: function(){
      var self = this;
      let fetchObject = new Promise(function (resolve, reject){
        var xhr = new XMLHttpRequest()
        xhr.open('GET', apiURL);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
      });

      fetchObject.then(
      function (e){
        self.feedData = JSON.parse(e.target.responseText);
      }, 
      function (e){
        self.feedError = "Unable to load the currency data.";
      });
    },
  	refreshData: function(){
      this.feedError = null;
  		this.feedData = null;
  		this.fetchData();
  	}
  }
})