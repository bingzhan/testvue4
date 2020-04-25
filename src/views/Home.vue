<template>
  <div class="home">
    <el-table :data="tableData" style="width: 100%" height="250" ref="table"
      @filter-change="filterChange">
      <el-table-column prop="date" label="日期" width="150"
        :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        column-key="date"
      ></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"
        :filters="[{text: '王小虎', value: '王小虎'}, {text: '王1虎', value: '王1虎'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
        column-key="name"
      ></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
    </el-table>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

const tableData = [
  { date: '2016-05-03', name: '王小虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
  { date: '2016-05-02', name: '王1虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
  { date: '2016-05-04', name: '王2虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
  { date: '2016-05-01', name: '王3虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
  { date: '2016-05-08', name: '王4虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
  { date: '2016-05-06', name: '王5虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
  { date: '2016-05-07', name: '王6虎', province: '上海', city: '普陀区', address: '上海市普陀区金沙江路 1518 弄', zip: 200333 },
]
export default {
  name: 'Home',
  data() {
    return {
      as: '',
      tableData: [...tableData]
    }
  },
  methods: {
    filterHandler(value, row, column) {
      console.log('filterHandler', value, row, column);
      const property = column['property'];
      return row[property] === value;
    },
    filterChange(value) {
      if (this.as !== '') {
        this.$refs.table.clearFilter('date');
      }
      this.as = value;
      console.log('filterChange', value);
    },
  },
  mounted() {
    // this.$dispatch('fetchData', {a:1,b:2});
    this.$http.get('/getPromiss', {params: {id:1}}).then(function(res) {
      console.log('results', res);
    });
    this.$http.post('/some/path', {abbshjshd:1,b:2}).then(function(res) {
      console.log('results', res);
    });
    this.$http.post('/some/path', {c:1,b:2}).then(function(res) {
      console.log('results', res);
    });
    this.$http.post('/user', {a:1,b:2}).then(function(res) {
      console.log('results', res);
    });

    // console.log(88, this.$refs.table.$refs.bodyWrapper);
    const self = this;
    this.$refs.table.$refs.bodyWrapper.addEventListener('scroll', function() {
      if (this.scrollHeight - this.scrollTop - this.clientHeight < 30) {
        self.tableData.push(...tableData);
        // console.log(1010, self.tableData.length);
      }
    });
  },
  components: {
    HelloWorld
  }
}
</script>
