import login from "./Component/Login.js";
// import modal from "./Component/Modal.js";
import pagination from "./Component/Pagination.js";

Vue.component("login", login);
// Vue.component("modal", modal);
Vue.component("pagination", pagination);

const apiUrl = 'https://course-ec-api.hexschool.io/api/';

new Vue({
  el: "#app",
  data(){
    return {
      api: {
        uuid: 'e3cf317a-b68f-4629-9716-f0f4ec843e36',
        path: 'https://course-ec-api.hexschool.io/api/',
      },
      products: '',
      pages: '',
      isLogin: false,
    }
  },
  created() {
    let hexHWUuidCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWUuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let hexHWTokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    (!!hexHWUuidCookie)? this.isLogin = true: this.isLogin = false;
    axios.defaults.headers.common['Authorization'] = `Bearer ${hexHWTokenCookie}`;
  },
    methods: {
      isLoginHandler() {
        this.isLogin = true;
      },
      signOut() {
        document.cookie = "hexHWToken=; expires=";
        document.cookie = "hexHWUuid=; expires=";
        location.reload();
      },
      getProdData(pageNum = 1){
        this.showLoadingMask();
        this.uuid = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWUuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const getProdListAPI = `${apiUrl}${this.uuid}/ec/products?page=${pageNum}`;
        axios.get(getProdListAPI)
            .then(res=>{
              this.products = res.data.data;
              this.pages = res.data.meta.pagination;
              this.hideLoadingMask();
            })
            .catch(err=>{
              console.log("err: ", err);
              this.hideLoadingMask();
            })
      },
      showLoadingMask(){
        $(this.$refs.loadingMask).modal('show');
      },
      hideLoadingMask(){
        $(this.$refs.loadingMask).modal('hide');
      }
    }
});
