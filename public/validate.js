(function () {
  function clearErrors() {
    document.querySelectorAll('.errors').forEach(function (el) { el.remove(); });
  }

  function showErrors(form, errors) {
    clearErrors();
    var box = document.createElement('div');
    box.className = 'errors';
    var ul = document.createElement('ul');
    errors.forEach(function (msg) {
      var li = document.createElement('li');
      li.textContent = msg;
      ul.appendChild(li);
    });
    box.appendChild(ul);

    var addForm = document.querySelector('.add-form');
    if (addForm) addForm.insertAdjacentElement('afterend', box);
    else form.parentNode.insertBefore(box, form);
  }

  function val(form, name) {
    var el = form.elements[name];
    return el ? el.value : '';
  }

  function check(form) {
    var path = new URL(form.action).pathname;
    var errors = [];

    if (path === '/register') {
      var name = val(form, 'name').trim();
      var email = val(form, 'email').trim();
      var password = val(form, 'password');
      var confirm = val(form, 'confirm_password');
      if (!name) errors.push('Name is required');
      if (!email) errors.push('Email is required');
      if (!password) errors.push('Password is required');
      if (!confirm) errors.push('Confirm password is required');
      if (password && confirm && password !== confirm) errors.push('Passwords do not match');
    } else if (path === '/login') {
      if (!val(form, 'email').trim()) errors.push('Email is required');
      if (!val(form, 'password')) errors.push('Password is required');
    } else if (path === '/todos/add' || /^\/todos\/\d+\/edit$/.test(path)) {
      var title = val(form, 'title').trim();
      if (!title) errors.push('Title is required');
      else if (title.length > 200) errors.push('Title is too long (200 characters at most)');
    }

    return errors;
  }

  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var errors = check(form);
      if (errors.length > 0) {
        e.preventDefault();
        showErrors(form, errors);
      }
    });
  });
})();