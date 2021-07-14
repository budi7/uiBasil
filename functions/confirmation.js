/*
name: logout
type: functions
list of functions:
- ConfirmationAsk : do logout confirmation and the actions

NOTE
-. this functions requires bootstrap vue
-. vm parameters must reference to "this" variable on your page
--------
*/
import labels from '~/json/label_general'

export default {
  functionConfirmationAsk (vm, label, style, callback) {
    if (!label.title) {
      label.title = labels.confirmation[vm.$store.getters['app/getLanguage']]
    }
    if (!label.ok) {
      label.ok = labels.yes[vm.$store.getters['app/getLanguage']]
    }
    if (!label.cancel) {
      label.cancel = labels.cancel[vm.$store.getters['app/getLanguage']]
    }

    vm.$bvModal.msgBoxConfirm(label.title, {
      centered: true,
      modalClass: 'confirm-modal',
      okVariant: style.ok ? style.ok : 'primary',
      cancelVariant: style.cancel ? style.cancel : 'primary',
      okTitle: label.ok,
      cancelTitle: label.cancel
    })
      .then((value) => {
        if (value) {
          vm.$root.$emit('confirmed', callback)
        } else {
          vm.$root.$emit('cancelled')
        }
      })
      .catch((err) => {
        // An error occurred
        // eslint-disable-next-line no-console
        console.log(err)
        vm.$root.$emit('cancelled')
      })
  }
}
