Parse.initialize("TpddRNEVg1gw0BJmle7yrRgiLYqAbLLJQN1mJTDC", "sxYXMbpj2jpjHX7I20HQpAGyVjQpajfIwZox22WB");

var announcements = Parse.Object.extend("Announcements");
var query = new Parse.Query(announcements);
var box = $(".parse .grey-background")[0];
var now = new Date();

function cleanDate(ugly) {
    var ms = now.getTime() - ugly.getTime(),
        months = Math.floor((ms / 1000 / 60 / 60 / 24 / 7 / 30)),
        weeks = Math.floor((ms / 1000 / 60 / 60 / 24 / 7 % 30)),
        days = Math.floor((ms / 1000 / 60 / 60 / 24 % 7)),
        hours = Math.floor((ms / 1000 / 60 / 60 % 24)),
        minutes = Math.floor((ms / 1000 / 60) % 60),
        seconds = Math.floor((ms / 1000) % 60);

    if (months) {
        return (months > 1) ? (months + " months ago.") : (months + " month ago");
    } else if (weeks) {
        return (weeks > 1) ? (weeks + " weeks ago") : (weeks + " week ago");
    } else if (days) {
        return (days > 1) ? (days + " days ago") : (days + " day ago");
    } else if (hours) {
        return (hours > 1) ? (hours + " hours ago") : (hours + " hour ago");
    } else if (minutes) {
        return (minutes > 1) ? (minutes + " minutes ago") : (minutes + " minute ago");
    } else if (seconds) {
        return "less than a minute ago";
    } else {
        return " ";
    }
}

function fetch(now) {
    now = now || now;
    query.include("parent");
    query.find({
        success: function(events) {
            box.innerHTML = "";
            for (var i = events.length - 1; i >= 0; i--) {
                var event = events[i],
                    title = event.get("title"),
                    date = event.get("createdAt"),
                    description = event.get("description");
                var html =
                    '<div class="parse-wrapper">' +
                    '<div class="parse-title">' + title + '</div><br>' +
                    '<div class="parse-date">' + cleanDate(date) + '</div><br>'+
                    '<div class="parse-content">' + description + '</div></div>';
                box.innerHTML += html;
            }
        },
        error: function(error) {
            box.innerHTML = "Could not reach servers, this isn't a mistake though.";
        }
    });
}

fetch();

window.setInterval(function() {
    now = new Date();
    fetch(now);
}, 30000);
