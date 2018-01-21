<template>
<div class="popup">
  <div class="title">
    <p>程序员老黄历</p>
    <h2>{{todayString}}</h2>
  </div>
  <div class="body">
    <div class="can-do">
      <div class="left-part"><span>宜</span></div>
      <ul class="desc">
        <li v-for="item in goodEvents">
          <h3>{{item.name}}</h3>
          <p>{{item.good}}</p>  
        <li/>
      </ul>
    </div>
    <div class="can-not-do">
      <div class="left-part"><span>不宜</span></div>
      <ul class="desc">
        <li v-for="item in badEvents">
          <h3>{{item.name}}</h3>
          <p>{{item.bad}}</p>  
        <li/>
      </ul>
    </div>
    <div class="foot-desc" :class="iday">
      <p><strong>座位朝向：</strong>面向<span>{{toward}}</span>写程序，BUG最少。</p>
      <p><strong>今日宜饮：</strong>{{drink}}</p>
      <p><strong>女神亲近指数：</strong><span class="star">{{goddess}}</span></p>
    </div>
    <div class="one">
      <p>{{oneSentence}}</p>
    </div>
  </div>

</div>
</template>
<script>
import { getOne } from './api/api'
import { random, star, pickRandom, pickRandomActivity, filter } from './api/util';
import {
  weeks,
  directions,
  activities,
  specials,
  tools,
  varNames,
  drinks
} from './api/base';
export default {
  data() {
    return {
      oneSentence: ''
    };
  },
  created() {
    this.todayString = this.getTodayString(this.iday);
    this.toward = this.getToward(this.iday);
    this.drink = this.getDrink(this.iday);
    this.goddess = this.getGoddess(this.iday);
    this.goodEvents = this.getEvent(this.iday).goodEvents;
    this.badEvents = this.getEvent(this.iday).badEvents;
    this._getOne()
  },
  computed: {
    iday() {
      var today = new Date();
      var day =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate() + 3;
      return day;
    }
  },
  methods: {
    getTodayString(iday) {
      return `今天是${iday.toString().slice(0, 4)}年${iday.toString().slice(4,6)}月${iday.toString().slice(6,8)} 星期${weeks[(new Date()).getDay() % 7]}`
    },
    getToward(iday) {
      return directions[random(iday, 2) % directions.length];
    },
    getDrink(iday) {
      return pickRandom(drinks, 2, iday).join('，');
    },
    getGoddess(iday) {
      return star(random(iday, 6) % 5 + 1);
    },
    getEvent(iday) {
      var filterActivies = filter(activities, iday)
      var numGood = random(iday, 98) % 3 + 2;
      var numBad = random(iday, 87) % 3 + 2;
      var eventArr = pickRandomActivity(filterActivies, numGood + numBad, this.iday);
      console.log(eventArr)
      console.log(filterActivies)
      var goodEvents = [], badEvents = [];
      for (var i = 0; i < specials.length; i++) {
        var special = specials[i];
        if(iday == special.date) {
          if (special.type == 'good') {
            goodEvents.push({name:special.name,good: special.description});
          }
          if (special.type == 'bad') {
            badEvents.push({name:special.name,bad: special.description});
          }
        }
      }
      for (var i = 0; i < numGood; i++) {
        goodEvents.push(eventArr[i]);
      }

      for (var i = 0; i < numBad; i++) {
        badEvents.push(eventArr[numGood + i]);
      }
      return { goodEvents: goodEvents.slice(0,3) , badEvents: badEvents.slice(0,2) };
    },
    _getOne() {
      getOne('r').then((res) => {
        console.log(res.data.sentence)
        this.oneSentence = res.data.sentence || ''
      })
    }
  }
};
</script>

<style lang="stylus" scoped>
* {
  margin: 0;
  padding: 0;
}

.popup {
  position: relative;
  width: 300px;
  border: 1px solid #eee;
  font-size: 0;

  .title {
    p {
      height: 30px;
      font-weight: bolder;
      line-height: 30px;
      background: #666;
      color: #bbb;
      font-size: 16px;
      padding-left: 10px;
      margin: 0;
    }

    h2 {
      margin: 0;
      font-size: 22px;
      font-weight: 900;
      line-height: 40px;
      height: 40px;
      text-align: center;
    }
  }

  .body {
    .can-do {
      .left-part {
        color: #000;
        background: rgb(255, 238, 68);
      }

      .desc {
        background: rgb(255, 255, 170);
      }
    }

    .can-not-do {
      .left-part {
        color: #fff;
        background: #ff4444;
      }

      .desc {
        background: #ffddd3;
      }
    }

    .can-do, .can-not-do {
      position: relative;

      .left-part {
        font-size: 32px;
        text-align: center;
        width: 25%;
        position: absolute;
        margin: auto 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-weight: bold;

        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          left: 0;
        }
      }

      .desc {
        width: 75%;
        margin-left: 25%;

        h3 {
          font-size: 20px;
          padding: 5px 0 0 10px;
          font-weight: 500;
        }

        p {
          font-size: 14px;
          padding-left: 10px;
          color: #666;
          padding-bottom: 5px;
        }
      }
    }
  }

  .foot-desc {
    margin: 10px;

    p {
      font-size: 14px;

      span {
        color: #4a4;
      }

      span.star {
        color: red;
      }
    }
  }
}

 .one{
  background #666  
  padding 10px
  p {
    font-size 14px
    color #fff
  }
 }
</style>
