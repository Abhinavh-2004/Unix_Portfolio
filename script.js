document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    let commandHistory = [];
    let historyIndex = -1;
    let currentInput = '';

    // Create input element
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'command-input';
    inputLine.appendChild(input);
    output.appendChild(inputLine);
    input.focus();

    const commands = {
        'whois': 'Abhinavh is a passionate developer with expertise in...',
        'whoami': 'You are a visitor to my portfolio site!',
        'social': 'LINKEDIN: https://www.linkedin.com/in/abhinavhparthiban/\nGitHub: https://github.com/Abhinavh-2004',
        'secret': 'The password is "portfolio123"',
        'projects': `Available projects:
        1. <a href="https://github.com/Abhinavh-2004/file_managament_system_using_bash" class="terminal-link">FILE MANAGEMENT SYSTEM</a> - A file management software for WSL applications
        2. <a href="https://github.com/Abhinavh-2004/Graphing-the-run-times-of-bubble-sort-and-finding-the-covariance-between-the-run-times" class="terminal-link">GRAPHING RUN TIMES</a> - Machine learning inspired graphing of run times of different sorting algorithms`,
        'history': () => {
            if (commandHistory.length === 0) return 'No commands in history';
            return commandHistory.map((cmd, i) => `${i + 1}: ${cmd}`).join('\n');
        },
        'help': `Available commands:
whois          Who is Abhinavh?
whoami         Who are you?
social         Display social networks
secret         Find the password
projects       View coding projects
history        View command history
help           Display this help
email          Do not email me
clear          Clear terminal`,
        'email': 'Seriously, do not email me.',
        'clear': () => { output.innerHTML = ''; output.appendChild(inputLine); input.focus(); },
    };

    function processCommand(command) {
        if (command.trim() === '') return;
        
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        
        // Create command display line
        const commandLine = document.createElement('div');
        commandLine.innerHTML = `<span class="user">abhinavh@portfolio</span>:<span class="directory">~</span>$ ${command}`;
        output.insertBefore(commandLine, inputLine);
        
        // Process command
        const response = document.createElement('div');
        if (commands.hasOwnProperty(command)) {
            if (typeof commands[command] === 'function') {
                const result = commands[command]();
                if (result) response.textContent = result;
            } else {
                response.innerHTML = commands[command];
            }
        } else {
            response.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
        }
        
        output.insertBefore(response, inputLine);
        terminal.scrollTop = terminal.scrollHeight;
        input.value = '';
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            processCommand(input.value.trim());
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                if (historyIndex > 0) historyIndex--;
                if (historyIndex >= 0) {
                    input.value = commandHistory[historyIndex];
                    currentInput = input.value;
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex] || currentInput;
            } else {
                historyIndex = commandHistory.length;
                input.value = currentInput;
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = input.value.trim();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0];
            }
        }
    });
});