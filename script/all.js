;(function($){
  const apiUrl = 'https://course-ec-api.hexschool.io/api/';
  let vm = new Vue({
    el: "#app",
    data(){
      return {
        user: {
          email: '',
          password: ''
        },
        products: '',
        token: '',
        uuid: '',
        btnLoading: false
      }
    },
    methods: {
      signIn(){
        this.showLoadingMask();
        let {email, password} = this.user;
        if(email == '' || password == ''){
          alert("請填寫帳號及密碼");
          return false;
        }          
        const api = `${apiUrl}auth/login`;
        axios.post(api, this.user)
            .then(res=>{
              // 將帳密的輸入框清空
              this.user.email = '';
              this.user.password = '';
              // 判斷是否登入成功
              if(res.data.success){
                alert(res.data.message);
                this.token = res.data.token;
                this.uuid = res.data.uuid;
                // Token 與期限寫入 cookie
                document.cookie = `hexHWToken=${this.token}; expires=${new Date(res.data.expired * 1000)}`;
                document.cookie = `hexHWUuid=${this.uuid}; expires=${new Date(res.data.expired * 1000)}`;
              };
              this.hideLoadingMask();
            }).catch(res=>{
              // 將帳密的輸入框清空
              this.user.email = '';
              this.user.password = '';
              alert("該用戶不存在");
              this.hideLoadingMask();
            });          
      },
      signOut(){
        token = '';
        uuid = '';
        document.cookie = "hexHWToken=; expires=";
        document.cookie = "hexHWUuid=; expires=";
        location.reload();
      },
      getProdData(){
        this.showLoadingMask();
        this.uuid = document.cookie.replace(/(?:(?:^|.*;\s*)hexHWUuid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const getProdListAPI = `${apiUrl}${this.uuid}/ec/products`;
        axios.get(getProdListAPI)
            .then(res=>{
              this.products = res.data.data;
              this.hideLoadingMask();
            })
            .catch(err=>{
              console.log("err: ", err);
              this.hideLoadingMask();
            })
      },
      showLoadingMask(){
        $('#loadingMask').modal('show');
      },
      hideLoadingMask(){
        $('#loadingMask').modal('hide');
      }
    }
  });
})($);