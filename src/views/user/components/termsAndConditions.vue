<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <a slot="activator" color="primary" dark @click="goTermsAndConditions()">
      {{ $t('login.termsAndConditions') }}
    </a>
    <v-card>
      <v-toolbar dark color="primary" style="position: fixed; z-index: 1;">
        <v-flex>
          <h4>{{ tac.title }}</h4>
        </v-flex>
        <v-flex text-xs-right>
          <i class="fa fa-times fa-2x" @click="dialog = false" />
        </v-flex>
      </v-toolbar>
      <v-card-text>
        <div class="terms-content content-html mt-5">
          <loading :progress="loading" />

          <div v-if="tac.contentHtml">
            <p v-html="tac.contentHtml" />
            {{ $t('login.updateDate') }}: {{ tac.updateDate | formatDate }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { getTermsTacs } from '@/api/setting';
import dateFormat from '../../../filters/formatTime';
import loading from '@/components/loading';

export default {
  name: 'TermsAndConditionsDialog',
  components: {
    loading
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return dateFormat.formatDate(date, 'yyyy.MM.dd');
    }
  },
  data() {
    return {
      dialog: false,
      tac: {},
      loading: 0
    };
  },
  methods: {
    goTermsAndConditions() {
      this.loading++;
      getTermsTacs().then(response => {
        if (response.data && response.data.id) {
          this.tac = response.data;
        }
        this.loading--;
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.fa-2x {
  margin-left: -1.5rem;
}
</style>
