import { Controller } from "@hotwired/stimulus"
import _ from 'lodash';


// Connects to data-controller="form-validation"
export default class extends Controller {
  static targets  = [ "form", "output"]
  static values   = { url: String }

  // can this be removed?
  connect() {
  }

  initialize() {
    this.handleChange = _.debounce(this.handleChange, 500).bind(this)
  }

  // Ref: https://stevepolito.design/blog/rails-real-time-form-validation/
  // Original is using ujs but that has been removed in Rails 7, use fetch instead.
  // TODO: debounce
  // TODO: return focus to wherever user was typing in form
  handleChange(event) {
    console.log("=== FORM VALIDATION CONTROLLER: HANDLE CHANGE STARTING")
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
    })
    .catch(error => {
      console.error(error)
    })
  }
}
