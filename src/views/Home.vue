<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <hello-world msg="Welcome to Your Vue.js App" />
    <app-version />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import AppVersion from '@/components/AppVersion.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
    AppVersion
  }
};
</script>
