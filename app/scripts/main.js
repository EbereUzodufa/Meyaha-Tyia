console.log('\'Allo \'Allo!');

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

//Used IIFE to enable show and hide menu
(function () {
    const btnToggle = document.getElementById('togglebtn');
    const btncloseMenu = document.getElementById('closeMenu');
    const overlay = document.querySelector('div.overlay');
    const body = document.body;

    //This for screenreaders and helping those impaired
    const setAriaHidden = (val) =>{
        overlay.setAttribute('aria-hidden', val);
    }

    //Toggle Menu 
    const toogleMenuBtn = () =>{
        // Toggle Button
        if (btnToggle) {
            btnToggle.addEventListener('click', function() {
                overlay.style.width = '100%';
                overlay.scrollTop = 0;
                body.classList.add('noScroll');
                setAriaHidden('false');
            });
        }

        if (btncloseMenu) {
            btncloseMenu.addEventListener('click', function() {
                overlay.style.width = '0%';
                body.classList.remove('noScroll');
                setAriaHidden('true');
            });
        }
    }

    toogleMenuBtn();
})();

const fetchDataCorporate = ()=>{
    fetch('./data/corporate.json')
        .then((resp) => resp.json())
        .then(buildCorp)
        .catch((err)=>console.log('Error', err));
}

const buildCorp = (resp) =>{
    const companies = resp.Companies;
    // console.log('comp', companies);
    if (companies) {
        const article = $('article.companies-article');
        const div = document.createElement('div');
        div.classList.add('partner-companies');
        // const frag = document.createDocumentFragment();
        let frag = '';
        const parentImgSchSrc = 'images/partner-org';
        companies.forEach(company => {
            const imgSrc = parentImgSchSrc + '/' + company.image;
            frag += `
                <a class="partner-company" href="${company.website}" title = "${company.name}" target="_blank">
                    <img src="${imgSrc}"  alt="Official logo of ${company.name}" class="partner-company__img"/>
                </a>
            `
        });

        div.innerHTML =frag;
        article.append(div);
    }
}

const fetchDataContacts = ()=>{
    fetch('./data/contacts.json')
        .then((resp) => resp.json())
        .then(buildContacts)
        .catch((err)=>console.log('Error', err));
}

const buildContacts = (resp) =>{
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

const fetchDataUni = ()=>{
    fetch('./data/universities.json')
        .then((resp) => resp.json())
        .then(buildUni)
        .catch((err)=>console.log('Error', err));
}

const buildUni = (resp) =>{
    const schools = resp.Schools;
    // console.log('shools', schools);
    if (schools) {
        const article = $('article.schools-article');
        const div = document.createElement('div');
        div.classList.add('partner-schools');
        // const frag = document.createDocumentFragment();
        let frag = '';
        const parentImgSchSrc = 'images/partner-universities';
        schools.forEach(school => {
            const imgSrc = parentImgSchSrc + '/' + school.image;
            frag += `
                <a class="partner-school" href="${school.website}" title = "${school.name}" target="_blank">
                    <img src="${imgSrc}"  alt="Official logo of ${school.name}" class="partner-school__img"/>
                </a>
            `
        });

        div.innerHTML =frag;
        article.append(div);
    }
}

const startAppUni = () =>{
    fetchDataUni();
}

const startAppContacts = () =>{
    fetchDataContacts();
}

const startAppPartners = () =>{
    fetchDataCorporate();
}

startAppPartners();
startAppContacts();
startAppUni();