export default defineNuxtPlugin((nuxtApp) => {
    
    return {
        
        provide: {

            siteConfig: {

                maintitle: "Catalog of Distinctive Type",
                subtitle: "Restoration England",
                abstract: "A curated reference for distinctive type pieces in early English printed books",
                navbartitle: "CDT - Restoration England",
                contact: {

                    fullname: "Jonathan Armoza",
                    email: "jarmoza@andrew.cmu.edu",
                    url: "http://printprobability.org/"
                },
                alpha: true,
                github: "https://github.com/printprobability/cdt",
                fleuron: {
                    image: "/img/fleuron.svg",
                    alt: "Fleuron"
                },
                browsecopy: {

                    books: "Search books indexed by this project based on title, printer, and date.",
                    characters: "Search for characters by type or source book.",
                    groupings: "Curated sets of characters identified by a human & machine-learning pipeline that are useful for identifying certain printers or relationships between them."
                },
                splashboxes: [

                    {
                        title: "Browse by book",
                        text: "Start from a particular book to see the distinctive character types we have identified in it",
                        image: "/img/a.jpg",
                        alt: "Illustrated A character",
                        to: { name: "books" }
                    },
                    {
                        title: "Browse by character",
                        text: "Search thousands of characters by glyph and damage types",
                        image: "/img/i.jpg",
                        alt: "Ornate I character",
                        to: { name: "characters" }
                    },
                    {
                        title: "Browse by curated groupings",
                        text: "Explore curated sets of distinctive characters that have been identified by our project team.",
                        image: "/img/i.jpg",
                        alt: "Ornate I character",
                        to: { name: "groupings" }
                    },
                    {
                        title: "Learn about the project",
                        text: "Learn about the motivation and methodology of the \"Dictionary\", meet the project team, and find associated publications and machine-readable data",
                        image: "/img/s.jpg",
                        alt: "embellished capital S",
                        to: { name: 'articles-slug', params: { slug: 'about' } }
                    },
                    {
                        title: "Access data",
                        text: "Download machine-readable data on books and segmented characters",
                        image: "/img/m.jpg",
                        alt: "Ornate M",
                        to: { name: "articles-slug", params: { slug: "data" } }
                    },
                ]
            }
        }
    };
});
