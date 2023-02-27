class FormValidations::BooksController < BooksController
  def update
    # call assign_attributes in the update action because we don't actually want to update the record in the database.
    # We just want to update the record in memory so that we can have it validated.
    @book.assign_attributes(book_params)
    @book.valid?
    respond_to do |format|
      format.text { render partial: "books/form", locals: { book: @book }, formats: [:html] }
    end
  end

  def create
    @book = Book.new(book_params)
    @book.validate
    respond_to do |format|
      format.text { render partial: "books/form", locals: { book: @book }, formats: [:html] }
    end
  end
end
