from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired


class abstractForm(FlaskForm):
  """ Represents a Flask form for capturing an abstract text.

    Attributes:
        abstract (TextAreaField): A text area input field for entering an abstract.
        submit (SubmitField): A submit button for submitting the form.
            
  """
  abstract = TextAreaField("Abstract", validators=[DataRequired()])
  submit = SubmitField("CHECK")