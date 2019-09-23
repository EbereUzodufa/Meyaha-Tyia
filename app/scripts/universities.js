const fetchData = ()=>{
    fetch('./data/universities.json')
        .then((resp) => resp.json())
        .then(build)
        .catch((err)=>console.log('Error', err));
}

const build = (resp) =>{
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

const startApp = () =>{
    fetchData();
}

startApp();