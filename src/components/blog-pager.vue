<template>
  <div>
    <ul class="pull-right page">
      <li v-if="previous.show && current > 1">
        <a href="javascript:;" @click="step('previous', $event)">{{previous.text}}</a>
      </li>
      <li v-for="item in pagings" :class="{ active: item.current }">
        <span v-if="item.dot">...</span>
        <a v-if="!item.dot && item.number > 0 && !item.current" href="javascript:;" @click="pageChange(item.number, $event)">{{ item.number }}</a>
        <span v-if="item.current">{{ item.number }}</span>
      </li>
      <li v-if="next.show && current < total" @click="step('next', $event)">
        <a href="javascript:;">{{next.text}}</a>
      </li>
    </ul>
    <p class="total pull-left" v-if="total != 0 ">共 {{totalNum}} 条记录（{{this.$route.params.p_num}} / {{totals}}）</p>
  </div>
</template>
<script>
  import config from './config/app-config';

  export default {

    name: 'blog-pager',

    props: {
      totalNum: {
        type: Number,
        default: 1
      },
      maxNum: {
        type: Number,
        default: 1
      },
      currentNum: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        max: this.maxNum,
        previous: {
          show: true,
          text: '«'
        },
        next: {
          show: true,
          text: '»'
        },
        debug: true,
        c_id: this.$route.params.c_id,
        p_num: this.$route.params.p_num
      }
    },
    computed: {
      totals() {
        return Math.ceil( this.totalNum / config.indexShowNum ); //总页数
      },
      currents() {
        return this.currentNum - 0; //当前页数
      },
      pagings() {
        let tmp = [];
        this.total = this.totals;
        this.current = this.currents;

//        console.log(this.total);
//        console.log(this.current);
//        console.log(this.max);

        if ( typeof this.total !== 'number'
          || typeof this.current !== 'number'
          || typeof this.max !== 'number'
          || this.total <= 0
          || this.current <= 0
          || this.max <= 0) {
          return tmp;
        };

        for (let i = 0; i < this.total; i++) {
          tmp.push({
            number: i + 1
          });
        };

        if (this.total >= this.current) {
          tmp[this.current - 1].current = true;
        } else {
          console.log('this.current  ' + this.current);
          this.debug && alert('当前页不能大于总页数');
        }

        if (this.max <= this.total) {

          var before = this.current - Math.ceil(this.max / 2) - 1;
          var after = this.total - this.current - Math.floor(this.max / 2) - 1;
          var gap = this.current + Math.floor(this.max / 2);

          if (before < 0) {
            after += before;
            gap -= before;
          };

          if (after < 0) {
            before += after;
          };

          tmp.splice(gap, after, {
            dot: after < 1 ? false : true
          });

          tmp.splice(1, before, {
            dot: before < 1 ? false : true
          });

        } else {

          return tmp;
        }
        return tmp;
      }
    },
    methods: {
      pageChange (num, event) {
        if (event) event.preventDefault();
        if (typeof num !== 'number') { return false }
        this.current = num;
        this.$router.push({
          name: 'blog/category',
          params: {
            c_id: this.$route.params.c_id,
            p_num: this.current
          }
        });
      },
      step (type, event) {
        if (event) event.preventDefault();
        if (type === 'previous') {
          if (this.current > 1) {
            this.current = this.current - 1;
            this.$router.push({
              name: 'blog/category',
              params: {
                c_id: this.$route.params.c_id,
                p_num: this.current
              }
            });
          } else {
            this.debug && alert('已经第一页了');
            return false;
          }
        } else if (type === 'next') {
          if (this.current < this.total) {
            this.current = this.current + 1;
            this.$router.push({
              name: 'blog/category',
              params: {
                c_id: this.$route.params.c_id,
                p_num: this.current
              }
            });
          } else {
            this.debug && alert('已经最后一页了');
            return false;
          }
        }
      }
    },
  }
</script>
<style scoped>
  ul.page {
    list-style: none;
    padding: 0;
    margin: 20px 0 0;
  }
  ul.page li {
    display: inline-block;
    float: left;
    margin-left: 4px;
  }
  ul.page li.active {
    background-color: #ADB5A6;
  }
  ul.page li.active span {
    color: #fff;
  }
  ul.page li:hover a {
    color: #f00;
  }
  ul.page li a,
  ul.page li span {
    text-decoration: none;
    color: #777;
    padding: 1px 7px;
  }
  .total {
    margin: 20px 0 0;
    color: #777;
  }
</style>

