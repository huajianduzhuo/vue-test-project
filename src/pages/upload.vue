<template>
  <div class="wrapper">
    <div class="file-upload">
      <input ref="file1" type="file" name="file1" id="file1" @change="handleFile">
    </div>
    <div class="pre-img">
      <img v-show="fileSelected" ref="preload" src="" alt="file">
    </div>
    <div class="progress">
      <div class="progress-loaded" :style="{width: progress + '%'}"></div>
      <div class="progress-info">{{progress}}%</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      fileSelected: false,
      progress: 0
    }
  },
  methods: {
    handleFile () {
      let self = this
      self.progress = 0
      self.fileSelected = false
      if (this.$refs['file1'].files[0]) {
        if (window.FileReader) {
          let reader = new FileReader()
          reader.onload = e => {
            self.$refs['preload'].src = e.target.result
            self.fileSelected = true
          }
          reader.readAsDataURL(self.$refs['file1'].files[0])
        }
      }
      self.$nextTick(() => {
        self.upload()
      })
    },
    upload () {
      let form = new FormData()
      form.append('file1', this.$refs['file1'].files[0])
      let self = this
      axios.post('/upload', form, {
        onUploadProgress (progressEvent) {
          self.progress = parseInt(progressEvent.loaded / progressEvent.total * 100)
          console.log(self.progress)
          // if (self.progress === 100) {
          //   self.$nextTick(() => {
          //     setTimeout(() => {
          //       self.fileSelected = false
          //     }, 50)
          //   })
          // }
        }
      })
        .then(({data}) => {
          if (data.code === 0) {
          } else {
            alert(data.message)
          }
        })
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.file-upload {
  width: 150px;
  height: 150px;
  margin-right: 50px;
  background: url('../assets/icon_nav_add.png') no-repeat;
  background-color: rgb(117, 206, 206);
  background-position: center;
}
.file-upload input {
  display: inline-block;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.pre-img {
  height: 150px;
}
.pre-img img {
  max-height: 100%;
}
.progress {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 30px;
  background: rgb(182, 181, 181);
}
.progress-loaded {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgb(109, 108, 108);
}
.progress-info {
  position: absolute;
  width: 100%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: rgb(253, 253, 252);
  font-weight: bold;
  z-index: 100;
}
</style>