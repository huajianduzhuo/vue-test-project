<template>
  <div class="wrap">
    this is tab2222222222222222222222222222222222222
    <br>
    <input type="file" accept="image/png,image/jpeg" ref="file" multiple name="" id="file" @change="previewImage">
    <ul class="img-preview-list">
      <li class="img-preview-item" v-for="(url, index) in files" :key="index">
        <div class="img-preview" :style="{backgroundImage: `url('${url}')`}"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      files: []
    }
  },
  methods: {
    previewImage () {
      const self = this
      const files = this.$refs.file.files
      this.files = new Array(files.length).fill('')
      Array.from(files).forEach((file, index) => {
        console.log(index)
        self.getFileUrl(file, index)
      })
    },
    getFileUrl (file, index) {
      const self = this
      let fileReader = new FileReader()
      fileReader.onload = function (event) {
        self.files.splice(index, 1, event.target.result)
        fileReader = null
      }
      fileReader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 100px;
  background: #333333;
}
.img-preview-list {
  display: flex;
  flex-flow: wrap;
}
.img-preview-item {
  width: 100px;
  height: 100px;
  margin-right: 15px;
}
.img-preview {
  width: 100px;
  height: 100%;
  background-color: #999999;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
