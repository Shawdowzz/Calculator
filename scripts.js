const input = document.getElementById('inputBox');
const buttons = document.querySelectorAll('button');

let string = "";

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerHTML;

        if (value === '=') {
            try {
                if (string) {
                    string = new Function('return ' + string)().toString();
                    input.value = string;
                }
            } catch (error) {
                input.value = 'Error';
                string = '';
            }
        } else if (value === 'AC') {
            string = '';
            input.value = string;
        } else if (value === 'DEL') {
            string = string.slice(0, -1);
            input.value = string;
        } else if (value === '.' && string.split(/[+\-*/%]/).pop().includes('.')) {
            return; // Prevent multiple decimals
        } else if (/[+\-*/%]/.test(value) && /[+\-*/%]$/.test(string)) {
            string = string.slice(0, -1) + value; // Replace last operator
            input.value = string;
        } else {
            string += value;
            input.value = string;
        }
    });
});