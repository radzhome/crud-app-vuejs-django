
new Vue({
  el: '#starting',
  delimiters: ['${','}'],
  data: {
    articles: [],
    loading: true,
    currentArticle: {},
    message: null,
    newArticle: { 'article_heading': null, 'article_body': null },
    search_term: '',
  },
  mounted: function() {
    this.getArticles();
  },
  methods: {
    getArticles: function() {
      // console.log(Vue.http.headers.common['X-API-URL'])
      let api_url = Vue.http.headers.common['X-API-URL'];
      if(this.search_term!==''||this.search_term!==null) {
        api_url = api_url + `?search=${this.search_term}`
      }
      this.loading = true;
      this.$http.get(api_url)
          .then((response) => {
            this.articles = response.data;
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
    },
    getArticle: function(id) {
      this.loading = true;
      this.$http.get(Vue.http.headers.common['X-API-URL'] + `${id}/`)
          .then((response) => {
            this.currentArticle = response.data;
            $("#editArticleModal").modal('show')
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
    },
    addArticle: function() {
      this.loading = true;
      this.$http.post(Vue.http.headers.common['X-API-URL'], this.newArticle)
          .then((response) => {
            this.loading = true;
            this.getArticles();
          })
          .catch((err) => {
            this.loading = true;
            console.log(err);
          })
    },
    updateArticle: function() {
      this.loading = true;
      this.$http.put(Vue.http.headers.common['X-API-URL'] + `${this.currentArticle.article_id}/`, this.currentArticle)
          .then((response) => {
            this.loading = false;
            this.currentArticle = response.data; // Not really needed since modal closes now
            this.getArticles();
            $("#editArticleModal").modal('hide')
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
    },
    deleteArticle: function(id) {
      this.loading = true;
      this.$http.delete(Vue.http.headers.common['X-API-URL'] + `${id}/`)
          .then((response) => {
            this.loading = false;
            this.getArticles();
          })
          .catch((err) => {
            this.loading = false;
            console.log(err);
          })
    }
  }
});