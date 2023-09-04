// JavaScript code in your "script.js" file

document.addEventListener("DOMContentLoaded", function () {
  const dialogueContainer = document.querySelector(".dialogue-container");
  const dialogueBox = document.querySelector(".dialogue-box");

  // Function to show the dialogue box with custom text
  function showDialogue(text) {
    dialogueBox.innerText = text;
    dialogueContainer.style.display = "flex";
    setTimeout(function () {
      dialogueContainer.style.display = "none";
    }, (text.length / 1000) * 60000);
  }
  
  // Add click event listeners to each click-box
  document.querySelectorAll(".click-box").forEach(function (clickBox) {
    clickBox.addEventListener("click", function () {
      const clickBoxId = clickBox.id;

      // Determine the text to display based on the click-box ID
      let textToShow = "";

      switch (clickBoxId) {
        case "anri-keychain-1":
          textToShow = "This is a keychain of me in my Qipao outfit, a harmonious fusion of my Vietnamese-Chinese heritage";
          break;
        case "anri-keychain-2":
          textToShow = "This is a keychain of me rocking out with a classic red electric guitar";
          break;
        case "mode-v":
          textToShow = "This vocal mode is filled with life and color, not dull or timid.";
          break;
        case "mode-e":
          textToShow = "This vocal mode is where the sound meets its boundary with an attitude.";
          break;
        case "mode-d":
          textToShow = "This vocal mode is the shadowy side of sound, where mysteries and secrets hide.";
          break;
        case "mode-c":
          textToShow = "This vocal mode is the opposite of blurry, easy to hear and understand.";
          break;
        case "mode-p-1":
          textToShow = "This vocal mode has the strength in sound, the might of the voice.";
          break;
        case "mode-f":
          textToShow = "This vocal mode is the smooth movement of sound, like a gentle stream.";
          break;
        case "mode-w":
          textToShow = "This vocal mode is a soft spoken secret, a hushed tone in the air.";
          break;
        case "mode-s-1":
          textToShow = "In Japanese, this vocal mode means a beautiful purple flower.";
          break;
        case "mode-m":
          textToShow = "This vocal mode has a relaxed and smooth tone, not harsh or sharp.";
          break;
        case "mode-s-2":
          textToShow = "This vocal mode has a solemn and grave tone, not to be taken lightly.";
          break;
        case "mode-p-2":
          textToShow = "This vocal mode has a a royal title often associated with a gentle and regal tone.";
          break;
        // Add more cases for other click-box IDs and their associated text
        default:
          textToShow = "I'm a twink by the way? fuck em broke bitches";
      }

      // Show the dialogue box with the determined text
      showDialogue(textToShow);
    });
  });
});
