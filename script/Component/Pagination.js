export default{
  template: `
    <nav
      class="d-flex justify-content-center"
      v-if="pagesData.total_pages"
    >
      <ul class="pagination">
        <li
          class="page-item"
          :class="{ disabled: pagesData.current_page === 1 }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="updatePage(pagesData.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: pagesData.current_page === i }"
          v-for="i in pagesData.total_pages"
          :key="i"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="updatePage(i)"
          >
            {{ i }}
          </a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagesData.current_page === pagesData.total_pages }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="updatePage(pagesData.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  props: ['pagesData'],
  data() {
    return {}
  },
  methods: {
    updatePage(pageNum) {
      this.$parent.showLoadingMask();
      if (pageNum<=0) {
        pageNum = 1;
      } else if (pageNum > this.pagesData.total_pages){
        pageNum = this.pagesData.total_pages;
      }
      this.$emit("update", pageNum);
    }
  }
};