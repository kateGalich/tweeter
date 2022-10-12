/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const time = timeago.format(tweetObj.created_at);
    const $tweet = $(`<article class="tweet">
    <header>
      <span class = "author">
        <img src="${escape(tweetObj.user.avatars)}">
        <span> ${escape(tweetObj.user.name)}</span>
      </span>
      <span class ="nick"> ${escape(tweetObj.user.handle)}</span>
    </header>
    <p class="message"> ${escape(tweetObj.content.text)}</p>
    <footer>
      <div>${time} days ago</div>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>`);

    return $tweet;
  };

  //show tweets on screen most recent first
  const renderTweets = function(tweetsArr) {
    //ignore  tweets than we already displayed
    tweetsArr.splice(0, $('#all-tweets').children().length);
    tweetsArr.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#all-tweets').prepend($tweet);
    });
  };

  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(renderTweets);
  };

  const showError = function(message) {
    $(".new-tweet .error span").text(message);
    if (message) {
      $(".new-tweet .error").slideDown("slow");
    } else {
      $(".new-tweet .error").slideUp("slow");
    }
  };

  $("#newTweetForm").submit(function(e) {
    e.preventDefault();
    // Validation
    const text = $('#tweet-text').val();
    if (!text) {
      showError("Text required");
      return;
    } else if (text.length > 140) {
      showError("Text is too long");
      return;
    }
    showError(''); //remove error from the screen

    // Send tweet to the server
    const data = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data })
      .then(function() {
        loadtweets();
        $("#tweet-text").val('');
        $(".counter").text('140');
      });
  });

  $("#tweet-text").val('');
  loadtweets();

  // Compose button animation
  function down() {
    $("nav i").animate({
      marginTop: "10px", marginBottom: "0px"
    }, 400, "swing", up);

  }
  function up() {
    $("nav i").animate({
      marginTop: "0px",
      marginBottom: "10px"
    }, 400, "swing", down);
  }
  down();
})
