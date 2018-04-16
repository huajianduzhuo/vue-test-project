<template>
  <div class="example-simple">
    <div class="upload">
      <div>
        
      </div>
      <ul>
        <li v-for="(file, index) in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
          <div class="progress-bar">
            <div class="progress-bar-active" :style="{width: file.progress + '%'}"></div>
          </div>
        </li>
      </ul>
      <div class="example-btn">
        <file-upload 
          class="btn btn-primary" 
          post-action="http://139.219.100.170:8080/rest/file/upload" 
          :multiple="true" 
          :size="1024 * 1024 * 100" 
          :data="{path: 0}"
          v-model="files" 
          @input-filter="inputFilter" 
          @input-file="inputFile" 
          ref="upload">
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          <i class="fa fa-arrow-up" aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" class="btn btn-danger" v-else @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
    <div style="height: 1000px; width: 2000px"></div>
  </div>
</template>
<style>
.example-simple label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>

<script>
import FileUpload from 'vue-upload-component'
export default {
  components: {
    FileUpload
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        // if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
        //   return prevent()
        // }
        // Filter php html js file
        // 过滤 php html js 文件
        // if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
        //   return prevent()
        // }
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }
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
  }
}
</script>
<style scoped>
.progress-bar {
  width: 80%;
  height: 30px;
  margin: 0 auto;
  border: 1px solid #ffffff;
  background: #333;
}
.progress-bar-active {
  height: 30px;
  background: #999;
}
</style>
