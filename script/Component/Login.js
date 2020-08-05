export default {
  template: `
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-12 col-sm-8 col-md-7 text-center">
        <div class="card p-5 shadow-sm">
          <h2 class="font-weight-bold mb-4">請先登入</h2>
          <div class="mb-4">
            <input
              type="email"
              id="Email"
              placeholder="Email address"
              class="form-control"
              v-model="user.email"
            />
            <br/>
            <input
              type="password"
              id="password"
              placeholder="Password"
              class="form-control"
              v-model="user.password"
              @keyup.enter="signIn"
            />
          </div>          
          <button
            type="button"
            class="btn btn-primary btn-block btn-lg"
            @click="signIn"
          >
            登入
          </button>
        </div>        
      </div>
    </div>
  `,
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  props: ['apiUrl'],
  methods: {
    signIn() {
      let {email, password} = this.user;
      if(email == '' || password == ''){
        alert("請填寫帳號及密碼");
        return false;
      };
      this.$parent.showLoadingMask();
      const api = `${this.apiUrl.path}auth/login`;
      axios.post(api, this.user)
          .then(res=>{
            // 將帳密的輸入框清空
            this.user.email = '';
            this.user.password = '';
            // 判斷是否登入成功
            if(res.data.success){
              alert(res.data.message);
              // Token 與期限寫入 cookie
              document.cookie = `hexHWToken=${res.data.token}; expires=${new Date(res.data.expired * 1000)}`;
              document.cookie = `hexHWUuid=${res.data.uuid}; expires=${new Date(res.data.expired * 1000)}`;
              axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
              this.$emit('logged');
              this.$parent.hideLoadingMask();
            };
          }).catch(res=>{
            // 將帳密的輸入框清空
            this.user.email = '';
            this.user.password = '';
            alert("該用戶不存在");
            this.$parent.hideLoadingMask();
          }); 
    }
  }
}