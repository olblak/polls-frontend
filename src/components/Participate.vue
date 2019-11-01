<template>
  <div v-if="isFormComplete">
    <div v-if="isReady">
      <div v-if=isRegistered>
        <img :src="require('@/assets/jenkins.png')">
        <p>Awesome your participation has been noted</p>
      </div>
      <div v-else>
        <img :src="require('@/assets/fire-jenkins.svg.png')">
        <p>Your participation can't be confirmed, please contact a Jenkins administrator</p>
      </div>
    </div>
    <div v-else>
      <div v-if="isFormComplete">
        Loading
      </div>
    </div>
  </div>
  <div v-else>
    <img :src="require('@/assets/jenkins.png')">
    <blockquote>
      <p>You are missing some information, please look at the link provided by email</p>
    </blockquote>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      email: null,
      poll: null,
      ready: false,
      token: null,
      confirmed: false
    }
  },
  watch: {
  },
  computed: {
    isPollProvided: function () {
      return `${this.poll}` !== 'undefined' && this.poll !== null
    },
    isTokenProvided: function () {
      return `${this.token}` !== 'undefined' && this.token !== null
    },
    isEmailProvided: function () {
      return `${this.email}` !== 'undefined' && this.email !== null
    },
    isReady: function () {
      return this.ready === true
    },
    isRegistered: function () {
      return this.confirmed === true
    },
    isFormComplete: function () {
      return this.isPollProvided === this.isTokenProvided === this.isEmailProvided
    }
  },
  methods: {
    participate: function () {
      if (this.isPollProvided && this.isTokenProvided && this.isEmailProvided) {
        axios.get(`/api/participate?poll=${this.poll}&token=${this.token}&email=${this.email}`)
          .then(response => {
            this.confirmed = (response.data.confirmed === 'true')
            this.ready = true
          })
          .catch(function (error) { console.log(error) })
      }
    },
    getJson: function () {
      return `
        {
          "poll": "${this.poll}",
          "token": "${this.token}",
          "email": "${this.email}"
        }`
    }
  },
  mounted: function () {
    this.token = this.$route.query.token
    this.email = this.$route.query.email
    this.poll = this.$route.query.poll

    this.$nextTick(function () {
      if (this.isPollProvided && this.isTokenProvided && this.isEmailProvided) {
        this.participate()
      }
    })
  }
}

</script>
