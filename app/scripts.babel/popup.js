// 'use strict';
import Vue from 'vue';
import Popup from './popup/Popup.vue';

Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};

Array.prototype.indexOfAtt = function(val, attribute) {
  for (var i = 0; i < this.length; i++) {
    if (this[i][attribute] == val) return i;
  }
  return -1;
};

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

new Vue({
  el: '#app',
  render: c => c(Popup)
});
