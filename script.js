document.addEventListener('DOMContentLoaded', function() {
    const terminal = document.getElementById('terminal');
    const output = document.getElementById('output');
    const input = document.querySelector('.command-input');
    const cursor = document.querySelector('.cursor');
    let commandHistory = [];
    let historyIndex = -1;

    // Update cursor position
    function updateCursor() {
        const inputWidth = getTextWidth(input.value, '14px Ubuntu Mono');
        cursor.style.left = `${inputWidth}px`;
    }

    // Helper function to calculate text width
    function getTextWidth(text, font) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = font;
        return context.measureText(text).width;
    }

    // Command definitions
    const commands = {
        'whois': 'Abhinavh is a passionate developer with expertise in Linux systems,\n' +
                 'bash scripting, and data analysis. Currently pursuing Computer Science\n' +
                 'with a focus on systems programming.',
        
        'whoami': 'You are a visitor to my interactive portfolio terminal!',
        
        'social': 'Connect with me:\n' +
        '• <a href="https://www.linkedin.com/in/abhinavhparthiban/" target="_blank" class="terminal-link">LinkedIn</a>\n' +
        '• <a href="https://github.com/Abhinavh-2004" target="_blank" class="terminal-link">GitHub</a>',
        
        'projects': 'My projects:\n' +
            '1. <a href="https://github.com/Abhinavh-2004/file_managament_system_using_bash" target="_blank" rel="noopener noreferrer" class="terminal-link">File Management System (Bash)</a>\n' +
            '2. <a href="https://github.com/Abhinavh-2004/Graphing-the-run-times-of-bubble-sort" target="_blank" rel="noopener noreferrer" class="terminal-link">Algorithm Runtime Analysis</a>',
        
        'history': () => commandHistory.length ? commandHistory.map((cmd, i) => `${i + 1}: ${cmd}`).join('\n') : 'No history yet',
        
        'help': 'Available commands:\n' +
                'whois    - About me\n' +
                'whoami   - Who are you?\n' +
                'social   - My social links\n' +
                'projects - My coding projects\n' +
                'history  - Command history\n' +
                'clear    - Clear terminal\n' +
                'help     - Show this help',
        
        'clear': () => { output.innerHTML = ''; return ''; },
        
        'banner': () => { return document.getElementById('banner').textContent; }
    };

    // Process commands
    function processCommand(command) {
        if (!command.trim()) return;
        
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        
        // Display the executed command
        const commandLine = document.createElement('div');
        commandLine.className = 'executed-command';
        commandLine.textContent = `abhinavh@portfolio:~$ ${command}`;
        output.appendChild(commandLine);
        
        // Process and display output
        const response = document.createElement('div');
        response.className = 'command-output';
        
        if (commands.hasOwnProperty(command)) {
            const result = typeof commands[command] === 'function' 
                ? commands[command]() 
                : commands[command];
            response.innerHTML = result;
        } else {
            response.textContent = `${command}: command not found`;
        }
        
        output.appendChild(response);
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Input handling
    input.addEventListener('input', updateCursor);
    
    input.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Enter':
                processCommand(input.value.trim());
                input.value = '';
                updateCursor();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                if (commandHistory.length > 0) {
                    historyIndex = Math.max(historyIndex - 1, 0);
                    input.value = commandHistory[historyIndex] || '';
                    updateCursor();
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                if (commandHistory.length > 0) {
                    historyIndex = Math.min(historyIndex + 1, commandHistory.length);
                    input.value = historyIndex < commandHistory.length 
                        ? commandHistory[historyIndex] 
                        : '';
                    updateCursor();
                }
                break;
                
            case 'Tab':
                e.preventDefault();
                const partial = input.value.trim();
                const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
                if (matches.length === 1) {
                    input.value = matches[0];
                    updateCursor();
                }
                break;
                
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    output.innerHTML = '';
                }
                break;
        }
    });

    // Focus the input and show cursor when clicking anywhere in terminal
    terminal.addEventListener('click', () => {
        input.focus();
    });

    // Initial help display
    processCommand('help');
    updateCursor();
});