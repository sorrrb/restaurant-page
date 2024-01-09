function createMenuSection() {
  const hero = document.createElement('section');
  hero.classList.add('hero');

  const heroHeader = document.createElement('div');
  heroHeader.classList.add('hero-head');

  const heroTitle = document.createElement('h2');
  heroTitle.classList.add('section-title');
  heroTitle.textContent = 'Contact';
  heroHeader.appendChild(heroTitle);

  const divider = document.createElement('hr');
  divider.classList.add('divider');
  heroHeader.appendChild(divider);

  const heroFormInfo = document.createElement('div');
  heroFormInfo.classList.add('hero-form');

  const para = document.createElement('p');
  para.classList.add('hero-para');
  para.textContent = 'Need to contact us? Fill out this form below:'
  heroFormInfo.appendChild(para);

  const formFields = ['Username', 'First Name', 'Last Name', 'Email Address', 'Phone Number', 'Message'];
  const form = createForm(formFields);
  form.classList.add('contact-form');

  function createForm(inputArray) {
    const output = document.createElement('form');
    inputArray.forEach((field) => {
      if (field === 'Message') {
        const messageLabel = document.createElement('label');
        messageLabel.textContent = `${field}:`;
        const messageInput = document.createElement('textarea');
        messageInput.rows = 8;
        output.appendChild(messageLabel);
        output.appendChild(messageInput);
      }
      else {
        const formLabel = document.createElement('label');
        formLabel.textContent = `${field}:`;
        const formInput = document.createElement('input');
        formInput.type = 'text';
        formInput.size = 30;
        output.appendChild(formLabel);
        output.appendChild(formInput);
      }
    });

    return output;
  }

  const submitBtn = document.createElement('input');
  submitBtn.type = 'submit';
  submitBtn.classList.add('form-button');
  submitBtn.textContent = 'Submit';

  heroFormInfo.appendChild(form);
  heroFormInfo.append(submitBtn);

  heroHeader.appendChild(heroFormInfo);

  hero.appendChild(heroHeader);

  const disclaimer = document.createElement('p');
  disclaimer.classList.add('form-disclaimer');
  disclaimer.textContent = '*Please allow at least 7 business days for a timely response*';

  hero.appendChild(disclaimer);

  return hero;
}

function loadContact() {
  const content = document.querySelector('.page-content');
  content.textContent = '';

  const tabSwitch = document.querySelector('button.active');
  if (tabSwitch) tabSwitch.classList.toggle('active');

  const activeTab = document.getElementById('contact-btn');
  activeTab.classList.add('active');

  const hero = createMenuSection();

  content.appendChild(hero);
}

export default loadContact;