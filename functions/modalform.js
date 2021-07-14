
export default {
  title: null,
  form: null,
  size: null,
  data: null,
  modalSet (_vm, modalContent) {
    const vm = this
    vm.title = modalContent.title
    vm.form = modalContent.form
    vm.size = modalContent.size
    vm.data = modalContent.data
  },
  modalOpen (_vm, modalRef, modalContent, callback) {
    _vm.$refs[modalRef].show()
  },
  modalClose (_vm, modalRef, modalContent, callback) {
    _vm.$refs[modalRef].hide()
  },
  modalReset (_vm, formRef) {
  },
  modalSave (_vm, data, id, variable) {
  }
}
