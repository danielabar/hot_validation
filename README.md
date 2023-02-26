# README

Using [simple.css](https://github.com/kevquirk/simple.css)

```
bin/rails generate scaffold author name:string bio:text
bin/rails generate scaffold book title:string description:text published_at:date author:references
```

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

## Original
This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
