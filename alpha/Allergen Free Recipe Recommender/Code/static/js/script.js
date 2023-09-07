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
    var apiKey = "d72eeb79bcce435897547d8933677bbd";
    var apiUrl = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apiKey;

    if (includeQuery !== "") {
      apiUrl += "&query=" + includeQuery;
    }
    if (excludeQuery !== "") {
      apiUrl += "&intolerances=" + excludeQuery;
      apiUrl += "&excludeIngredients=" + excludeQuery;
    }

    apiUrl += "&number=" + recipesPerPage + "&offset=" + ((currentPage - 1) * recipesPerPage);
    apiUrl += "&addRecipeInformation=true"; // Fetch more information about the recipes
    apiUrl += "&includeInstructions=true"; // Filter out recipes without instructions

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
              var instructions = recipe.instructions; // Instructions for the recipe
              recipeList += "<li>";
              recipeList += '<a href="' + sourceUrl + '" target="_blank">'; // Make the recipe clickable and open in a new tab
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

  class Chatbox {
    constructor() {
      this.args = {
        openButton: document.querySelector(".chatbox__button"),
        chatBox: document.querySelector(".chatbox__support"),
        sendButton: document.querySelector(".send__button")
      };

      this.state = false;
      this.messages = [];
    }

    display() {
      const { openButton, chatBox, sendButton } = this.args;

      openButton.addEventListener("click", () => this.toggleState(chatBox));

      sendButton.addEventListener("click", () => this.onSendButton(chatBox));

      const node = chatBox.querySelector("input");
      node.addEventListener("keyup", ({ key }) => {
        if (key === "Enter") {
          this.onSendButton(chatBox);
        }
      });
    }

    toggleState(chatbox) {
      this.state = !this.state;

      // show or hides the box
      if (this.state) {
        chatbox.classList.add("chatbox--active");
      } else {
        chatbox.classList.remove("chatbox--active");
      }
    }

    onSendButton(chatbox) {
      var textField = chatbox.querySelector("input");
      let text1 = textField.value;
      if (text1 === "") {
        return;
      }

      let msg1 = { name: "User", message: text1 };
      this.messages.push(msg1);

      fetch("http://127.0.0.1:5050/predict", {
        method: "POST",
        body: JSON.stringify({ message: text1 }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((r) => r.json())
        .then((r) => {
          let msg2 = { name: "Sam", message: r.answer };
          this.messages.push(msg2);
          this.updateChatText(chatbox);
          textField.value = "";
        })
        .catch((error) => {
          console.error("Error:", error);
          this.updateChatText(chatbox);
          textField.value = "";
        });
    }

    updateChatText(chatbox) {
      var html = "";
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

      const chatmessage = chatbox.querySelector(".chatbox__messages");
      chatmessage.innerHTML = html;
    }
  }

  const chatbox = new Chatbox();
  chatbox.display();
});
