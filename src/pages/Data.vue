<template>
  <div class="wrapper">
    <h2>TODOS</h2>
    <div class="list">
      <div class="item" v-for="item in datas" :key="item.id">
        <div class="item-name">
          {{item.name}}
        </div>
        <button @click="deleteData(item.id)">删除</button>
      </div>
    </div>
    <input class="input-name" type="text" v-model="name" @keyup.enter="addData">
  </div>
</template>

<script>
import {getData, deleteData, addDatas} from '../api/nodeData'
export default {
  data () {
    return {
      datas: [],
      name: ''
    }
  },
  methods: {
    getData () {
      getData()
        .then(data => {
          this.datas = data.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteData (id) {
      deleteData(id)
        .then(data => {
          this.getData()
        })
        .catch(error => {
          console.log(error)
        })
    },
    addData () {
      let {name} = this
      let names = name.split(',')
      addDatas(names)
        .then(data => {
          this.name = ''
          this.getData()
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
h2 {
  margin-bottom: 0.3rem;
}
.list {
  width: 100%;
}
.item {
  margin: 0.1rem;
  display: flex;
  justify-content: center;
  &-name {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #999;
    flex: 1;
    margin-right: 0.1rem;
  }
}
.input-name {
  width: 80%;
}
</style>