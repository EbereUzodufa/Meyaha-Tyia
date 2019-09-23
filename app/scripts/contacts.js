const fetchData = ()=>{
    fetch('data/contacts.json')
        .then((resp) => resp.json())
        .then(build)
        .catch((err)=>console.log('Error', err));
}

const build = (resp) =>{
    const contacts = resp.contacts;
    // console.log('contacts', contacts);
    if (contacts) {
        const article = $('article.contacts-article');
        const div = document.createElement('div');
        div.classList.add('contacts');
        // const frag = document.createDocumentFragment();
        let frag = '';
        const parentImgSchSrc = 'images/contacts';
        contacts.forEach(contact => {
            if (contact.name != 'address') {
                const imgSrc = parentImgSchSrc + '/' + contact.name+ '.png';
                let target = '_blank'
                if(contact.name == 'tel'){
                    contact.link = `tel:${contact.link}`;
                }

                if(contact.name == 'email'){
                    contact.link = '/email.html';
                    target = '';
                }

                frag += `
                    <a class="partner-contact" href="${contact.link}" title = "${contact.name}" target="${target}">
                        <img src="${imgSrc}"  alt="Official logo of ${contact.name}" class="partner-contact__img"/>
                    </a>
                `
            }
        });
        const address = contacts.find(c=>c.name=='address');
        const h2 = document.createElement('h2');
        h2.innerHTML = address.link;
        h2.classList.add('nhef-address');
        article.append(h2);
        div.innerHTML =frag;
        article.append(div);
    }
}

const startApp = () =>{
    fetchData();
}

startApp();