<template>
  <div>
    <b-container>
      <div class="login">
        <h1 class="mb-3">{{currentStage}}</h1>
        <div>
          <b-form @submit="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Email address"
                label-for="input-1"
                class="mb-2"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  required
              ></b-form-input>
            </b-form-group>
            <b-form-group
                id="input-group-2"
                label="Password"
                label-for="input-2"
                class="mb-3"
            >
              <b-form-input
                  id="input-2"
                  v-model="form.password"
                  type="password"
                  required
              ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form>
        </div>
        <div v-if="currentStage== 'Log In'" class="msg">
          Don't have an account? Please <span class="stage" @click="changeCurrentStage('Sign Up')">Sign Up</span>
        </div>
        <div v-if="currentStage== 'Sign Up'"  class="msg">
          Already have an account? Please <span class="stage" @click="changeCurrentStage('Log In')">Log In</span>
        </div>
        <b-modal v-model="modalShow" :hide-header="true" :hide-footer="true">
          <p class="d-flex justify-content-center modal-msg">
            {{modalMsg}}
          </p>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import basicMixins from "@/mixins/basicMixins";

export default {
  name: "Auth",
  data() {
    return {
      currentStage: 'Log In',
      modalShow: false,
      form: {
        email: null,
        password: null
      },
      modalMsg: null,
      modalClass: null
    }
  },
  mixins: [basicMixins],
  methods: {
    onSubmit(event) {
      event.preventDefault();
      let action = this.currentStage == "Log In" ? 'login' : 'register';
      let that = this;
      this.postData(action, this.form, function (data) {
        if(data && data.token) {
          that.respondToAction(action);
        } else {
          that.modalShow = true;
          that.modalMsg = that.currentStage + " Failed!";
          that.closeModalAtDelay();
        }
      });
    },
    changeCurrentStage(stage) {
      this.currentStage = stage;
    },
    respondToAction(action) {
      this.modalShow = true;
      if(action == "login") {
        this.modalMsg = "Logged In Successfully!";
        let that = this;
        setTimeout(function () {
          that.modalShow = false;
          that.$store.commit("auth/setLoggedInStatus", true);
        }, 1000);
      } else {
        this.modalMsg = "Signed Up Successfully!";
        this.closeModalAtDelay();
        this.currentStage = "Log In";
      }
    },
    closeModalAtDelay() {
      let that = this;
      setTimeout(function () {
        that.modalShow = false;
      }, 1000);
    }
  }
}
</script>

<style scoped>
.container {
  background: #f45b69 !important;
  width: 100vw !important;
  height: 100vh !important;
  max-width: 100% !important;
}
.login {
  overflow: hidden;
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  max-width: 500px;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-transition: -webkit-transform 300ms, box-shadow 300ms;
  -moz-transition: -moz-transform 300ms, box-shadow 300ms;
  transition: transform 300ms, box-shadow 300ms;
  box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);
}
.login::before, .login::after {
  content: "";
  position: absolute;
  width: 600px;
  height: 600px;
  border-top-left-radius: 40%;
  border-top-right-radius: 45%;
  border-bottom-left-radius: 35%;
  border-bottom-right-radius: 40%;
  z-index: -1;
}
.login::before {
  left: 40%;
  bottom: -130%;
  background-color: rgba(69, 105, 144, 0.15);
  -webkit-animation: waves 6s infinite linear;
  -moz-animation: waves 6s infinite linear;
  animation: waves 6s infinite linear;
}
.login::after {
  left: 35%;
  bottom: -125%;
  background-color: rgba(2, 128, 144, 0.2);
  -webkit-animation: waves 7s infinite;
  -moz-animation: waves 7s infinite;
  animation: waves 7s infinite;
}


@-webkit-keyframes waves {
  from {
    -webkit-transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes waves {
  from {
    -moz-transform: rotate(0);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@keyframes waves {
  from {
    -webkit-transform: rotate(0);
    -moz-transform: rotate(0);
    -ms-transform: rotate(0);
    -o-transform: rotate(0);
    transform: rotate(0);
  }
  to {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.stage {
  cursor: pointer;
  color: #3c3ca5;
  font-weight: bold;
}

.msg {
  font-size: 0.8rem;
  margin-top: 15px;
}

#input-group-1, #input-group-2 {
  text-align: left !important;
}

.modal-msg {
  /*font-weight: bold;*/
  font-size: 1.2rem;
}
@media only screen and (max-width: 600px) {
  .login {
    width: 300px;
    max-width: 400px;
  }
}
</style>