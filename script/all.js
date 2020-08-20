import login from "./Component/Login.js";
import modal from "./Component/Modal.js";
import pagination from "./Component/Pagination.js";

Vue.component("login", login);
Vue.component("modal", modal);
Vue.component("pagination", pagination);

// 驗證
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
});

const apiUrl = 'https://course-ec-api.hexschool.io/api/';

new Vue({
  el: "#app",
  data(){
    return {
      api: {
        uuid: 'e3cf317a-b68f-4629-9716-f0f4ec843e36',
        path: 'https://course-ec-api.hexschool.io/api/',
      },
      tempProduct: {
        imageUrl: []
      },
      products: '',
      pages: '',
      isLogin: false,
    }
  },
  created() {
    // 元件還沒被渲染出來時就先去判斷是否 cookie 有紀錄 token，若無則顯示登入的元件
    let hexHWUuidCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWUuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let hexHWTokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    (!!hexHWUuidCookie)? this.isLogin = true: this.isLogin = false;
    // 有 token 的話設定 axios headers
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
        let _uuid = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWUuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const getProdListAPI = `${apiUrl}${_uuid}/admin/ec/products?page=${pageNum}`;
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
      },
      openModal(type, prodId = '') {
        switch(type) {
          case "add": 
            this.tempProduct = { imageUrl: [] };
            $("#editProdModel").modal('show');
            break;
          case "edit":
            if(prodId != ''){
              this.getOneProd(prodId);              
            };            
            break;
          case "delete":
            break;
        }
      },
      delProd(id) {
        console.log("delProd: ", this.id);
      },
      getOneProd(id) {
        this.showLoadingMask();
        let _uuid = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWUuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const getOneProdAPI = `${apiUrl}${_uuid}/admin/ec/product/${id}`;
        axios.get(getOneProdAPI)
        .then(res => {
          this.tempProduct = res.data.data;
          $("#editProdModel").modal('show');
          this.hideLoadingMask();
        })
        .catch(err => {
          console.log(err);
        })
      }
    }
});
