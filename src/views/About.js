
export default {
  name: 'About',
  data() {
    return {
      tag: 1,
      abs: 1212,
      newTodoText: 'bas'
    }
  },
  methods: {
    handle() {
      console.log(90238923);
    }
  },
  render(h) {
    const tags = `h${this.tag}`
    return (
      <div>
        <input vModel={this.newTodoText} />
        <tags vOn:click={this.handle}>This is an about page {this.abs}</tags>
      </div>
    )
  }
}
