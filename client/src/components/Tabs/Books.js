import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import { useDispatch, useSelector } from 'react-redux'
import 'react-tabs/style/react-tabs.css';
import { Container, TextField, InputAdornment, LinearProgress, Divider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const response = {
    kind: 'books#volumes',
    totalItems: 2639,
    items: [
        {
            kind: 'books#volume',
            id: '2bCdaZ7KvDsC',
            etag: 'Vjn3YeRC/6U',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/2bCdaZ7KvDsC',
            volumeInfo: {
                title: 'The Language of Flowers',
                subtitle: 'The Floral Offering: a Token of Affection and Esteem; Comprising the Language and Poetry of Flowers ...',
                authors: [
                    'Henrietta Dumont'
                ],
                publishedDate: '1852',
                industryIdentifiers: [
                    {
                        type: 'OTHER',
                        identifier: 'HARVARD:32044013658547'
                    }
                ],
                readingModes: {
                    text: true,
                    image: true
                },
                pageCount: 300,
                printType: 'BOOK',
                categories: [
                    'Flower language'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.2.3.0.full.3',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=2bCdaZ7KvDsC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=2bCdaZ7KvDsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=2bCdaZ7KvDsC&printsec=frontcover&dq=flowers&hl=&cd=1&source=gbs_api',
                infoLink: 'https://play.google.com/store/books/details?id=2bCdaZ7KvDsC&source=gbs_api',
                canonicalVolumeLink: 'https://play.google.com/store/books/details?id=2bCdaZ7KvDsC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'FREE',
                isEbook: true,
                buyLink: 'https://play.google.com/store/books/details?id=2bCdaZ7KvDsC&rdid=book-2bCdaZ7KvDsC&rdot=1&source=gbs_api'
            },
            accessInfo: {
                country: 'IN',
                viewability: 'ALL_PAGES',
                embeddable: true,
                publicDomain: true,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: true,
                    downloadLink: 'http://books.google.co.in/books/download/The_Language_of_Flowers.epub?id=2bCdaZ7KvDsC&hl=&output=epub&source=gbs_api'
                },
                pdf: {
                    isAvailable: true,
                    downloadLink: 'http://books.google.co.in/books/download/The_Language_of_Flowers.pdf?id=2bCdaZ7KvDsC&hl=&output=pdf&sig=ACfU3U1n9agbciLzFXS4cd_vmKAJsTiEZA&source=gbs_api'
                },
                webReaderLink: 'http://play.google.com/books/reader?id=2bCdaZ7KvDsC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'FULL_PUBLIC_DOMAIN',
                quoteSharingAllowed: false
            }
        },
        {
            kind: 'books#volume',
            id: 'OP8C9mKQxAMC',
            etag: 'Yevf/fH3dBM',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/OP8C9mKQxAMC',
            volumeInfo: {
                title: 'Flowers of Trinidad and Tobago',
                authors: [
                    'J. S. Kenny'
                ],
                publisher: 'Prospect Press/MEP',
                publishedDate: '2006',
                industryIdentifiers: [
                    {
                        type: 'ISBN_13',
                        identifier: '9789769505780'
                    },
                    {
                        type: 'ISBN_10',
                        identifier: '9769505781'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 140,
                printType: 'BOOK',
                categories: [
                    'Flowers'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '3.1.0.0.preview.1',
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=OP8C9mKQxAMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=OP8C9mKQxAMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=OP8C9mKQxAMC&pg=PA7&dq=flowers&hl=&cd=2&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=OP8C9mKQxAMC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Flowers_of_Trinidad_and_Tobago.html?hl=&id=OP8C9mKQxAMC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=OP8C9mKQxAMC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'The axis of the inflorescence is the rachis; its branches are peduncles, and <br>\nindividual <b>flowers</b> are borne on pedicels. There may be bracts or leaflike <br>\nstructures at the bases of the peduncles. The simplest type of inflorescence is the <br>\nspike along&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: 'u3tgZ-hKARgC',
            etag: 'BUCZUuB7/xg',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/u3tgZ-hKARgC',
            volumeInfo: {
                title: 'Hope for the Flowers',
                authors: [
                    'Trina Paulus'
                ],
                publisher: 'Paulist Press',
                publishedDate: '1972',
                description: 'A different sort of book for everyone except those who have given up completely. (and even they might secretly enjoy it.)',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0809117541'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780809117543'
                    }
                ],
                readingModes: {
                    text: false,
                    image: false
                },
                pageCount: 144,
                printType: 'BOOK',
                categories: [
                    'Religion'
                ],
                averageRating: 4,
                ratingsCount: 21,
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '1.1.1.0.preview.0',
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=u3tgZ-hKARgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=u3tgZ-hKARgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=u3tgZ-hKARgC&printsec=frontcover&dq=flowers&hl=&cd=3&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=u3tgZ-hKARgC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Hope_for_the_Flowers.html?hl=&id=u3tgZ-hKARgC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=u3tgZ-hKARgC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'Hope&#39;s theme of life, moving through seeming death to a new and more beautiful life, has touched the hearts of millions of people. More than two million copies in print.'
            }
        },
        {
            kind: 'books#volume',
            id: 'kWhEAAAAYAAJ',
            etag: '3/n+jXZ1bIg',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/kWhEAAAAYAAJ',
            volumeInfo: {
                title: 'Talks about Flowers',
                authors: [
                    'Mrs. M. D. Wellcome'
                ],
                publishedDate: '1881',
                industryIdentifiers: [
                    {
                        type: 'OTHER',
                        identifier: 'CORNELL:31924019152986'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 162,
                printType: 'BOOK',
                categories: [
                    'Floriculture'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.0.2.0.full.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=kWhEAAAAYAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=kWhEAAAAYAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=kWhEAAAAYAAJ&pg=PP1&dq=flowers&hl=&cd=4&source=gbs_api',
                infoLink: 'https://play.google.com/store/books/details?id=kWhEAAAAYAAJ&source=gbs_api',
                canonicalVolumeLink: 'https://play.google.com/store/books/details?id=kWhEAAAAYAAJ'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'FREE',
                isEbook: true,
                buyLink: 'https://play.google.com/store/books/details?id=kWhEAAAAYAAJ&rdid=book-kWhEAAAAYAAJ&rdot=1&source=gbs_api'
            },
            accessInfo: {
                country: 'IN',
                viewability: 'ALL_PAGES',
                embeddable: true,
                publicDomain: true,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false,
                    downloadLink: 'http://books.google.co.in/books/download/Talks_about_Flowers.epub?id=kWhEAAAAYAAJ&hl=&output=epub&source=gbs_api'
                },
                pdf: {
                    isAvailable: true,
                    downloadLink: 'http://books.google.co.in/books/download/Talks_about_Flowers.pdf?id=kWhEAAAAYAAJ&hl=&output=pdf&sig=ACfU3U1-pWNhEBRw5_1KAKeIbe50nUfaCQ&source=gbs_api'
                },
                webReaderLink: 'http://play.google.com/books/reader?id=kWhEAAAAYAAJ&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'FULL_PUBLIC_DOMAIN',
                quoteSharingAllowed: false
            }
        },
        {
            kind: 'books#volume',
            id: 'cfK2LoH_j54C',
            etag: 'bR9Yuru1tls',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/cfK2LoH_j54C',
            volumeInfo: {
                title: 'Annapurna : A Bunch Of Flowers Of Indian Culture',
                authors: [
                    'P. Arundhati'
                ],
                publisher: 'Concept Publishing Company',
                publishedDate: '2002-04',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '8170228972'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9788170228974'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 108,
                printType: 'BOOK',
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.2.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=cfK2LoH_j54C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=cfK2LoH_j54C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=cfK2LoH_j54C&printsec=frontcover&dq=flowers&hl=&cd=5&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=cfK2LoH_j54C&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Annapurna_A_Bunch_Of_Flowers_Of_Indian_C.html?hl=&id=cfK2LoH_j54C'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=cfK2LoH_j54C&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            }
        },
        {
            kind: 'books#volume',
            id: 'wWg5AAAAIAAJ',
            etag: '2MkAzuzAKTA',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/wWg5AAAAIAAJ',
            volumeInfo: {
                title: 'The Culture of Flowers',
                authors: [
                    'Jack Goody'
                ],
                publisher: 'CUP Archive',
                publishedDate: '1993-02-25',
                description: 'An analysis of the symbolic and transactional uses of flowers in secular life and religious ritual from ancient Egypt to modern times.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0521414415'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780521414418'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 462,
                printType: 'BOOK',
                categories: [
                    'Nature'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.1.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=wWg5AAAAIAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=wWg5AAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=wWg5AAAAIAAJ&printsec=frontcover&dq=flowers&hl=&cd=6&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=wWg5AAAAIAAJ&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/The_Culture_of_Flowers.html?hl=&id=wWg5AAAAIAAJ'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=wWg5AAAAIAAJ&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'An analysis of the symbolic and transactional uses of flowers in secular life and religious ritual from ancient Egypt to modern times.'
            }
        },
        {
            kind: 'books#volume',
            id: '6jRsF1nOmqgC',
            etag: '3w9kYs5AeNY',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/6jRsF1nOmqgC',
            volumeInfo: {
                title: 'Edible & Medicinal Flowers',
                authors: [
                    'Margaret Joan Roberts'
                ],
                publisher: 'New Africa Books',
                publishedDate: '2000',
                description: 'This guide brings together an extraordinary collection of over 80 flowers, trees and herbs that not only give a magnificent show in the garden, but also have remarkable healing properties and can be used in cooking and as cosmetic alternatives.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0864864671'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780864864673'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 160,
                printType: 'BOOK',
                categories: [
                    'Cooking (Flowers)'
                ],
                averageRating: 5,
                ratingsCount: 2,
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.1.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=6jRsF1nOmqgC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=6jRsF1nOmqgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=6jRsF1nOmqgC&pg=PA29&dq=flowers&hl=&cd=7&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=6jRsF1nOmqgC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Edible_Medicinal_Flowers.html?hl=&id=6jRsF1nOmqgC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=6jRsF1nOmqgC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: '||NACEA |ELDER <b>FLOWERS</b>. chinacea is undoubtedly one of the world&#39;s E. <br>\nimportant medicinal plants. Over recent years it has drawn increasing respect <br>\nfrom the medical profession, as its ancient uses in traditional herbal medicine are <br>\nbeing&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: 'fiBbdJ1sdA8C',
            etag: 'q8IqYSD/Tqo',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/fiBbdJ1sdA8C',
            volumeInfo: {
                title: 'The Language of Flowers',
                subtitle: 'A History',
                authors: [
                    'Beverly Seaton'
                ],
                publisher: 'University of Virginia Press',
                publishedDate: '2012-10-10',
                description: 'The author traces the phenomenon of ascribing sentimental meaning to floral imagery from its beginnings in Napoleonic France through its later transformations in England and America. At the heart of the book is a depiction of what the three most important flower books from each of the countries divulge about the period and the respective cultures. Seaton shows that the language of flowers was not a single and universally understood correlation of flowers to meanings that men and women used to communicate in matters of love and romance. The language differs from book to book, country to country. To place the language of flowers in social and literary perspective, the author examines the nineteenth-century uses of flowers in everyday life and in ceremonies and rituals and provides a brief history of floral symbolism. She also discusses the sentimental flower book, a genre especially intended for female readers. Two especially valuable features of the book are its table of correlations of flowers and their meanings from different sourcebooks and its complete bibliography of language of flower titles. This book will appeal not only to scholars in Victorian studies and women\'s studies but also to art historians, book collectors, museum curators, historians of horticulture, and anyone interested in nineteenth-century popular culture.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0813934532'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780813934532'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 234,
                printType: 'BOOK',
                categories: [
                    'Literary Criticism'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: true,
                contentVersion: '2.1.1.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=fiBbdJ1sdA8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=fiBbdJ1sdA8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=fiBbdJ1sdA8C&pg=PA61&dq=flowers&hl=&cd=8&source=gbs_api',
                infoLink: 'https://play.google.com/store/books/details?id=fiBbdJ1sdA8C&source=gbs_api',
                canonicalVolumeLink: 'https://play.google.com/store/books/details?id=fiBbdJ1sdA8C'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'FOR_SALE',
                isEbook: true,
                listPrice: {
                    amount: 2425.11,
                    currencyCode: 'INR'
                },
                retailPrice: {
                    amount: 2425.11,
                    currencyCode: 'INR'
                },
                buyLink: 'https://play.google.com/store/books/details?id=fiBbdJ1sdA8C&rdid=book-fiBbdJ1sdA8C&rdot=1&source=gbs_api',
                offers: [
                    {
                        finskyOfferType: 1,
                        listPrice: {
                            amountInMicros: 2425110000,
                            currencyCode: 'INR'
                        },
                        retailPrice: {
                            amountInMicros: 2425110000,
                            currencyCode: 'INR'
                        }
                    }
                ]
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: true,
                    acsTokenLink: 'http://books.google.co.in/books/download/The_Language_of_Flowers-sample-pdf.acsm?id=fiBbdJ1sdA8C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api'
                },
                webReaderLink: 'http://play.google.com/books/reader?id=fiBbdJ1sdA8C&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'For there is no Height in which there are not <b>flowers</b>. For <b>flowers</b> have great <br>\nvirtues for all the senses. For the <b>flower</b> glorifies God and the root parries the <br>\nadversary. For <b>flowers</b> have their angels even the words of (Chris- /-&#39; j&gt; „• topher <br>\nGod 5&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: 'Pv1eUCKdP-QC',
            etag: 'HbVe2MKONVU',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/Pv1eUCKdP-QC',
            volumeInfo: {
                title: 'Caring for Cut Flowers',
                authors: [
                    'Rod Jones'
                ],
                publisher: 'Landlinks Press',
                publishedDate: '2001',
                description: 'Caring for Cut Flowers shows florists and growers how to make cut flowers last longer. While proper postharvest techniques will not magically transform poor quality flowers into first class material, a few basic, inexpensive techniques can maximise the vase life of good quality material.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0643066314'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780643066311'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 191,
                printType: 'BOOK',
                categories: [
                    'Science'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.0.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=Pv1eUCKdP-QC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=Pv1eUCKdP-QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=Pv1eUCKdP-QC&pg=PA9&dq=flowers&hl=&cd=9&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=Pv1eUCKdP-QC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Caring_for_Cut_Flowers.html?hl=&id=Pv1eUCKdP-QC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=Pv1eUCKdP-QC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'This is also true of winter bulb <b>flowers</b> such as Tulips, Daffodils, Jonquils and <br>\nHyacinth, as well as Anemones. A good example of a <b>flower</b> that can benefit from <br>\nwarm water treatment is Dutch Iris. In mid-winter (July) it can sometimes be <br>\ndifficult&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: '8_DfMSS9r9cC',
            etag: 'ZX4M9b3D8lQ',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/8_DfMSS9r9cC',
            volumeInfo: {
                title: 'Diversity and Evolutionary Biology of Tropical Flowers',
                authors: [
                    'Peter K. Endress'
                ],
                publisher: 'Cambridge University Press',
                publishedDate: '1996-07-25',
                description: 'A unique account of the structure, biology and evolution of tropical flowering plants.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0521565103'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780521565103'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 511,
                printType: 'BOOK',
                categories: [
                    'Nature'
                ],
                averageRating: 5,
                ratingsCount: 1,
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '1.0.1.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=8_DfMSS9r9cC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=8_DfMSS9r9cC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=8_DfMSS9r9cC&pg=PA190&dq=flowers&hl=&cd=10&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=8_DfMSS9r9cC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Diversity_and_Evolutionary_Biology_of_Tr.html?hl=&id=8_DfMSS9r9cC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=8_DfMSS9r9cC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: '6.1 Sex expression: bisexual and unisexual <b>flowers</b>, monoecy and dioecy <br>\nBisexual (hermaphrodite, perfect) <b>flowers</b> are predominant in the angiosperms <br>\nbut there is also a large number of groups with unisexual <b>flowers</b>. There are also <br>\nmany&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: 'zfWYxR9mof8C',
            etag: '9Ntgz562xRc',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/zfWYxR9mof8C',
            volumeInfo: {
                title: 'Taylor\'s 50 Best Herbs and Edible Flowers',
                subtitle: 'Easy Plants for More Beautiful Gardens',
                authors: [
                    'Houghton Mifflin Company',
                    'Frances Tenenbaum'
                ],
                publisher: 'Houghton Mifflin Harcourt',
                publishedDate: '1999',
                description: 'Provides a description for fifty types of herbs and edible flowers, and discusses how to grow and how to use each',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0395873355'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780395873359'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 113,
                printType: 'BOOK',
                categories: [
                    'Gardening'
                ],
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.1.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=zfWYxR9mof8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=zfWYxR9mof8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=zfWYxR9mof8C&pg=PA104&dq=flowers&hl=&cd=11&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=zfWYxR9mof8C&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Taylor_s_50_Best_Herbs_and_Edible_Flower.html?hl=&id=zfWYxR9mof8C'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=zfWYxR9mof8C&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'VALERIAN (GARDEN HELIOTROPE) Valeriana officinalis Zones: 3–9 Type: <br>\nPerennial Light: Full sun Size: 3–5 ft. tall, 4 ft. wide Interest: Pink, white, or <br>\nlavender <b>flowers</b> in 4-inch-wide, fragrant clusters Uses: Aromatic, decorative, <br>\nmedicinal his&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: 'RGa2VeA8HiMC',
            etag: 'Vt05dYVq8Oc',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/RGa2VeA8HiMC',
            volumeInfo: {
                title: 'Flowers for Trade',
                authors: [
                    'V.L.Sheela'
                ],
                publisher: 'New India Publishing',
                publishedDate: '2008-03-05',
                description: 'The book is a classic covering flowers used in decoration of houses, offices, restaurants, hospitals and private places of rest and relaxation. For nature lovers, it is a paradise of colours, forms and shapes. Fragrant flowers, flowers for bouquet making, flowers for essences and bonsai are narrated to the enchantment of students and scholars as well. There are 21 chapters dealing with general topics in flower trade, standards, markets and global demand and supply. The specific chapters deal elaborately anthuriums, carnations, china aster, chrysanthemums, gerbera, gladiolus, helicorneas, jasmine, marigold, orchids, roses and tube roses. An exhaustive chapter on new cut flowers narrates recent introductions .The Japanese Bonsai is dealt in exquisite style. Research and development in this sector are separately dealt with. Future prospects, trends and globalised flower marketing are written for use of floriculturists. Modern technology of protected growing of flowers is informative. All the flowers indicated in the book are presented in colour photograph forms as well.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '8189422510'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9788189422516'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 394,
                printType: 'BOOK',
                categories: [
                    'Gardening'
                ],
                averageRating: 4,
                ratingsCount: 1,
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.0.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=RGa2VeA8HiMC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=RGa2VeA8HiMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=RGa2VeA8HiMC&pg=PA1&dq=flowers&hl=&cd=12&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=RGa2VeA8HiMC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Flowers_for_Trade.html?hl=&id=RGa2VeA8HiMC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=RGa2VeA8HiMC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'Floriculture - Global and Domestic Scenario Cloriculture is increasingly regarded <br>\nas a viable diversification from T &#39; traditional field crops due to increased per unit <br>\nreturns and increasing habit of “ saying it with <b>flowers</b> ” during all the occasions&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: 'xTKrS3j-zZIC',
            etag: 'T/Re9jlPQpo',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/xTKrS3j-zZIC',
            volumeInfo: {
                title: 'The New Book of Wedding Flowers',
                subtitle: 'Simple & Stylish Arrangements for the Creative Bride',
                authors: [
                    'Joanne O\'Sullivan'
                ],
                publisher: 'Lark Books',
                publishedDate: '2004',
                description: 'Provides instructions for creating a wedding flower plan, including budget, arrangements, themes, and working with florists.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '1579904653'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9781579904654'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 144,
                printType: 'BOOK',
                categories: [
                    'Reference'
                ],
                averageRating: 3,
                ratingsCount: 1,
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.1.2.0.preview.1',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=xTKrS3j-zZIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=xTKrS3j-zZIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=xTKrS3j-zZIC&pg=PA30&dq=flowers&hl=&cd=13&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=xTKrS3j-zZIC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/The_New_Book_of_Wedding_Flowers.html?hl=&id=xTKrS3j-zZIC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=xTKrS3j-zZIC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'TO GIVE YOUR WEDDING <b>flowers</b> the best chance of making it through the day <br>\nwithout a meltdown, get them off to a good start. Proper conditioning can add <br>\ndays to the life span of a <b>flower</b>, preventing premature wilting and drooping.'
            }
        },
        {
            kind: 'books#volume',
            id: 'mys8YuDFD34C',
            etag: 'i+YmL4tHgVA',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/mys8YuDFD34C',
            volumeInfo: {
                title: '1001 Questions Answered about Flowers',
                authors: [
                    'Norman Taylor'
                ],
                publisher: 'Courier Corporation',
                publishedDate: '1996',
                description: 'Fascinating, authoritative, easy-to-follow guide to flower form and function, orchids, Eastern and Western wildflowers, older cultivated varieties, today’s perennials, annuals and biennials; flowering trees and shrubs, and tropical and subtropical flowers. Includes botanical and common names, places of origin, outstanding characteristics, and practical advice on planting and cultivation.',
                industryIdentifiers: [
                    {
                        type: 'ISBN_10',
                        identifier: '0486290999'
                    },
                    {
                        type: 'ISBN_13',
                        identifier: '9780486290997'
                    }
                ],
                readingModes: {
                    text: false,
                    image: true
                },
                pageCount: 335,
                printType: 'BOOK',
                categories: [
                    'Nature'
                ],
                averageRating: 4,
                ratingsCount: 1,
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.2.0.0.preview.1',
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=mys8YuDFD34C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=mys8YuDFD34C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=mys8YuDFD34C&pg=PA142&dq=flowers&hl=&cd=14&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=mys8YuDFD34C&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/1001_Questions_Answered_about_Flowers.html?hl=&id=mys8YuDFD34C'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'PARTIAL',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: false
                },
                pdf: {
                    isAvailable: false
                },
                webReaderLink: 'http://play.google.com/books/reader?id=mys8YuDFD34C&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: 'What is the difference between wildflowers and cultivated <b>flowers</b>? There is a <br>\nvital one. All wildflowers must survive the intense competition for food, light and <br>\nthe hazards of a natural environment. That they do survive these is the measure <br>\nof&nbsp;...'
            }
        },
        {
            kind: 'books#volume',
            id: '0gbuAmwGgFAC',
            etag: 'J8MC0kCut8Y',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/0gbuAmwGgFAC',
            volumeInfo: {
                title: 'Cut flowers',
                publisher: 'DIANE Publishing',
                industryIdentifiers: [
                    {
                        type: 'ISBN_13',
                        identifier: '9781428958159'
                    },
                    {
                        type: 'ISBN_10',
                        identifier: '1428958150'
                    }
                ],
                readingModes: {
                    text: true,
                    image: true
                },
                printType: 'BOOK',
                maturityRating: 'NOT_MATURE',
                allowAnonLogging: false,
                contentVersion: '0.0.2.0.preview.3',
                panelizationSummary: {
                    containsEpubBubbles: false,
                    containsImageBubbles: false
                },
                imageLinks: {
                    smallThumbnail: 'http://books.google.com/books/content?id=0gbuAmwGgFAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
                    thumbnail: 'http://books.google.com/books/content?id=0gbuAmwGgFAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
                },
                language: 'en',
                previewLink: 'http://books.google.co.in/books?id=0gbuAmwGgFAC&pg=PA7&dq=flowers&hl=&cd=15&source=gbs_api',
                infoLink: 'http://books.google.co.in/books?id=0gbuAmwGgFAC&dq=flowers&hl=&source=gbs_api',
                canonicalVolumeLink: 'https://books.google.com/books/about/Cut_flowers.html?hl=&id=0gbuAmwGgFAC'
            },
            saleInfo: {
                country: 'IN',
                saleability: 'NOT_FOR_SALE',
                isEbook: false
            },
            accessInfo: {
                country: 'IN',
                viewability: 'ALL_PAGES',
                embeddable: true,
                publicDomain: false,
                textToSpeechPermission: 'ALLOWED',
                epub: {
                    isAvailable: true
                },
                pdf: {
                    isAvailable: true
                },
                webReaderLink: 'http://play.google.com/books/reader?id=0gbuAmwGgFAC&hl=&printsec=frontcover&source=gbs_api',
                accessViewStatus: 'SAMPLE',
                quoteSharingAllowed: false
            },
            searchInfo: {
                textSnippet: '<b>Flowers</b> that do not retain water and are not kept at low temperatures will lose <br>\nwater and wilt quickly. Grading of cut <b>flowers</b> is done to ensure consistent <br>\nstandards. Stems are generally graded by stem length (18 to 24 inches for most <br>\n<b>flower</b>&nbsp;...'
            }
        }
    ]
}


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        minHeight : 400
    },
    media: {
        height: 150,
    },

    content : {
        height : 200
    }
});


const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
};

const Books = () => {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [searchBooks, setSearchBooks] = useState([]);



    const handleChange = (value) => {

        setValue(value);

    }

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=AIzaSyD8Z6_mDX371SmWvcek1Ub50B6IDTUZVVo&maxResults=15`)
            const result = await response.json();
            const books = await result.items;
            setLoading(false);
            if(!books) {
                setSearchBooks('No books found');
            } else {
                setSearchBooks(books);
            }
            
            
        } catch(err) {
            console.log(err);
        }
    }


    const handleAddBook = (item) => {
        console.log(item);
    }


    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <TextField
                style={{ backgroundColor: 'white', width: '100%', padding: '10px 20px' }}
                id="input-with-icon-textfield"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchSharp />
                        </InputAdornment>
                    )
                }}
                placeholder={'Search for books'}
                value={value}
                onChange={e => handleChange(e.target.value)}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" style={{ color: 'white', alignSelf: 'center', marginTop: 5 }} onClick={handleSearch}>SEARCH</Button>

            </div>
            <LinearProgress color="primary" style={{ display: isLoading ? 'block' : 'none' }} />
            <div>
                <h4>Retrieved Books</h4>
                <Divider />
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >

                    {!searchBooks.map ? 'No Books Found' : searchBooks.map((item, index) => {
                        
                        
                        return (
                            <Card key={index} className={classes.root}>
                        <CardActionArea>
                            
                            <CardMedia
                                className={classes.media}
                                image={item.volumeInfo.imageLinks.thumbnail}
                                title="Contemplative Reptile"
                            />
                            
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.volumeInfo.title}
          </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {!item.volumeInfo.subtitle ? 'No description available' : item.volumeInfo.subtitle}
          </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{display : 'flex', alignItem : 'center', justifyContent : 'center'}}>
                            <Button size="large" variant="contained" color="primary" onClick={() => handleAddBook(item)}>
                                ADD
        </Button>
                        </CardActions>
                    </Card>
                        )
                    })}
                    
                </Masonry>

            </div>
            

        </div>
    )
}


export default Books;