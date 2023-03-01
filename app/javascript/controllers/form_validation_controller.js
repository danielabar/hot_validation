import { Controller } from "@hotwired/stimulus"
import _ from 'lodash';

export default class extends Controller {
  static targets  = [ "form", "output"]
  static values   = { url: String }

  // Called when associated element (i.e element having data-controller="form-validation") first enters the DOM
  initialize() {
    this.handleChange = _.debounce(this.handleChange, 500).bind(this)
  }

  // Ref: https://stevepolito.design/blog/rails-real-time-form-validation/
  // Original is using ujs but that has been removed in Rails 7, use fetch instead.
  handleChange(event) {
    console.log("=== FORM VALIDATION CONTROLLER: HANDLE CHANGE STARTING")
    let input = event.target
    const form = this.formTarget
    const url = this.urlValue
    const method = form.method
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content
    const data = new FormData(form)

    fetch(url, {
      method: method,
      headers: {
        "X-CSRF-Token": csrfToken
      },
      body: data
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      return response.text()
    })
    .then(responseText => {
      this.outputTarget.innerHTML = responseText;
      input = document.getElementById(input.id);
      this.moveCursorToEnd(input);
    })
    .catch(error => {
      console.error(error)
    })
  }

  // https://css-tricks.com/snippets/javascript/move-cursor-to-end-of-input/
  // added last else clause to focus whatever is given
  moveCursorToEnd(element) {
    console.log(`element is ${element.id}`)
    if (typeof element.selectionStart == "number") {
      element.focus();
      element.selectionStart = element.selectionEnd = element.value.length;
    } else if (typeof element.createTextRange != "undefined") {
      element.focus();
      var range = element.createTextRange();
      range.collapse(false);
      range.select();
    } else {
      element.focus();
    }
  }
}
