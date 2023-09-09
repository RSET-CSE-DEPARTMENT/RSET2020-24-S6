{
\rtf1\ansi\ansicpg1252\cocoartf2638
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww28600\viewh17440\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 

<?php\
// Check if the form is submitted\
if ($_SERVER["REQUEST_METHOD"] == "POST") \{\
    // Retrieve the submitted username and password\
    $username = $_POST["student_username"];\
    $password = $_POST["student_password"];\
\
    // Perform authentication and authorization\
    // Replace this with your actual authentication and authorization logic\
    if ($username == "student" && $password == "password") \{\
        // Redirect to the student dashboard or homepage\
        header("Location: student_dashboard.php");\
        exit();\
    \} else \{\
        // Invalid credentials, show an error message\
        $error = "Invalid username or password";\
    \}\
\}\
?>\
\
<!DOCTYPE html>\
<html>\
<head>\
  <title>Student Login</title>\
  <!-- Add your CSS stylesheets and other head elements -->\
</head>\
<body>\
  <div class="container">\
    <h2>Student Login</h2>\
    <form action="student_login.php" method="POST">\
      <!-- Add your form elements -->\
      <div class="form-group">\
        <label for="student_username">Username:</label>\
        <input type="text" id="student_username" name="student_username" required>\
      </div>\
      <div class="form-group">\
        <label for="student_password">Password:</label>\
        <input type="password" id="student_password" name="student_password" required>\
      </div>\
      <div class="form-group">\
        <button type="submit">Login</button>\
      </div>\
      <?php if (isset($error)) \{ ?>\
        <p><?php echo $error; ?></p>\
      <?php \} ?>\
    </form>\
  </div>\
</body>\
</html>\
}