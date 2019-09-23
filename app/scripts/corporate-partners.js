const fetchData = ()=>{
    fetch('data/corporate.json')
        .then((resp) => resp.json())
        .then(build)
        .catch((err)=>console.log('Error', err));
}

const build = (resp) =>{
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

const startApp = () =>{
    fetchData();
}

startApp();