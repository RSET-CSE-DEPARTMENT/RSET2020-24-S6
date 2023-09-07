# Import necessary modules and classes from Flask-WTF and WTForm
from flask_wtf import FlaskForm
from wtforms import HiddenField, SubmitField
from wtforms.validators import DataRequired


class ResultForm(FlaskForm):
    """
    Represents a Flask form for capturing and submitting a result value along with a submit button.

    Attributes:
        result_value (HiddenField): A hidden input field for storing a result value.
        submit (SubmitField): A submit button for submitting the form.
    """
    
    result_value = HiddenField('Result Value', validators=[DataRequired()])
    submit = SubmitField('DETAILS')



