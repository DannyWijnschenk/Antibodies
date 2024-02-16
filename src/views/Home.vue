<template>
  <div>
    <login-dialog v-if="!this.$store.getters.isLoggedIn" ref="login" title="Login Server" app="UserApp" v-on:loggedin="loggedin"></login-dialog>

    <div class="home" v-if="this.$store.getters.isLoggedIn">
      Welkom, {{ getUser() }}
      <div>
        Uploud your files<br>
        <label for="file-upload" class="btn btn-outline-primary">
          <font-awesome-icon icon="fa-solid fa-file-arrow-down" /> Upload
        </label>
        <input id="file-upload" type="file" @change="handleFileChange" class="btn btn-outline-primary"/>
      </div>
      <div class="file-upload-status">
        <div v-for="fileStatus in fileUploadStatus" :key="fileStatus.name" class="file-status">
          <span v-if="fileStatus.success" class="success-icon">✔</span>
          <span v-else class="error-icon">❌</span>
          <span class="file-name">{{ fileStatus.name }}</span>
          <span v-if="!fileStatus.success" class="error-message">
            {{ fileStatus.errorMessage }} (Status: {{ fileStatus.status }})
          </span>
        </div>
      </div>
    </div>

    <button type="button" class="btn" @click="showModal"> Open Modal! </button>
    <modal-lookup title="TheTitle" v-if="isModalVisible" v-on:closemodallookup="closemodal">
      <p>this is my content</p>
      <p>this is my content</p>
      <p>this is my content</p>
      <p>this is my content</p>
    </modal-lookup>
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue';
import ModalLookup from '@/components/ModalLookup.vue';

export default {
  name: 'HomeView',
  components: {
    LoginDialog,
    ModalLookup,
  },
  data() {
    return {
      isModalVisible: false,
      selectedFile: null,
      fileUploadStatus: [],
    };
  },
  methods: {
    loggedin() {},
    getUser() {
      this.$toast.show(`Hey! I'm here`);
      return this.$store.getters.user;
    },
    showModal() {
      this.isModalVisible = true;
      console.log('open modal', this.isModalVisible);
    },
    closemodal() {
      console.log('parent closemodal', this.isModalVisible);
      this.isModalVisible = false;
      console.log('close modal', this.isModalVisible);
    },
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      this.uploadFile();
    },
    uploadFile() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        const xhr = new XMLHttpRequest();
        const url = 'http://localhost:57772/api/clinicom/winfo/maintenance/upload';

        xhr.open('POST', url, true);

        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            const success = xhr.status === 200;
            const fileStatus = {
              name: this.selectedFile.name,
              success: success,
            };

            if (!success) {
              fileStatus.errorMessage = `Error: ${xhr.statusText}`;
              fileStatus.status = xhr.status;
            }

            this.fileUploadStatus.push(fileStatus);

            if (success) {
              console.log('File uploaded successfully', xhr.responseText);
            } else {
              console.error('Error uploading file', xhr.statusText);
            }

            this.selectedFile = null;
          }
        };

        xhr.send(formData);
      } else {
        console.warn('No file selected');
      }
    },
  },
};
</script>

<style scoped>
input[type="file"] {
    display: none;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
  .file-upload-status {
    margin-top: 10px;
  }

  .file-status {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .success-icon {
    color: green;
    margin-right: 5px;
  }

  .error-icon {
    color: red;
    margin-right: 5px;
  }

  .file-name {
    flex-grow: 1;
  }

  .error-message {
    color: red;
    margin-left: 10px;
  }
</style>
