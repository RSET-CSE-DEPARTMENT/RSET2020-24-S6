$(document).ready(function () {
  var currentPage = 1;
  var includeQuery = "";
  var excludeQuery = "";
  var fetchedRecipes = [];
  var recipesPerPage = 12;
  var totalRecipes = 0;

  $('.menu-icon').click(function () {
    $('.menu').toggle();
  });

  $("form").on("submit", function (event) {
    event.preventDefault();
    currentPage = 1;
    includeQuery = $("#inquery").val();
    excludeQuery = $("#exquery").val();
    fetchedRecipes = [];
    loadRecipes();
  });

  function loadRecipes() {
    var apiKey = "86df18d7143744da90696e391186a6b1";
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey;

    if (includeQuery !== "") {
      apiUrl += "&query=" + includeQuery;
    }
    if (excludeQuery !== "") {
      apiUrl += "&intolerances=" + excludeQuery;
      apiUrl += "&excludeIngredients=" + excludeQuery;
    }

    apiUrl += "&number=" + recipesPerPage + "&offset=" + ((currentPage - 1) * recipesPerPage);

    $.ajax({
      url: apiUrl,
      method: "GET",
      success: function (response) {
        var recipes = response.results;
        var recipeList = "";

        if (recipes.length > 0) {
          for (var i = 0; i < recipes.length; i++) {
            var recipe = recipes[i];
            if (!fetchedRecipes.includes(recipe.id)) {
              var thumbnail = recipe.image;
              var title = recipe.title;
              var sourceUrl = recipe.sourceUrl;
              recipeList += "<li>";
              recipeList += '<a href="' + sourceUrl + '">';
              recipeList += '<img src="' + thumbnail + '" alt="' + title + '">';
              recipeList += "<p>" + title + "</p>";
              recipeList += "</a>";
              recipeList += "</li>";
              fetchedRecipes.push(recipe.id);
            }
          }
        } else {
          recipeList = "<li>No recipes found.</li>";
        }

        if (currentPage === 1) {
          $("#recipe-results").html("<ul id='recipe-list'>" + recipeList + "</ul>");
          totalRecipes = response.totalResults;
          if (totalRecipes > recipesPerPage) {
            $("#load-more").show();
          } else {
            $("#load-more").hide();
          }
        } else {
          $("#recipe-list").append(recipeList);
        }

        currentPage++;
      },
      error: function () {
        $("#recipe-results").html("<p>An error occurred. Please try again later.</p>");
      }
    });
  }

  $("#load-more").on("click", function () {
    loadRecipes();
  });

  // Chatbox Class
  class Chatbox {
    constructor() {
      this.args = {
        openButton: $(".chatbox__button button"),
        chatBox: $(".chatbox__support"),
        sendButton: $(".send__button")
      };

      this.state = false;
      this.messages = [];
    }

    display() {
      const { openButton, chatBox, sendButton } = this.args;

      openButton.on("click", () => this.toggleState(chatBox));

      sendButton.on("click", () => this.onSendButton(chatBox));

      const inputNode = chatBox.find("input");
      inputNode.on("keyup", ({ key }) => {
        if (key === "Enter") {
          this.onSendButton(chatBox);
        }
      });
    }

    toggleState(chatbox) {
      this.state = !this.state;

      // show or hide the box
      if (this.state) {
        chatbox.addClass("chatbox--active");
      } else {
        chatbox.removeClass("chatbox--active");
      }
    }

    onSendButton(chatbox) {
      const textField = chatbox.find("input");
      const message = textField.val().trim();

      if (message !== "") {
        const msg1 = { name: "User", message: message };
        this.messages.push(msg1);

        // Send message to the server
        // Modify the following fetch request based on your requirements
        fetch("http://127.0.0.1:5050/predict", {
          method: "POST",
          body: JSON.stringify({ message: message }),
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then((response) => response.json())
          .then((response) => {
            const msg2 = { name: "Sam", message: response.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.val("");
          })
          .catch((error) => {
            console.error("Error:", error);
            this.updateChatText(chatbox);
            textField.val("");
          });
      }
    }

    updateChatText(chatbox) {
      let html = "";
      this.messages
        .slice()
        .reverse()
        .forEach(function (item, index) {
          if (item.name === "Sam") {
            html +=
              '<div class="messages__item messages__item--visitor">' +
              item.message +
              "</div>";
          } else {
            html +=
              '<div class="messages__item messages__item--operator">' +
              item.message +
              "</div>";
          }
        });

      const chatmessage = chatbox.find(".chatbox__messages");
      chatmessage.html(html);
    }
  }

  const chatbox = new Chatbox();
  chatbox.display();
});
