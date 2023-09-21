// JavaScript code in your "script.js" file

document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  const dialogueContainer = document.querySelector(".dialogue-container"); // The container for the dialogue box
  const anriIconContainer = document.querySelector(".anri-icon-container"); // The container for the Anri icon
  const header = document.querySelector(".audiologie-logo"); // The header element containing the Audiologie logo
  const instructions = document.querySelector(".instruction"); // The instructions element
  const youtubeVideo = document.getElementById("iframe-embed"); // The YouTube video iframe
  const dialogueBox = document.querySelector(".dialogue-box"); // The dialogue box element
  const junHiding = document.getElementById('jun-hiding'); // The Jun hiding element
  const preorderButton = document.getElementById('preorder-button'); // The preorder button element
  const button = document.getElementById('button'); // The button element
  const anriIcon = document.getElementById('anri-icon'); // The Anri icon element
  const junIcon = document.getElementById('jun-icon'); // The Jun icon element
  const sample = document.getElementById('sample'); // The sample element
  const loadingText = document.getElementById('loading-text'); // The loading text element
  const content = document.getElementById('content'); // The content element

  // Game-related variables
  let timeoutId; // The ID of the timeout for hiding the dialogue box
  let hitCount = 0; // The number of times the "locker-slam" click box has been clicked
  let min = 1; // The minimum value for the random number generator
  let max = 8; // The maximum value for the random number generator
  let randomNum = getRandomInt(min, max); // A random number between min and max (inclusive)

  /**
   * Returns a random integer between the given minimum and maximum values (inclusive).
   * @param {number} min - The minimum value for the random number generator.
   * @param {number} max - The maximum value for the random number generator.
   * @returns {number} A random integer between min and max (inclusive).
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Simulates a loading screen with a progress bar and text that changes randomly.
   * @param {function} callback - The function to call after the loading simulation is complete.
   */
  function simulateLoading(callback) {
    const progressBar = document.querySelector(".progress-bar");
    loadingText.textContent = getText(randomNum); // Set the loading text to a random value
    let width = 0;
    const interval = setInterval(function () {
        if (width >= 100) {
            clearInterval(interval);
            callback();
        } else {
            width++;
            progressBar.style.width = width + "%";
        }
    }, 25);
  }

  /**
   * Returns a string of text based on the given random number.
   * @param {number} randomNum - A random number between 1 and 7 (inclusive).
   * @returns {string} A string of text based on the given random number.
   */
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
      case 5:
        return "When I'm stressed, I eat a bánh mì and I'm good as new!";
      case 6:
        return "I'm Vietnamese-Chinese!";
      case 7:
        return "My star sign is Gemini ⭐ I can't wait to introduce someone to you...";
      case 8:
        return "Chachamaru's name is inspired by the hitmaker Cha Cha Malone!";
      default:
        return "Loading...";
    }
  }
    
  /**
   * Resizes various elements on the page based on the current viewport width.
   */
  function elementResize() {
    const viewportWidth = window.innerWidth;

    // Resize youtube video
    const widthPercentage = 0.7;
    const newWidth = viewportWidth * widthPercentage;
    const newHeight = newWidth * 0.5625;
    const borderRadius = newWidth * 0.02;
    youtubeVideo.style.width = `${newWidth}px`;
    youtubeVideo.style.height = `${newHeight}px`;
    youtubeVideo.style.borderRadius = `${borderRadius}px`;

    // Resize font size
    const fontPercentage = 0.016;
    const newFontSize = fontPercentage * viewportWidth;
    dialogueBox.style.fontSize = `${newFontSize}px`;
    instructions.style.fontSize = `${1.55 * newFontSize}px`;

    // Resize header
    const headerHeightPercentage = 0.08;
    const newHeaderHeight = headerHeightPercentage * viewportWidth;
    header.style.height = `${newHeaderHeight}px`;

    // Resize content container padding
    const contentMarginPercentage = 0.1;
    const newContentPadding = contentMarginPercentage * viewportWidth;
    content.style.marginTop = `${newContentPadding}px`;

    // Resize anri icon container
    const anriIconContainerPercentage = 0.075;
    const newAnriIconContainer = anriIconContainerPercentage * viewportWidth;
    anriIconContainer.style.width = `${newAnriIconContainer}px`;
  }

  /**
   * Hides the header element when the user scrolls down and shows it when the user scrolls up.
   */
  function autoHideHeaderSrcoll() {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        header.style.top = "0";
      } else {
        header.style.top = "-1000px";
      }
      prevScrollpos = currentScrollPos;
    }
  }

  /**
   * Plays the given audio element and pauses any currently playing audio.
   * @param {HTMLAudioElement} audioElement - The audio element to play.
   */
  let currentAudioElement = null;
  function playAudio(audioElement) {
    // Pause any currently playing audio
    if (currentAudioElement !== null) {
      currentAudioElement.pause();
    }
    // Play the new audio element
    currentAudioElement = audioElement;
    audioElement.play();
  }

  function getAudio(filename) {
    let audioFileName = `audios/${filename}.mp3`;
    let audioElement = new Audio(audioFileName);
    return audioElement;
  }

  /**
   * Sets the display property of the given element to the given value.
   * @param {HTMLElement} element - The element to set the display property of.
   * @param {string} display - The value to set the display property to.
   */
  function setDisplay(element, display) {
    element.style.display = display;
  }

  /**
   * Sets the animation property of the given element to the given animation name.
   * @param {HTMLElement} element - The element to set the animation property of.
   * @param {string} animationName - The name of the animation to set.
   */
  function setAnimation(element, animationName) {
    // If the animation name is "none", set the animation property to "none"
    // Otherwise, set the animation property to the given animation name with a duration of 0.15s and an ease-in-out timing function
    animationName = animationName === "none" ? animationName : animationName + " 0.15s ease-in-out";
    element.style.animation = animationName;
  }

  /**
   * Plays a random audio file and sets the href of the button element based on the random number generated.
   */
  function playRandomAudio() {
    const randomNum = getRandomInt(1, 4); // Generate a random number between 1 and 4 (inclusive)
    const audioFileName = `audios/button-${randomNum}.mp3`; // Construct the file name of the audio file to play
    const audioElement = new Audio(audioFileName); // Create a new Audio object with the file name
    if (randomNum === 3) { // If the random number is 3
      button.setAttribute("href","https://audiologie.us/products/synthesizer-v-jun-body-pillow-case"); // Set the href of the button to the Jun body pillow case product page
    } else { // If the random number is not 3
      button.setAttribute("href","https://audiologie.us/products/synthesizer-v-ai-anri-digital"); // Set the href of the button to the Anri digital product page
    }
    audioElement.load(); // Load the audio file
    audioElement.play(); // Play the audio file
  }
  
  /**
   * Shows a dialogue box with the given text and plays the audio associated with the given click box ID.
   * @param {string} text - The text to display in the dialogue box.
   * @param {string} clickBoxId - The ID of the click box that was clicked.
   */
  function showDialogue(text, clickBoxId) {
    audioElement = getAudio(clickBoxId);
    audioElement.load();
    setDisplay(anriIcon, "block"); // Show the Anri icon
    setDisplay(junIcon, "none"); // Hide the Jun icon
    setDisplay(junHiding, "none"); // Hide the Jun hiding element
    setAnimation(dialogueContainer, "none"); // Reset the animation of the dialogue container

    audioElement.addEventListener('loadedmetadata', function() {
      const audioDurationInSeconds = audioElement.duration;
      const delayMilliseconds = audioDurationInSeconds * 1000;

      if (clickBoxId === "locker-slam") {
        if (hitCount < 3) {
          // For the first three clicks on "locker-slam", only play sound and hide dialogue
          playAudio(audioElement);
          hitCount++;
        } else {
          // After the third click on "locker-slam", show dialogue and play "get-off.mp3"
          clickBoxId = "get-off";
          audioElement = getAudio(clickBoxId);
          audioElement.load();
          playAudio(audioElement);
          hitCount = 0;
          text = "Whaddup dawg?";
          setDisplay(anriIcon, "none"); // Hide the Anri icon
          setDisplay(junIcon, "block"); // Show the Jun icon
          setDisplay(junHiding, "block"); // Show the Jun hiding element
        }
      } else {
        // For other click-boxes, just play the audio associated with them
        playAudio(audioElement);
      }
      
      dialogueBox.innerText = text;
      setTimeout(function () {
        setDisplay(dialogueContainer, "flex"); // Show the dialogue container
        setAnimation(dialogueContainer, "fadeIn"); // Fade in the dialogue container
        setAnimation(junHiding, "fadeIn2"); // Fade in the Jun hiding element
      }, 10);

      clearTimeout(timeoutId);

      timeoutId = setTimeout(function () {
        setAnimation(dialogueContainer, "fadeOut"); // Fade out the dialogue container
        setAnimation(junHiding, "fadeOut2"); // Fade out the Jun hiding element
        dialogueContainer.addEventListener("animationend", function() {
        setDisplay(dialogueContainer, "none"); // Hide the dialogue container
        setAnimation(dialogueContainer, "none"); // Reset the animation of the dialogue container
        setDisplay(junHiding, "none"); // Hide the Jun hiding element
        setAnimation(junHiding, "none"); // Reset the animation of the Jun hiding element
        audioElement.pause(); // Pause the audio
        }, { once: true });
      }, delayMilliseconds);
    });
  }
  // Event Listeners and function calls
  // Call the autoHideHeaderSrcoll function to hide the header element when the user scrolls down and show it when the user scrolls up
  autoHideHeaderSrcoll();

  // Simulate a loading screen with a progress bar and text that changes randomly
  simulateLoading(function () {
    // After the loading simulation is complete, fade out the loading screen and display the content
    const loadingScreen = document.querySelector(".loading-screen");
    loadingScreen.style.opacity = 0;
    content.style.display = "flex";
    setTimeout(function () {
        loadingScreen.style.display = "none";
        loadingScreen.remove();
    }, 1500);
  });

  // Add a click event listener to the preorder button that plays a random audio file and sets the href of the button element based on the random number generated
  preorderButton.addEventListener("click", function () {
    playRandomAudio();
  });

  // Add a click event listener to the sample button that plays the "sample.mp3" audio file
  sample.addEventListener("click", function () {
    playAudio("sample");
  });

  // Call the elementResize function to resize various elements on the page based on the current viewport width
  elementResize();

  // Add a resize event listener to the window that calls the elementResize function when the window is resized
  window.addEventListener('resize', elementResize);
  
  // Add a click event listener to each click box element
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
          textToShow = "Keshi signed this one for me on the back!";
          break;
        case "gibson":
          textToShow = "Their electric guitars rocks! Get it?";
          break;
        case "keshi-polaroid-2":
          textToShow = "Gotta keep my eyes closed for that... mhmm";
          break;
        case "skull":
          textToShow = "All I ever wanna do is burn it all down!";
          break;
        case "baseball":
          textToShow = "I'm actually not sure why this is here... hmmm...";
          break;
        case "platinum":
          textToShow = "Certified Platinum!";
          break;
        case "guitar-keychain":
          textToShow = "Anh took this from me the other day. Glad to have it back!";
          break;
        case "akem":
          textToShow = "Akem was like the camera wizard, always catching me from my best angles!";
          break;
        case "kungom":
          textToShow = "KUNGOM totally yassified my locker! What an artist!";
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
          textToShow = "This vocal mode is the opposite of blurry. Easy to hear and understand.";
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
          textToShow = 'この"ボーカルスタイル"の花言葉は、「小さな幸せ」、「誠実」、「謙虚」。';
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

