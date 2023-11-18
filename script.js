document.querySelector('form').addEventListener('submit', (event)=>{
    event.preventDefault();
    if ( !event.currentTarget.checkValidity() ){
        event.currentTarget.reportValidity();
    }else{
        event.currentTarget.querySelectorAll('.error').forEach(p=>{
            hideError(p);
        });
    }
});

document.querySelectorAll('input').forEach(input=>{
    if ( input.hasAttribute('required') ){
        input.addEventListener('invalid',(event)=>{
            event.preventDefault();
            if ( input.validity.valueMissing ){
                showError(input.nextElementSibling, `${firstCharCapitalize(input.getAttribute('name'))} cannot be empty`);
            }
        });

        input.addEventListener('input', (event)=>{
            hideError(input.nextElementSibling);
        });
    }
});

document.querySelector('#email').addEventListener('input', (event)=>{
    if ( event.currentTarget.validity.typeMismatch ){
        showError(event.currentTarget.nextElementSibling, 'Invalid email address.');
    }else{
        hideError(event.currentTarget.nextElementSibling);
    }
});

document.querySelector('#password').addEventListener('input', (event)=>{
    if ( event.currentTarget.validity.patternMismatch ){
        showError(event.currentTarget.nextElementSibling, 'Invalid password format. Passord must contain atleast one upper and lowercase character, one number and one symbol from !#$%^&*');
    } else if( event.currentTarget.validity.tooShort ){
        showError(event.currentTarget.nextElementSibling, 'Password must be 8 character long.')
    }
    else{
        hideError(event.currentTarget.nextElementSibling);
    }
});

document.querySelector('#confirm-pass').addEventListener('input', (event)=>{
    const pass = document.querySelector('#password');
    if ( pass.value !== event.currentTarget.value ){
        showError(event.currentTarget.nextElementSibling, 'Password does not match');
    }else if ( pass.validity.patternMismatch || pass.validity.tooShort ){
        showError(event.currentTarget.nextElementSibling, pass.nextElementSibling.textContent);
    }else{
        hideError(event.currentTarget.nextElementSibling);
    }
});



function showError(p, msg){
    p.textContent = msg;
    p.classList.add('invalid')
}

function hideError(p){
    p.textContent = ''
    p.classList.remove('invalid');
}

function firstCharCapitalize(input){
    return `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
}