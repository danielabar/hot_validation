# README

Investigation into form validation in Rails 7, with real-time feedback, without full page refresh and without a SPA. Benefit is validation rules only live in one place - on the server as part of the model, with no need for duplication and alternate implementation of the rules on the client.

Using StimulusJS from Hotwire to submit form to a validation endpoint as form is being filled in, and replace form html, taking care to replace cursor/focus where user was editing form.

This project uses import maps for JavaScript, with versions pinned to cdns, therefore no need for node/npm or yarn. It's also using vanilla css.

## Setup

```
bundle install
docker-compose up
bin/rails db:create
bin/rails db:migrate
bin/rails s
```

Navigate to: http://localhost:3000/ and click on "New book", fill out the form with valid/invalid data.

## TODO

* remove association to author and just make it author name to keep things focused on validation
* get rid of iteration over each field at top because messages are shown below each field
* would it make sense to wrap each form field in a turbo frame tag and replace only the individual field?
* possible to detect "dirty" fields and only validate those?
* validate published_at is not more than 100 years in the past and not in the future
* tidy up form error styling so its more clear what error message belongs to which field
* style: maintain red error border even when field is focused
* automated testing for stimulus controllers? has to be system test or could do unit testing? Any insight in guide: https://guides.rubyonrails.org/testing.html?
* auto refresh and/or HMR for stimulus js controller changes?
* annotate js controller code and erb with explanations

## Dev Notes

Can't use `blur` event because it creates infinite loop with focus/select code that puts user's cursor back where they were typing. This triggers another blur which fires the handler again.

```erb
<%= form.text_area :description, data: { action: "blur->form-validation#handleChange" } %>
```
Using [simple.css](https://github.com/kevquirk/simple.css)

Add lodash for import map:

```
bin/importmap pin lodash
```

```
bin/rails generate scaffold author name:string bio:text
bin/rails generate scaffold book title:string description:text published_at:date author:references
```

Model data types:

```
integer
primary_key
decimal
float
boolean
binary
string
text
date
time
datetime

You can also consider `references` as a kind of type. For instance, if you run:
bin/rails generate model photo title:string album:references
```

Generate a StimulusJS controller:

```
bin/rails g stimulus form_validation
```

## Original

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

### Ruby version

See `.ruby-version`

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
