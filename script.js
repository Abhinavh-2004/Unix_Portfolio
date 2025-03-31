document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    // Create input element
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';
    inputLine.dataset.prompt = 'abhinavh@portfolio:~$ '; // For the visible prompt

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'command-input';
    input.setAttribute('aria-label', 'Terminal command input');
    inputLine.appendChild(input);
    output.appendChild(inputLine);

    // Calculate prompt width for proper alignment
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt-measure';
    promptSpan.textContent = 'abhinavh@portfolio:~$ ';
    document.body.appendChild(promptSpan);
    const promptWidth = promptSpan.offsetWidth;
    document.body.removeChild(promptSpan);
    document.documentElement.style.setProperty('--prompt-width', `${promptWidth}px`);

    input.focus();

    // Command definitions
    const commands = {
        'whois': 'Abhinavh is a passionate developer with expertise in Linux systems, bash scripting, and data analysis. Currently pursuing Computer Science with a focus on systems programming.',
        'whoami': 'You are a valued visitor to my interactive portfolio!',
        'social': createSocialLinks(),
        'secret': 'The secret password is "portfolio123" (but please don\'t use this for anything important!)',
        'projects': createProjectLinks(),
        'history': showCommandHistory,
        'help': showHelp,
        'email': 'Contact should be initiated through my LinkedIn profile only.',
        'clear': clearTerminal,
        'banner': showBanner
    };

    // Command functions
    function createSocialLinks() {
        return `
        Connect with me:
        • <a href="https://www.linkedin.com/in/abhinavhparthiban/" target="_blank" class="terminal-link">LinkedIn</a> - Professional profile
        • <a href="https://github.com/Abhinavh-2004" target="_blank" class="terminal-link">GitHub</a> - Code repositories
        `;
    }

    function createProjectLinks() {
        return `
        My featured projects:
        1. <a href="https://github.com/Abhinavh-2004/file_managament_system_using_bash" target="_blank" class="terminal-link">File Management System</a> - WSL file management utility
        2. <a href="https://github.com/Abhinavh-2004/Graphing-the-run-times-of-bubble-sort-and-finding-the-covariance-between-the-run-times" target="_blank" class="terminal-link">Algorithm Runtime Analysis</a> - Sorting algorithm visualizations
        `;
    }

    function showCommandHistory() {
        return commandHistory.length > 0 
            ? commandHistory.map((cmd, i) => `${i + 1}: ${cmd}`).join('\n')
            : 'No commands in history yet';
    }

    function showHelp() {
        return `Available commands:
whois          Display my professional background
whoami         Identify the current user
social         View my professional networks
projects       Explore my coding projects
history        View command history
help           Show available commands
clear          Reset the terminal
banner         Display the header art`;
    }

    function clearTerminal() {
        output.innerHTML = '';
        output.appendChild(inputLine);
        input.focus();
    }

    function showBanner() {
        const bannerClone = banner.cloneNode(true);
        bannerClone.removeAttribute('id');
        output.insertBefore(bannerClone, inputLine);
    }

    // Command processing
    function processCommand(command) {
        if (!command.trim()) return;
        
        // Add to history
        commandHistory.push(command);
        historyIndex = commandHistory.length;
        currentInput = '';
        
        // Display command
        displayCommand(command);
        
        // Execute and display output
        displayOutput(command);
        
        // Reset input and scroll
        input.value = '';
        terminal.scrollTop = terminal.scrollHeight;
    }

    function displayCommand(cmd) {
        const commandLine = document.createElement('div');
        commandLine.className = 'executed-command';
        commandLine.innerHTML = `
            <span class="user">abhinavh@portfolio</span>:
            <span class="directory">~</span>$ ${cmd}
        `;
        output.insertBefore(commandLine, inputLine);
    }

    function displayOutput(cmd) {
        const response = document.createElement('div');
        response.className = 'command-output';
        
        if (commands.hasOwnProperty(cmd)) {
            const commandResult = commands[cmd];
            
            if (typeof commandResult === 'function') {
                const result = commandResult();
                response.innerHTML = typeof result === 'string' ? result : '';
            } else {
                response.innerHTML = commandResult;
            }
        } else {
            response.textContent = `${cmd}: command not found. Type 'help' for available commands.`;
        }
        
        output.insertBefore(response, inputLine);
    }

    // Input handling
    input.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'Enter':
                processCommand(input.value.trim());
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                navigateHistory(-1);
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                navigateHistory(1);
                break;
                
            case 'Tab':
                e.preventDefault();
                autoComplete();
                break;
                
            case 'l':
                if (e.ctrlKey) {
                    e.preventDefault();
                    clearTerminal();
                }
                break;
        }
    });

    function navigateHistory(direction) {
        if (commandHistory.length === 0) return;
        
        if (direction === -1 && historyIndex > 0) {
            historyIndex--;
        } else if (direction === 1 && historyIndex < commandHistory.length - 1) {
            historyIndex++;
        } else if (direction === 1) {
            historyIndex = commandHistory.length;
        }
        
        input.value = historyIndex >= 0 && historyIndex < commandHistory.length 
            ? commandHistory[historyIndex]
            : currentInput;
    }

    function autoComplete() {
        const partial = input.value.trim();
        const matches = Object.keys(commands).filter(cmd => 
            cmd.startsWith(partial)
        );
        
        if (matches.length === 1) {
            input.value = matches[0];
        } else if (matches.length > 1) {
            displayOutput(`Possible completions:\n${matches.join(' ')}`);
        }
    }

    // Initial display
    displayOutput('help');
});