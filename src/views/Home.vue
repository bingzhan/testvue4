<template>
  <div class="home">
    <ExTable :data="tableData" style="width: 100%" height="250" ref="table"
      :scrollLoad="fetcTable"
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
    </ExTable>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import ExTable from '@/components/ExTable.vue'

export default {
  name: 'Home',
  data() {
    return {
      as: '',
      tableData: []
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
    fetcTable() {
      return this.$http.get('/getPromiss', {params: {id:1}}).then((res) => {
        this.tableData.push(...res.data);
      });
    },
  },
  mounted() {
    // this.$dispatch('fetchData', {a:1,b:2});
    this.fetcTable();
    this.$http.post('/some/path', {abbshjshd:1,b:2}).then((res) => {
      console.log('results', res);
    });
    this.$http.post('/some/path', {c:1,b:2}).then((res) => {
      console.log('results', res);
    });
    this.$http.post('/user', {a:1,b:2}).then((res) => {
      console.log('results', res);
    });
  },
  components: {
    HelloWorld, ExTable
  }
}
</script>
