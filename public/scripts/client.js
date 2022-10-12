/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //const time = timeago.format(tweetObj.created_at);
    let time = "x";

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

  const renderTweets = function(tweetsArr) {
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

  $("#newTweetForm").submit(function(e) {
    e.preventDefault();

    // Validation
    const text = $('#tweet-text').val();
    if (!text) {
      alert("Text required");
      return;
    } else if (text.length > 140) {
      alert("Text is too long");
      return;
    }

    // Send tweet to the server
    const data = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data })
      .then(function() {
        loadtweets();
        console.log('Success: ');
      });
  });

  
  loadtweets();

})

