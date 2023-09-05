// JavaScript code in your "script.js" file

document.addEventListener("DOMContentLoaded", function () {
  const dialogueContainer = document.querySelector(".dialogue-container");
  const dialogueBox = document.querySelector(".dialogue-box");
  let timeoutId;

  function showDialogue(text) {
    dialogueBox.innerText = text;
    dialogueContainer.style.animation = "none";
    setTimeout(function () {
      dialogueContainer.style.display = "flex";
      dialogueContainer.style.animation = "fadeIn 0.15s ease-in-out";
    }, 10);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      dialogueContainer.style.animation = "fadeOut 0.15s ease-in-out";
      dialogueContainer.addEventListener("animationend", function() {
        dialogueContainer.style.display = "none";
        dialogueContainer.style.animation = "";
      }, { once: true });
    }, (text.length / 1000) * 60000);
  }
  
  

  document.querySelectorAll(".click-box").forEach(function (clickBox) {
    clickBox.addEventListener("click", function () {
      const clickBoxId = clickBox.id;
      let textToShow = "";

      switch (clickBoxId) {
        case "rock-polaroid":
          textToShow = "Nothing good comes for free.";
          break;
        case "xoxo":
          textToShow = "Stream this song if you know what's good!!";
          break;
        case "sweetwater":
          textToShow = "The representatives at Sweetwater were so sweet! They keep calling me though...";
          break;
        case "bw-poster":
          textToShow = "I snagged this poster at 'The First And Last Tour'.";
          break;
        case "anri-keychain-1":
          textToShow = "This was my outfit for Tết Nguyên Đán.";
          break;
        case "anri-keychain-2":
          textToShow = "This was what I wore for the rock photoshoot! Check out the MV next week!";
          break;
        case "keshi-poster":
          textToShow = "Ever since I heard this artist 3 years ago, I can't get his voice 'outta my head'...";
          break;
        case "keshi-polaroid":
          textToShow = "Keshi signed this one for me on the back! ";
          break;
        case "calendar":
          textToShow = "My next live is on October 14th...There's still so much I need to practice...";
          break;
        case "acrylic-standee":
          textToShow = "I got this new custom acrylic standee made recently. It looks hella cute, don't you think?";
          break;
        case "gift-box":
          textToShow = "Andi surprised me with this... I specifically told him not to get me anything!";
          break;
        case "sv-box":
          textToShow = "The box cover photoshoot was a blast! I hope my energy was captured well.";
          break;
        case "mic":
          textToShow = "My trusty, go-to microphone for live performances!";
          break;
        case "barbie-pic":
          textToShow = "Girls' day with Teto! Anh Duy kept begging to join us, it was kinda annoying.";
          break;          
        case "mode-v":
          textToShow = "This vocal mode is filled with life and color, not dull or timid.";
          break;
        case "mode-e":
          textToShow = "This mode is where sound meets its boundary with an attitude, I was inspired by Gerard Way!";
          break;
        case "mode-d":
          textToShow = "This vocal mode is the shadowy side of sound, where mysteries and secrets hide.";
          break;
        case "mode-c":
          textToShow = "This vocal mode is the opposite of blurry, easy to hear and understand.";
          break;
        case "mode-p-1":
          textToShow = "A mode with a full, strong tone. My vocal inspiration for it was Queen Bey!";
          break;
        case "mode-f":
          textToShow = 'This mode is specially designed for melodic rap. "She got the ___ , next thing you know."';
          break;
        case "mode-w":
          textToShow = "This vocal mode is a soft spoken secret, a hushed tone in the air.";
          break;
        case "mode-s-1":
          textToShow = "This mode is represented by a flower that means honesty and sincerity in hanakotoba.";
          break;
        case "mode-m":
          textToShow = "This mode sounds gentle and laid-back... you may need to view it from a different angle...";
          break;
        case "mode-s-2":
          textToShow = "This vocal mode has a solemn and grave tone, not to be taken lightly.";
          break;
        case "mode-p-2":
          textToShow = "This mode is associated with royalty and is also a nickname for 'Aaliyah'!";
          break;
        default:
          textToShow = "Did you know Jun's birthday is coming up?";
      }
      showDialogue(textToShow);
    });
  });
});

