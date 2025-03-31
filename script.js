document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.querySelector('.terminal');
    const output = document.querySelector('.output');
    const input = document.querySelector('.command-input');
    
    const commands = {
        'whois': 'Abhinavh is a passionate developer with expertise in Operating Systems, DSA and Java Development. He is currently trying to master Web Devlopment and Machine Learning',
        'whoami': 'You are a visitor to my portfolio site! I hope you are a recuriter',
        'social': 'LinkedIn: https://www.linkedin.com/in/abhinavhparthiban/\nGitHub: https://github.com/Abhinavh-2004',
        'secret': 'The password is "portfolio123"',
        'projects': 'File Management System Using Bash Script - https://github.com/Abhinavh-2004/file_managament_system_using_bash\n2. Graphing run times of sorting algorithms using Python - https://github.com/Abhinavh-2004/Graphing-the-run-times-of-bubble-sort-and-finding-the-covariance-between-the-run-times',
        'help': `Available commands:
whois          Who is Abhinavh?
whoami         Who are you?
social         Display social networks
secret         Find the password
projects       View coding projects
help           Display this help
email          Do not email me
clear          Clear terminal
banner         Display the header`,
        'email': 'abhinavhparthibanmit@gmail.com',
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