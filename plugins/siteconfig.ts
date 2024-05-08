export default defineNuxtPlugin(() => {
    
    return {
        
        provide: {

            siteConfig: {

                abstract: "A curated reference for distinctive type pieces in early English printed books",

                alpha: true,

                browsecopy: {

                    books: "Search books indexed by this project based on title, printer, and date.",
                    characters: "Search for characters by type or source book.",
                    groupings: "Curated sets of characters identified by a human & machine-learning pipeline that are useful for identifying certain printers or relationships between them."
                },                

                contact: {

                    email: "jarmoza@andrew.cmu.edu",
                    fullname: "Jonathan Armoza",
                    url: "http://printprobability.org/"
                },

                fleuron: {

                    alt: "Fleuron",
                    image: "/img/fleuron.svg"
                },

                github: "https://github.com/printprobability/cdt",

                maintitle: "Catalog of Distinctive Type",

                navbartitle: "CDT - Restoration England",

                splashboxes: [

                    {
                        alt: "Illustrated A character",
                        image: "/img/a.jpg",
                        text: "Start from a particular book to see the distinctive character types we have identified in it",
                        title: "Browse by book",
                        to: { name: "books" }
                    },
                    {
                        alt: "Ornate I character",
                        image: "/img/i.jpg",
                        text: "Search thousands of characters by glyph and damage types",
                        title: "Browse by character",
                        to: { name: "characters" }
                    },

                    {
                        alt: "Ornate I character",
                        image: "/img/i.jpg",
                        text: "Explore curated sets of distinctive characters that have been identified by our project team.",
                        title: "Browse by curated groupings",
                        to: { name: "groupings" }
                    },
                    /*{
                        alt: "embellished capital S",
                        image: "/img/s.jpg",
                        text: "Learn about the motivation and methodology of the \"Dictionary\", meet the project team, and find associated publications and machine-readable data",
                        title: "Learn about the project",
                        to: { name: "articles", params: { slug: "about" } }
                    },
                    {
                        alt: "Ornate M",
                        image: "/img/m.jpg",
                        text: "Download machine-readable data on books and segmented characters",
                        title: "Access data",
                        to: { name: "articles", params: { slug: "data" } }
                    }*/
                ],

                subtitle: "Restoration England"
            }
        }
    };
});
