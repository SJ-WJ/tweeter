/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Fake data taken from initial-tweets.json
const data = [
  // {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png"
  //     ,
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // },
  // {
  //   "user": {
  //     "name": "Descartes",
  //     "avatars": "https://i.imgur.com/nlhLi3I.png",
  //     "handle": "@rd"
  //   },
  //   "content": {
  //     "text": "Je pense , donc je suis"
  //   },
  //   "created_at": 1461113959088
  // }
]

$(document).ready(function () {

  const renderTweets = function (tweets) {
    // loops through tweets
    const tweetContainer = $('.dynamic').html("")
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      tweetContainer.prepend($tweet);
  
    });
  
  }
  
  const createTweetElement = function (tweetData) {
    const $tweet = `<article class="tweet-log">
    <span class="top">
      <span>
      <img src="${tweetData.user.avatars}"/>
      <small>${tweetData.user.name}</small>
      </span>
      <small>${tweetData.user.handle}</small>
    </span>
  
    <div>
      <div>${tweetData.content.text}</div>
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
  </article>`
    return $tweet;
  }
  
  
  
  
  // Add an Event Listener and Prevent the Default Behaviour
  $('#tweeting').on('submit', function(event) {
    // prevent default
    event.preventDefault();
    // changing the format
    const serializeForm = $(this).serialize();
    console.log("serializeForm", serializeForm);
    
    $.post('/tweets', serializeForm, () => {
      console.log("We did it!")
    });
    
    
    
  })
  
  
  
  const loadTweets = function() {
    $.ajax({ url:`http://localhost:8080/tweets`, method: 'GET',
    dataType: 'JSON'}).then(function(response) {
      console.log("response", response)
      
      renderTweets(response);
    })

  }
  loadTweets();
  
  //
  //loop through array
  const checkForm = document.querySelector('#tweeting');
    const myInput = document.querySelector('#tweet-text')
    checkForm.addEventListener('submit', function(event) {
      if (myInput.value === "") {
        event.preventDefault();
        return alert("Can't post empty tweets")
      }
      if (myInput > 140) {
        event.preventDefault();
        return alert("Exceeded the maximum amount of characters for this tweet")
      }

    })
  
  





});



