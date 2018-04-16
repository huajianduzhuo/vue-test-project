<template>
  <div class="container">
    <scrollbar wrap-class="scrollwrap" ref="scrollbar">
      <div class="thead" slot="fixedTop">
        <div class="th col1">name</div>
        <div class="th col0">id</div>
        <div class="th col2">age</div>
        <div class="th col3">gender</div>
        <div class="th col4">unit</div>
        <div class="th col5">skill</div>
      </div>
      <div class="tbody">
        <div v-for="(item, index) in list" class="tr" :class="{'active-tr': index === curTr}" :key="item.id" @click="handleClickTr(index)">
          <div class="td col1">{{item.name}}</div>
          <div class="td col0">{{item.id}}</div>
          <div class="td col2">{{item.age}}</div>
          <div class="td col3">{{item.gender}}</div>
          <div class="td col4">{{item.unit}}</div>
          <div class="td col5">{{item.skill}}</div>
        </div>
      </div>
      <div class="tbody shadow-right" slot="fixedLeft">
        <div class="th col1">name</div>
        <div v-for="(item, index) in list" class="tr" :class="{'active-tr': index === curTr}" :key="item.id">
          <<div class="td col1">{{item.name}}</div>
        </div>
      </div>
      <div class="tbody shadow-left" slot="fixedRight">
        <div class="th col5">skill</div>
        <div v-for="(item, index) in list" class="tr" :class="{'active-tr': index === curTr}" :key="item.id">
          <div class="td col5">{{item.skill}}</div>
        </div>
      </div>
      <div class="thead shadow-right" slot="fixedHeadLeft">
        <div class="th col1">name</div>
      </div>
      <div class="thead shadow-left" slot="fixedHeadRight">
        <div class="th col5">skill</div>
      </div>
    </scrollbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      curTr: '',
      list: [
        {
          id: 0,
          name: '卫庄',
          age: '19',
          gender: '男',
          unit: '鬼谷，流沙',
          skill: '横贯八方'
        },
        {
          id: 1,
          name: '盖聂',
          age: '18',
          gender: '男',
          unit: '鬼谷，流沙',
          skill: '百步飞剑'
        },
        {
          id: 2,
          name: '韩非',
          age: '29',
          gender: '男',
          unit: '法家，流沙',
          skill: '五蠹，韩非子'
        },
        {
          id: 3,
          name: '张良',
          age: '13',
          gender: '男',
          unit: '儒家，流沙',
          skill: '黄公书'
        },
        {
          id: 4,
          name: '嬴政',
          age: '20',
          gender: '男',
          unit: '秦国',
          skill: '一统天下'
        },
        {
          id: 5,
          name: '李斯',
          age: '27',
          gender: '男',
          unit: '法家，秦国',
          skill: '谏逐客书'
        },
        {
          id: 6,
          name: '红莲',
          age: '14',
          gender: '女',
          unit: '流沙',
          skill: '赤练蛇'
        },
        {
          id: 7,
          name: '白凤',
          age: '14',
          gender: '男',
          unit: '流沙，夜幕',
          skill: '凤舞四幻'
        },
        {
          id: 8,
          name: '墨鸦',
          age: '19',
          gender: '男',
          unit: '夜幕',
          skill: '轻功'
        }
      ]
    }
  },
  methods: {
    handleClickTr (index) {
      this.curTr = index
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 100px auto;
  width: 550px;
}
.th {
  background: #333333;
}
.tbody {
  background: #1e1e1e;
}
.active-tr {
  background: #666666;
}
.thead, .tbody {
  white-space: nowrap;
  float: left;
  font-size: 0;
}
.th, .td {
  display: inline-block;
  font-size: 16px;
  border-right: 1px solid #494949;
  border-bottom: 1px solid #333333;
  padding: 10px 15px;
  text-align: left;
}
.td {
  padding: 10px 15px;
}
.col0 {
  width: 30px;
}
.col1 {
  width: 50px;
}
.col2 {
  width: 30px;
}
.col3 {
  width: 70px;
}
.col4 {
  width: 150px;
}
.col5 {
  width: 150px;
}
.shadow-left {
  box-shadow: -5px 0 5px 0 rgba(0, 0, 0, .3);
}
.shadow-right {
  box-shadow: 5px 0 5px 0 rgba(0, 0, 0, .3);
}
</style>

<style lang="scss">
.scrollwrap {
  position: relative;
  max-width: 567px;
  max-height: 350px;
}
.fixed-top {
  position: absolute;
  top: 0;
  left: 0;
}
</style>