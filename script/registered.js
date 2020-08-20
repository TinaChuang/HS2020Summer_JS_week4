// 自定義設定檔案，錯誤的 className
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

const vm = new Vue({
  el: "#registered-form",
  data() {
    return {
      userName: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
      paymentOptions: [
        {text: "WebATM", value: "WebATM"},
        {text: "ATM", value: "ATM"},
        {text: "Barcode", value: "Barcode"},
        {text: "Credit", value: "Credit"},
        {text: "ApplePay", value: "ApplePay"},
        {text: "GooglePay", value: "GooglePay"},
      ],
    }
  }
})