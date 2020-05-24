
import Test from './Test.js'
export default {
  name: 'About',
  data() {
    return {
      tag: 1,
      age: 12,
      name: 'ken'
    }
  },
  methods: {
    handle() {
      this.age = this.age + 1;
    }
  },
  render(h, c) {
    const tags = `h${this.tag}`
    const scopedSlots = {
      header: (props) => <header>{props.header}</header>,
      footer: (props) => <footer>{props.footer}</footer>
    }
    return (
      <div>
        <elInput vModel={this.name} />
        <tags vOn:click={this.handle}>This is an about page {this.age}</tags>
        <Test age={this.age} name={this.name} scopedSlots={scopedSlots}><i>2387</i></Test>
      </div>
    )
  }
}
