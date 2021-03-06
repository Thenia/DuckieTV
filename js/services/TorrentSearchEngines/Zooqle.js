DuckieTV.run(["TorrentSearchEngines", "SettingsService", "$q", "$http", "$injector",
    function(TorrentSearchEngines, SettingsService, $q, $http, $injector) {
        if (SettingsService.get('torrenting.enabled')) {

            TorrentSearchEngines.registerSearchEngine('Zooqle', new GenericTorrentSearchEngine({
                mirror: 'https://zooqle.com',
                mirrorResolver: null,
                includeBaseURL: true,
                endpoints: {
                    search: '/search?q=%s&s=%o&v=t&sd=d',
                    details: '%s'
                },
                selectors: {
                    resultContainer: 'tr ',
                    releasename: ['td:nth-child(2) > a', 'innerText'],
                    magneturl: ['a[title^="Magnet link"', 'href',
                        function(a) {
                            return a + '&tr=udp://tracker.coppersurfer.tk:6969/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=udp://11.rarbg.me:80/announce&tr=udp://9.rarbg.me:2710/announce&tr=udp://9.rarbg.com:2710/announce';
                        }
                    ],
                    size: ['td:nth-child(4)', 'innerText'],
                    seeders: ['td:nth-child(6) div div:first-child', 'innerText',
                        function(a) {
                            return (a[a.length-1] == 'K') ? parseInt(a) * 1000 : a;
                        }],
                    leechers: ['td:nth-child(6) div div:last-child', 'innerText',
                        function(a) {
                            return (a[a.length-1] == 'K') ? parseInt(a) * 1000 : a;
                        }],
                    detailUrl: ['td:nth-child(2) > a', 'href']
                },
                orderby: {
                    age: 'dt',
                    seeders: 'ns', 
                    size: 'sz'
                }
            }, $q, $http, $injector));
        }
    }
]);