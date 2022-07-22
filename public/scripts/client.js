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

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('.dynamic').prepend($tweet);
      

    });

  }
  
  const createTweetElement = function(tweetData) {
    const $tweet = 
    `<div>
    <article class="tweet-log">
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
    </article>
    </div>`
    return $tweet;
  }
  
  renderTweets(data)



  // Add an Event Listener and Prevent the Default Behaviour
  $('#tweeting').on('submit', function(event) {
    // prevent default
    event.preventDefault();
    // changing the format
    const myInput = document.querySelector('#tweet-text')
    if (myInput.value === "") {
      // return alert("Can't post empty tweets")
      $("button").click(function() {
        $('#error').text("Can't post empty tweets").slideDown();
      })
    } 

    // console.log("check", myInput.value.length);
    if (myInput.value.length > 140) {
      // return alert("Exceeded the maximum amount of characters for this tweet")
      $("button").click(function(){
        $('#error').text("Exceeded the maximum amount of characters for this tweet").slideDown();
      })
    } 

    if (myInput.value.length <= 140 && myInput.value.length !== 0) {
      $('#error').slideUp();
      
    }

    const serializeForm = $(this).serialize();
    console.log("serializeForm", serializeForm);

    $.post('/tweets', serializeForm, () => {
      // console.log("We did it!")
    });

    $.ajax({
      url: `/tweets`,
      method: 'POST',
      data: serializeForm
    }).then(function() {
      $.ajax(`/tweets`, {
        method: 'GET',
      }).then(function(response) {
        renderTweets([response[response.length - 1]])
        


      })

    })




  })



  const loadTweets = function() {
    $.ajax({
      url: `/tweets`, 
      method: 'GET',
      
    }).then(function(response) {

      renderTweets(response);
    })


  }
  loadTweets();



});



