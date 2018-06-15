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
        <span class="file-info">{{file.name}}</span>
        <span class="file-info">{{file.size | formatSize}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isDragOver: false,
      files: [],
      fileType: 'image/jpeg',
      qlty: 0.5,
      canvas: null,
      ctx: null,
      imgWH: 1000
    }
  },
  methods: {
    handleDrop (ev) {
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
  },
  filters: {
    formatSize (size) {
      if (size < 1024) {
        size = size + 'bytes'
      } else if (size < 1048576) {
        size = (size / 1024).toFixed(2) + 'KB'
      } else if (size < 1073741824) {
        size = (size / 1048576).toFixed(2) + 'MB'
      } else if (size < 1073741824 * 1024) {
        size = (size / 1073741824).toFixed(2) + 'GB'
      }
      return size
    }
  },
  mounted () {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
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
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: flex-end;
}
.file-info {
  display: block;
  font-size: 12px;
  color: #ececec;
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
