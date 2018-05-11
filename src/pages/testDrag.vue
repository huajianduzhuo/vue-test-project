<template>
  <div>
    <div
      class="dragarea"
      :class="{dragover: isDragOver}"
      @dragover.prevent="isDragOver=true"
      @dragleave.prevent="isDragOver=false"
      @drop.prevent="handleDrop">
      <div class="dragarea-bg" draggable="false">拖到图片至此区域</div>
      <div class="file-pre-item" v-for="(file, index) in files" :style="file.url ? `background-image: url(${file.url})` : ''" :key="index">
        <i class="del-file el-icon-circle-cross" @click="removeFile(index)"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDragOver: false,
      files: []
    }
  },
  methods: {
    handleDrop (ev) {
      console.log(ev.dataTransfer.files)
      this.isDragOver = false
      let files = Array.from(ev.dataTransfer.files)
      const l = this.files.length
      this.files = this.files.concat(new Array(files.length).fill({}))
      files.forEach((file, index) => {
        this.getFileUrl(file, index + l)
      })
    },
    getFileUrl (file, index) {
      const self = this
      let fileReader = new FileReader()
      fileReader.onload = function (event) {
        file.url = event.target.result
        self.files.splice(index, 1, file)
        fileReader = null
      }
      fileReader.readAsDataURL(file)
    },
    removeFile (index) {
      this.files.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
.dragarea {
  position: relative;
  width: 600px;
  height: 400px;
  background: lightblue;
  margin: 100px auto;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
.dragover {
  border: 2px dotted salmon;
}
.dragarea-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-user-select: none;
  user-select: none;
}
.file-pre-item {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 15px 0 0 15px;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #666666;
}
.del-file {
  position: absolute;
  right: -7px;
  top: -7px;
  width: 20px;
  height: 20px;
  font-size: 21px;
  line-height: 1;
  background: #d93c3c;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    color: #e6e6e6;
    right: -8px;
    top: -8px;
  }
}
</style>
