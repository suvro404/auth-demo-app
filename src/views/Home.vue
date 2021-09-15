<template>
  <div class="container">
    <b-container class="mt-4 mb-4">
      <div class="d-flex justify-content-end">
        <b-button @click="logOut" variant="primary">LOG OUT</b-button>
      </div>
      <div v-if="userList.length">
        <h1>Meet the Legends!</h1>
        <b-row class="mt-4 justify-content-md-center" align-h="center">
          <b-col v-for="user in userList" :key="user.id"
                 class="d-flex justify-content-center col-xs-12 col-sm-3 col-md-3 col-lg-3"
          >
            <b-card
                :title="getFullName(user.first_name, user.last_name)"
                :img-src="user.avatar"
                :img-alt="user.first_name"
                img-top
                tag="article"
                class="mb-5"
            >
              <b-card-text>
                {{user.email}}
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <h1>Sorry, No users found.</h1>
      </div>
    </b-container>
  </div>
</template>

<script>
import basicMixins from "@/mixins/basicMixins";

export default {
  name: 'Home',
  data() {
    return {
      userList: []
    }
  },
  mixins: [basicMixins],
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      let queryName = 'users';
      let that = this;
      this.getData(queryName, function (data) {
        if(data) {
          //console.log(data);
          that.userList = data;
        }
      });
    },
    getFullName(firstName, lastName) {
      return firstName + ' ' + lastName;
    },
    logOut() {
      this.$store.commit('auth/setLoggedInStatus', false);
    }
  }
}
</script>
