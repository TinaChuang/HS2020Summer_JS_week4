export default{
  template: `
<div class="modal fade" id="editProdModel" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title font-weight-bold">編輯商品</h5>
        <button
          type="button"
          class="close text-white"
          data-dismiss="modal"
          aria-label="Close"
          @click="clearTempProd"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12 col-md-12 col-lg-4">
              <div class="form-group">
                <label for="imageUrl">輸入圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageUrl"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>                
              <img
                class="img-fluid"
                :src="tempProduct.imageUrl"
                :alt="tempProduct.title"
                :title="tempProduct.title"
              />
            </div>
            <div class="col-12 col-md-12 col-lg-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="category">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="unit">單位</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-12 col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    type="text"
                    class="form-control"
                    id="origin_price"
                    placeholder="請輸入原價"
                    v-model="tempProduct.origin_price"
                  />
                </div>
                <div class="form-group col-12 col-md-6">
                  <label for="price">售價</label>
                  <input
                    type="text"
                    class="form-control"
                    id="price"
                    placeholder="請輸入售價"
                    v-model="tempProduct.price"
                  />
                </div>
              </div>
              <hr/>
              <div class="form-group w-100">
                <label for="description">產品描述</label>
                <textarea
                  name=""
                  id="description"
                  class="form-control"
                  rows="3"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                ></textarea>
              </div>
              <div class="form-group w-100">
                <label for="content">說明內容</label>
                <textarea
                  name=""
                  id="content"
                  class="form-control"
                  rows="3"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                ></textarea>
              </div>
              <div class="form-group pl-4">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="enabled"
                  v-model="tempProduct.enabled"
                  :true-value="1"
                  :false-value="0"
                />
                <label class="form-check-label" for="enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          @click="clearTempProd"
        >
          取消
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="updateProd"
          v-bind:disabled="isLoadingBtn"
        >
          <span v-if="isLoadingBtn">
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </span>
          <span v-else>儲存</span>          
        </button>
      </div>
    </div>
  </div>
</div>
</div>
  `,
  props: ['tempProduct', 'apiUrl', 'currentPage'],
  data() {
    return {
      isLoadingBtn: false
    }
  },
  methods: {
    clearTempProd() {
      console.log("clearTempProd");
    },
    updateProd() {
      this.isLoadingBtn = true;
      // 若是是新增商品，利用時間戳記來做為商品ID
      if(!this.tempProduct.id){
        this.tempProduct.id = Date.now();
      }      
      const updateProdAPI = `${this.apiUrl.path}${this.apiUrl.uuid}/admin/ec/product/${this.tempProduct.id}`;
      // API 更新/新增商品資訊
      axios.patch(updateProdAPI, this.tempProduct)
        .then(res => {
          this.isLoadingBtn = false;
          // 呼叫父層重新抓取商品列表，並帶入目前所在的頁數，正要就不用重新回到第一頁
          this.$parent.getProdData(this.currentPage);
          $("#editProdModel").modal('hide');
        })
        .catch(err => {
          this.isLoadingBtn = false;
          console.log(err);
          alert("編輯失敗");
        })
    }
  }
}