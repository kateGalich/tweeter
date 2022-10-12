/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const createTweetElement = function(tweetObj) {
    //const time = timeago.format(tweetObj.created_at);
    let time = "x";
    const $tweet = $(`<article class="tweet">
    <header>
      <span class = "author">
        <img src="${tweetObj.user.avatars}">
        <span> ${tweetObj.user.name}</span>
      </span>
      <span class ="nick"> ${tweetObj.user.handle}</span>
    </header>
    <p class="message"> ${tweetObj.content.text}</p>
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
    tweetsArr.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#all-tweets').append($tweet);
    });
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
        console.log('Success: ');
      });
  });

  const loadtweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(renderTweets);
  };

  loadtweets();







})

