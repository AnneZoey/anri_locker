// JavaScript code in your "script.js" file

document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const dialogueContainer = document.querySelector(".dialogue-container");
  const dialogueBox = document.querySelector(".dialogue-box");
  const audio = document.getElementById('test-audio');
  const junHiding = document.getElementById('jun-hiding');
  const preorderButton = document.getElementById('preorder-button');
  const button = document.getElementById('button');
  const anriIcon = document.getElementById('anri-icon');
  const junIcon = document.getElementById('jun-icon');
  const sample = document.getElementById('sample');
  const loadingText = document.getElementById('loading-text');

  // Audio settings
  audio.volume = 0.7;
  // Game-related variables
  let timeoutId;
  let hitCount = 0;
  let preorderCount = 0;
  let randomNum = getRandomInt(1, 4);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Loading screen
  simulateLoading(function () {
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = 0;
    setTimeout(function () {
        loadingScreen.style.display = "none";
        loadingScreen.remove();
    }, 1500);
  });

  function simulateLoading(callback) {
    const progressBar = document.querySelector(".progress-bar");
    loadingText.textContent = getText(randomNum);
    let width = 0;
    const interval = setInterval(function () {
        if (width >= 100) {
            clearInterval(interval);
            callback();
        } else {
            width++;
            progressBar.style.width = width + "%";
        }
    }, 30);
  }

  function getText(randomNum) {
    switch (randomNum) {
      case 1:
        return "My main fashion style is inspired by the ABG aesthetic!";
      case 2:
        return "My hair is the color of honey milk tea!";
      case 3:
        return "The music festival I enjoyed the most was Head In The Clouds 2022.";
      case 4:
        return "My wishlist for studio gear this year is the Audeze LCD-X!";
      default:
        return "Loading...";
    }
  }
  
  //Helper Functions
  function playAudio(filename) {
    audio.src = 'audios/' + filename + '.mp3';
    audio.play();
  }

  function setDisplay(element, display) {
    element.style.display = display;
  }

  function setAnimation(element, animationName) {
    animationName = animationName === "none" ? animationName : animationName + " 0.15s ease-in-out";
    element.style.animation = animationName;
  }
  
  function showDialogue(text, clickBoxId) {
    audio.pause();
    setDisplay(anriIcon, "block");
    setDisplay(junIcon, "none");
    setDisplay(junHiding, "none");
    setAnimation(dialogueContainer, "none");

    if (clickBoxId === "locker-slam") {
      if (hitCount < 3) {
        // For the first three clicks on "locker-slam", only play sound and hide dialogue
        playAudio(clickBoxId);
        hitCount++;
      } else {
        // After the third click on "locker-slam", show dialogue and play "get-off.mp3"
        playAudio("get-off");
        hitCount = 0;
        text = "Get off my dick, you bitch!";
        setDisplay(anriIcon, "none");
        setDisplay(junIcon, "block");
        setDisplay(junHiding, "block");
      }
    } else {
      // For other click-boxes, just play the audio associated with them
      playAudio(clickBoxId);
    }
    
    dialogueBox.innerText = text;
    setTimeout(function () {
      setDisplay(dialogueContainer, "flex");
      setAnimation(dialogueContainer, "fadeIn");
      setAnimation(junHiding, "fadeIn2");
    }, 10);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      setAnimation(dialogueContainer, "fadeOut");
      setAnimation(junHiding, "fadeOut2");
      dialogueContainer.addEventListener("animationend", function() {
        setDisplay(dialogueContainer, "none");
        setAnimation(dialogueContainer, "none");
        setDisplay(junHiding, "none");
        setAnimation(junHiding, "none");
        audio.pause();
      }, { once: true });
    }, (text.length / 1000) * 60000);
  }

  preorderButton.addEventListener("click", function () {
    if (preorderCount === 3) {
      button.setAttribute("href","https://audiologie.us/products/synthesizer-v-jun-body-pillow-case");
      preorderCount = 0;
    } else {
      button.setAttribute("href","https://audiologie.us/products/synthesizer-v-ai-anri-digital");
      preorderCount++;
    }
    playAudio("closeureyes");
  });

  sample.addEventListener("click", function () {
    playAudio("sample");
  });
  
  document.querySelectorAll(".click-box").forEach(function (clickBox) {
    clickBox.addEventListener("click", function () {
      const clickBoxId = clickBox.id;
      let textToShow = "";

      switch (clickBoxId) {
        case "locker-slam":
          textToShow = "* Hits the locker door *";
          break;
        case "rock-polaroid":
          textToShow = "Oops! That's my leggy pic.";
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
          textToShow = "My number 1 fan surprised me with this... It was so sweet of him!";
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
          textToShow = 'This mode is specially designed for melodic rap. "She hit the ___ , next thing you know."';
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
      showDialogue(textToShow, clickBoxId);
    });
  });
});

