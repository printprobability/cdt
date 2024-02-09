export default defineNuxtPlugin((nuxtApp) => {

    return {
        provide: {
            config: () => ({

                maintitle: "Catalog of Distinctive Type",
                subtitle: "Restoration England",
                abstract: "A curated reference for distinctive type pieces in early English printed books",
                navbartitle: "CDT - Restoration England",
                contact: {

                    fullname: "Matthew Lincoln",
                    email: "matthew.d.lincoln@gmail.com",
                    url: "https://matthewlincoln.net"
                },
                alpha: true,
                github: "https://github.com/mdlincoln/nuxt-pp",
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
                        head: "Browse by book",
                        lead: "Start from a particular book to see the distinctive character types we have identified in it",
                        image: "/img/a.jpg",
                        alt: "Illustrated A character",
                        to: { name: "books" }
                    },
                    {
                        head: "Browse by character",
                        lead: "Search thousands of characters by glyph and damage types",
                        image: "/img/i.jpg",
                        alt: "Ornate I character",
                        to: { name: "characters" }
                    },
                    {
                        head: "Browse by curated groupings",
                        lead: "Explore curated sets of distinctive characters that have been identified by our project team.",
                        image: "/img/i.jpg",
                        alt: "Ornate I character",
                        to: { name: "groupings" }
                    },
                    {
                        head: "Learn about the project",
                        lead: "Learn about the motivation and methodology of the \"Dictionary\", meet the project team, and find associated publications and machine-readable data",
                        image: "/img/s.jpg",
                        alt: "embellished capital S",
                        to: { name: 'articles-slug', params: { slug: 'about' } }
                    },
                    {
                        head: "Access data",
                        lead: "Download machine-readable data on books and segmented characters",
                        image: "/img/m.jpg",
                        alt: "Ornate M",
                        to: { name: "articles-slug", params: { slug: "data" } }
                    },
                ]
            })
        }
    };
});
