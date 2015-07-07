module.exports =
function (name, password, pwConfirm) {
    var emptyField = 'Fill in all fields';
    var noSpaces = 'No spaces in email field';
    var length = 'Password must be at least 4 characters long';
    var confirm = 'Passwords do not match';
    var validation = [];
    if (name === '' || password === ''){
      validation.push(emptyField);
    }
    if (name.match(/\s/i)){
      validation.push(noSpaces);
    }
    if (password.length < 4){
      validation.push(length);
    }
    if (password != pwConfirm){
      validation.push(confirm);
    }
    return validation
  }
