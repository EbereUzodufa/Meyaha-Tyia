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
                frag += `
                    <a class="partner-contact" href="${contact.link}" title = "${contact.name}" target="_blank">
                        <img src="${imgSrc}"  alt="Official logo of ${contact.name}" class="partner-contact__img"/>
                    </a>
                `
            }
        });
        const address = contacts.find(c=>c.name=='address');
        const p = document.createElement('p');
        p.innerHTML = address.link;
        p.classList.add('nhef-address');
        article.append(p);
        div.innerHTML =frag;
        article.append(div);
    }
}

const startApp = () =>{
    fetchData();
}

startApp();