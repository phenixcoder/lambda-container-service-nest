document.querySelectorAll('form').forEach((form) => {
  if (form.id === 'bank-select') {
    console.log('binding event to bank-select form', form);
    form.onsubmit = (event) => {
      const data = new FormData(form);
      console.log('form', data);
      const bank = data.get('bank');
      if (!bank) {
        event.preventDefault();
        document.querySelector('.error').textContent = 'Please select a bank.';
        return;
      }
      document.querySelector('.error').textContent = '';
    };
  }

  if (form.id === 'capture-form') {
    setTimeout(() => {
      form.querySelector('#capture').click();
    }, 1000);
  }
});
