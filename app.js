const btn = document.querySelector('.talk')
const content = document.querySelector('.content')



function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe(){
    var day = new Date();
    var hour = day.getHours();

    if(hour>=0 && hour<12){
        speak("Good Morning sir...")
    }

    else if(hour>12 && hour<17){
        speak("Good Afternoon sir...")
    }

    else{
        speak("Good Evenining Sir...")
    }

}

window.addEventListener('load', ()=>{
    speak("Initializing Virtual Asistan...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition =  new SpeechRecognition();

recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;
    
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());

}

btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."
    recognition.start();
})

function takeCommand(message){
    if(message.includes('help')){
        speak("Yes sir How Can I help You");
    }
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
    else if(message.includes("open youtube")){
        window.open("https://youtube.youtube", "_blank");
        speak("Opening Youtube...")
    }
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }

    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }

    if (message.includes('file save')) {
        // Extract the filename and content from the user's command
        const parts = message.split('file save');
        if (parts.length >= 2) {
            const filename = parts[1].trim() + '.txt'; // Default to a .txt file
            const content = 'This is the content of the file that you requested to save.';

            // Call the saveFile function to create and download the file
            saveFile(filename, content);

            // Provide feedback to the user
            speak(`File "${filename}" has been saved.`);
        } else {
            speak("I'm sorry, I couldn't understand the file save command. Please specify a filename.");
        }
    }

    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }

   else if (message.includes('song') || message.includes('play song') || message.includes('video')) {
    const query = message.replace('song', '').replace('play song', '').replace('video', '');
    const youtubeURL = `https://www.youtube.com/results?search_query=${query.trim().replace(/ /g, '+')}`;
    window.open(youtubeURL, '_blank');
    const finalText = `Searching YouTube for "${query}"`;
    speak(finalText);
}

    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }

    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }

    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

    else if(message.includes('chatgpt') || message.includes('chat gpt') || message.includes('chat GPT')) {
        window.open('https://chat.openai.com/')
        const finalText = "Opening chat gpt";
        speak(finalText);
    }

    else if(message.includes("open whatsapp")){
        window.open("https://Whatsapp.com", "_blank");
        speak("Opening Whatsapp...")
    }

    else if(message.includes('**** you') || message.includes('f*** you') || message.includes('f***+you')) {
        const responseMessage = "Fuck You too soun Of Bitch";
        speak(responseMessage);
    }

    else if(message.includes('how are you?')) {
        const responseMessage = "I'm Fine , how about you";
        speak(responseMessage);
    }

    else if(message.includes('open this pc')|| message.includes('open command prompt') || message.includes('open cmd') || message.includes('shutdown')) {
        const responseMessage = "sorry i can't contol u're pc";
        speak(responseMessage);
    }
	    
    else if(message.includes('hey') || message.includes('hi') || message.includes('hellow')) {
        const responseMessage = "Hello Sir, How May I Help You?";
        speak(responseMessage);
    }
	
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }

}
