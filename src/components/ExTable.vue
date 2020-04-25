<script>
  import { Table } from 'element-ui'
  export default {
    name: 'ExTable',
    mixins: [Table],
    props: {
      scrollLoad: {
        type: Function,
        default: Promise.resolve(true)
      },
      sortLoad: {
        type: Function,
        default: () => {}
      },
      filterLoad: {
        type: Function,
        default: () => {}
      }
    },
    methods: {},
    mounted() {
      const self = this;
      this.$refs.bodyWrapper.addEventListener('scroll', function() {
        if (this.scrollHeight - this.scrollTop - this.clientHeight < 30) {
          if (self.loading) return false;
          self.loading = true;
          self.scrollLoad().then((res) => {
            self.loading = false;
          });
        }
      });
    }
  }
</script>
