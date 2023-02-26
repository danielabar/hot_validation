class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.date :published_at, null: false
      t.references :author, null: false, foreign_key: true

      t.timestamps
    end

    add_index :books, :title, unique: true
  end
end
