
const HelloWorld = (context) => {
  console.log(99, context);
  const { props, data } = context;
  return <p>hello {data.name} {data.age}</p>
}
export default {
  name: 'Test',
  data() {
    return {
      header: 'headersss',
      footer: 'footerqqq',
    }
  },
  render(h) {
    console.log(232, this.$attrs, this);
    return (
      <div>
        <HelloWorld message={this.$attrs.name} {...this.$attrs} />
        {this.$scopedSlots.header({header: this.header})}
        {this.$scopedSlots.footer({footer: this.footer})}
        {this.$slots.default}
      </div>
    )
  }
}
