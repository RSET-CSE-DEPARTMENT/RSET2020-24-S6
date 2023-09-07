# Import necessary modules and classes from Flask-WTF and WTForms
from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField,StringField
from wtforms.validators import DataRequired


class detailForm(FlaskForm):
  """Represents a Flask form for capturing details, including a title and an abstract.

    Attributes:
        title (StringField): A text input field for entering a title.    
        abstract (TextAreaField): A text area input field for entering an abstract.
        submit (SubmitField): A submit button for submitting the form.
  """
  title = StringField("Title",validators=[DataRequired()])
  abstract = TextAreaField("Abstract", validators=[DataRequired()])
  submit = SubmitField("Add")