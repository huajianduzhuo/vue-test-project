<template>
  <div class="main">
    <div class="container">
      <scrollbar wrap-class="scrollwrap" ref="scrollbar">
        <table style="width: 480px;">
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td class="col0">{{item.name}}</td>
              <td class="col1">{{item.id}}</td>
              <td class="col2">{{item.gender}}</td>
              <td class="col3">{{item.age}}</td>
              <td class="col4">{{item.unit}}</td>
              <td class="col5">{{item.skill}}</td>
            </tr>
          </tbody>
        </table>
        <table slot="fixedTop" style="width: 480px;">
          <thead>
            <tr>
              <th class="col0">name</th>
              <th class="col1">idf gfdssg srefre</th>
              <th class="col2">gender</th>
              <th class="col3">age</th>
              <th class="col4">unit</th>
              <th class="col5">skill</th>
            </tr>
          </thead>
        </table>
        <div class="col0 shadow-right" slot="fixedLeft">
        <table>
          <thead>
            <tr>
              <th class="col0">name</th>
              <!-- <th class="col1 hidden">id</th>
              <th class="col2 hidden">gender</th>
              <th class="col3 hidden">age</th>
              <th class="col4 hidden">unit</th>
              <th class="col5 hidden">skill</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td class="col0">{{item.name}}</td>
              <!-- <td class="col1 hidden">{{item.id}}</td>
              <td class="col2 hidden">{{item.gender}}</td>
              <td class="col3 hidden">{{item.age}}</td>
              <td class="col4 hidden">{{item.unit}}</td>
              <td class="col5 hidden">{{item.skill}}</td> -->
            </tr>
          </tbody>
        </table>
        </div>
        <div class="col5 shadow-left" slot="fixedRight">
        <table>
          <thead>
            <tr>
              <!-- <th class="col0 hidden">name</th>
              <th class="col1 hidden">id</th>
              <th class="col2 hidden">gender</th>
              <th class="col3 hidden">age</th>
              <th class="col4 hidden">unit</th> -->
              <th class="col5">skill</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <!-- <td class="col0 hidden">{{item.name}}</td>
              <td class="col1 hidden">{{item.id}}</td>
              <td class="col2 hidden">{{item.gender}}</td>
              <td class="col3 hidden">{{item.age}}</td>
              <td class="col4 hidden">{{item.unit}}</td> -->
              <td class="col5">{{item.skill}}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <div class="col0 shadow-right" slot="fixedHeadLeft">
        <table>
          <thead>
            <tr>
              <th class="col0">name</th>
              <th class="col1 hidden">idf gfdssg srefre</th>
              <th class="col2 hidden">gender</th>
              <th class="col3 hidden">age</th>
              <th class="col4 hidden">unit</th>
              <th class="col5 hidden">skill</th>
            </tr>
          </thead>
        </table>
        </div>
        <div class="col5 shadow-left" slot="fixedHeadRight">
        <table>
          <thead>
            <tr>
              <th class="col0 hidden">name</th>
              <th class="col1 hidden">idf gfdssg srefre</th>
              <th class="col2 hidden">gender</th>
              <th class="col3 hidden">age</th>
              <th class="col4 hidden">unit</th>
              <th class="col5">skill</th>
            </tr>
          </thead>
        </table>
        </div>
      </scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 450px;
  height: 350px;
  overflow: hidden;
}
table {
  border-spacing: 0;
  table-layout: fixed;
}
table tr th,
table tr td {
  font-size: 16px;
  border-right: 1px solid #494949;
  border-bottom: 1px solid #333333;
  padding: 10px 15px;
}
table thead {
  background: #333333;
}
table tbody {
  background: #1e1e1e;
}
.col0 {
  width: 50px;
  overflow: hidden;
}
.col1 {
  width: 30px;
}
.col2 {
  width: 70px;
}
.col3 {
  width: 30px;
}
.col4 {
  width: 150px;
}
.col5 {
  width: 150px;
  overflow: hidden;
}
.hidden {
  width: 0;
  font-size: 0;
  padding-left: 0;
  padding-right: 0;
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
  max-width: 500px;
  max-height: 350px;
}
.fixed-top {
  position: absolute;
  top: 0;
  left: 0;
}
</style>