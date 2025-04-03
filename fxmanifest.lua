fx_version 'cerulean'
game 'gta5'

name 'C-Notify'
author 'chinooo'
version '1.0.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/styles.css',
    'html/script.js',
    'html/text-ui.css',
    'html/text-ui.js',
    'html/sounds/info.mp3',
    'html/sounds/error.mp3',
    'html/sounds/warning.mp3',
    'html/sounds/success.mp3',
    'html/sounds/custom.mp3',
    'html/sounds/text-ui.mp3'
}

client_scripts {
    'client/main.lua'
}


export 'SendNotification'