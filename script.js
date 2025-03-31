document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal');
    const output = document.querySelector('.output');
    const input = document.querySelector('.command-input');
    
    const commands = {
        'whois': 'Abhinavh is a passionate developer with expertise in...',
        'whoami': 'You are a visitor to my portfolio site!',
        'video': 'Opening YouTube... <a href="https://youtube.com" target="_blank">YouTube</a>',
        'social': 'Twitter: @abhinavh\nGitHub: github.com/abhinavh',
        'secret': 'The password is "portfolio123"',
        'projects': '1. Project A\n2. Project B\n3. Project C',
        'history': 'No history yet',
        'help': `Available commands:
whois          Who is Abhinavh?
whoami         Who are you?
video          View YouTube videos
social         Display social networks
secret         Find the password
projects       View coding projects
history        View command history
help           Display this help
email          Do not email me
clear          Clear terminal
banner         Display the header`,
        'email': 'Seriously, do not email me.',
        'clear': function() { output.innerHTML = ''; },
        'banner': function() { 
            const banner = document.getElementById('banner');
            output.appendChild(banner.cloneNode(true)); 
        }
    };
    
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            input.value = '';
            
            // Add command to output
            const commandLine = document.createElement('div');
            commandLine.textContent = `$ ${command}`;
            output.appendChild(commandLine);
            
            // Process command
            const response = document.createElement('div');
            if (commands.hasOwnProperty(command)) {
                if (typeof commands[command] === 'function') {
                    commands[command]();
                } else {
                    response.innerHTML = commands[command];
                }
            } else {
                response.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
            }
            
            output.appendChild(response);
            terminal.scrollTop = terminal.scrollHeight;
        }
    });
});