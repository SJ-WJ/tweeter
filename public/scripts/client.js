/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [];

$(document).ready(function() {

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.dynamic').prepend($tweet);

    });
  };

  const createTweetElement = function(tweetData) {
    const $tweet =
      `<div class="division">
    <article class="tweet-log">
    <span class="top">
    <span class="icon-and-name">
    <img src="${tweetData.user.avatars}"/>
    <small class="actual-name">${tweetData.user.name}</small>
    </span>
    <small>${tweetData.user.handle}</small>
    </span>
    
    <div>
    <div class="message">${tweetData.content.text}</div>
    </div>
    
    <footer class="bottom-border">
    <span class="date">
    ${timeago.format(tweetData.created_at)}
    </span>
    <span class="three-icons">
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
    </span>
    </footer>
    </article>
    </div>`;
    return $tweet;
  };
  renderTweets(data);

  $('#tweeting').on('submit', function(event) {
    event.preventDefault();

    const myInput = document.querySelector('#tweet-text');
    if (myInput.value === "") {
      return $('#error').text("Can't post empty tweets 🤨").slideDown();
    }

    if (myInput.value.length > 140) {
      return $('#error').text("Exceeded the maximum amount of characters for this tweet 🤨").slideDown();
    }
    
    $("#error").text("").slideUp();
    const serializeForm = $(this).serialize();
    
    $.ajax({
      url: `/tweets`,
      method: 'POST',
      data: serializeForm
    }).then(function() {
      $("#tweet-text").val("");
      $('.dynamic').empty();
      $('.counter').text(140);
      loadTweets();
    });
  });

  const loadTweets = function() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
    }).then(function(response) {
      renderTweets(response);
    });
  };
  loadTweets();

});