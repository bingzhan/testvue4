function fetchData (par) {
  console.log('fetchData', this.$http, par);
}


export default  {
  getTable(par) {
    console.log('dispatch getTable');
  },
  fetchData(par, dispatch) {
    dispatch('getTable', 123, dispatch);
    // this.$dispatch('getTable', 123);
    console.log('fetchDatas', this.$http, par);
  }
}
