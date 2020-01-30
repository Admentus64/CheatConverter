// JavaScript Document
// Author:      Admentus
// Co-Author:   GhostlyDark

var Dark = {   // Start Static Class: Dark
    
    // Class Variables
    html: null,
    button: null,
    
    
    
    // Class Functions
    
    // Functions to run when the webpage is loaded (all HTML-code is executed)
    init: function() {   // Start Function: init
        
        Dark.html = document.documentElement;
        try {
            if (localStorage.dark != null)
                Dark.html.className = localStorage.dark;
        }
        catch(err) {
            console.log(err.message);
        }
        
    }, // End Function: init
    
    
    
    setButton: function() {   // Start Function: setButton
        
        Dark.button = document.getElementById("dark_mode");
        Event.add(Dark.button, "click", Dark.toggle);
        
    }, // Start Function: setButton
    
    
    
    toggle: function() {   // Start Function: toggle
        
        try {
            localStorage.dark = Dark.html.className == "dark" ? "" : "dark";
        }
        catch(err) {
            console.log(err.message);
        }
        
        Dark.html.className = Dark.html.className == "dark" ? "" : "dark";
        
    }, // End Function: toggle

}; // End Static Class: Dark



Dark.init();                                                                // Active function init immediately
Event.add(window, "DOMContentLoaded", Dark.setButton);						// Active function setButton when the page is DOM Content is loaded