[%REMOVE_ADSENSE%]
/** 
 * GAM KLY V5 - www.bola.net
 * Prefix Detail :
 * gfn : Global Function
 * prebid : Prebid - remove
 * Copyright 2025
 * Author: Ads Tech KLY
 * All Rights Reserved.
 */
var gptadslots = [];
var googletag = googletag || {};
var pbjs = pbjs || {};
var pageKlyObj = typeof window.kly !== 'undefined' ? window.kly : window.kmklabs;
pbjs.que = pbjs.que || [];
googletag.cmd = googletag.cmd || [];

window.GAMLibrary = {};
window.GAMLibrary = {
    gamImmersive: '/36504930/KLY/DESKTOP/BOLA.NET/IMMERSIVE',
    gamTopFrame: '/36504930/KLY/DESKTOP/BOLA.NET/TOP_FRAME',
    gamBottomFrame: '/36504930/KLY/DESKTOP/BOLA.NET/BOTTOM_FRAME',
    gamSkinad: '/36504930/KLY/DESKTOP/BOLA.NET/SKINAD',
    gamBillboard: '/36504930/KLY/DESKTOP/BOLA.NET/MASTHEAD',
    gamBalloon: '/36504930/KLY/DESKTOP/BOLA.NET/BALLOON',
    gamNewsTag1: '/36504930/KLY/DESKTOP/BOLA.NET/NEWS_TAG_1',
    gamNewsTag2: '/36504930/KLY/DESKTOP/BOLA.NET/NEWS_TAG_2',
    gamHeadlineCRM: '/36504930/KLY/DESKTOP/BOLA.NET/HEADLINE_CRM',
    gamOrganicFeedCRM1: '/36504930/KLY/DESKTOP/BOLA.NET/ORGANIC_FEED_CRM_1',
    gamOrganicFeedCRM2: '/36504930/KLY/DESKTOP/BOLA.NET/ORGANIC_FEED_CRM_2',
    gamOrganicFeedCRM3: '/36504930/KLY/DESKTOP/BOLA.NET/ORGANIC_FEED_CRM_3',
  	gamSlideUp: '/36504930/KLY/DESKTOP/BOLA.NET/SLIDE_UP',
    gamAdvertorialHL1: '/36504930/KLY/DESKTOP/BOLA.NET/ADVERTORIAL_HEADLINE_1',
    gamAdvertorialHL2: '/36504930/KLY/DESKTOP/BOLA.NET/ADVERTORIAL_HEADLINE_2',
    gamShowcase: '/36504930/KLY/DESKTOP/BOLA.NET/SHOWCASE',
    gamHalfpage1: '/36504930/KLY/DESKTOP/BOLA.NET/HALFPAGE_1',
    gamLeaderboard: '/36504930/KLY/DESKTOP/BOLA.NET/LEADERBOARD',
    gamInterstitial: '/36504930/KLY/DESKTOP/BOLA.NET/INTERSTITIAL',
    gamPictureFirst: '/36504930/KLY/DESKTOP/BOLA.NET/CONTENT_CAROUSEL',
    gamInreadNative: '/36504930/KLY/DESKTOP/BOLA.NET/IN-READ_NATIVE',
    gamInsertion: '/36504930/KLY/DESKTOP/BOLA.NET/INSERTION',
  	gamWidget: '/36504930/KLY/DESKTOP/BOLA.NET/WIDGET',
    pageUrlPath: document.URL,
    gamUserAgent: navigator.userAgent.toLowerCase(),
    gamIsTablet: /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(this.gamUserAgent),
    pageDocumentMeta: function(metaName) {
        var metaResult = '';
        var metas = document.getElementsByTagName('meta');
        if (metas) {
            for (var x = 0, y = metas.length; x < y; x++) {
                if (metas[x].name.toLowerCase() == metaName) {
                    metaResult += metas[x].content;
                }
            }
        }
        return metaResult != '' ? metaResult : '';
    },
    gfnFilterString: function(str, delimiter) {
        return str.trim().split(delimiter).map(function(t) {
            return t.trim().toLowerCase()
        }).filter(x => x != "");
    },
    pageTags: [""],
    pageBrandSafetyChecker: function() {
        var articlePages = pageKlyObj && pageKlyObj.article,
            isMatcont = "0",
            isViolateBrandSafety = "0",
            bsKeyword = [],
            pageTitle = articlePages && this.gfnFilterString(articlePages.title),
            pageTitles = (typeof pageTitle !== 'undefined') ? pageTitle : '',
            pageKeyword = this.pageDocumentMeta("keywords"),
            pageDesc = this.pageDocumentMeta("description"),
            pageTag = pageKlyObj.gtm.tag || pageKlyObj.tag && pageKlyObj.tag.name,
            tagForAds = typeof pageTag === 'undefined' ? [] : this.gfnFilterString(pageTag.replace(/[^A-Za-z0-9|\- ]/ig, ""), "|");

        this.pageTags = typeof pageTag === 'undefined' ? [] : this.gfnFilterString(pageTag.replace(/[^A-Za-z0-9|\- ]/ig, ""), "|");

        const BS_KEYWORD_LIST = {
            [%brandSafetyKeyword%]
        };

        /*change this acording to the site page layout*/
        var siteContentObject = document.getElementsByClassName("infinite");
        var siteContentText = "";

        if (siteContentObject.length) {
            siteContentText = siteContentObject[0].innerText;

            /*removing BACA JUGA box since it unrelated with main content*/
            /*change this acording to the site page layout*/
            var baca_juga_elements = siteContentObject[0].getElementsByClassName("detail__terkait");
            for (var i in baca_juga_elements) {
                bacajuga = baca_juga_elements[i].innerText;
                siteContentText = siteContentText.replace(bacajuga, '');
            }
        }

        siteContentText = pageKeyword.concat(pageTitles, ' ', pageDesc, ' ', tagForAds, ' ', siteContentText);

        /*Iterate for all keyword list category to find match word*/
        for (var bsKey in BS_KEYWORD_LIST) {
            var subKeywordList = BS_KEYWORD_LIST[bsKey];
            if (subKeywordList.length > 0) {
                if (matchString = new RegExp("\\b(" + subKeywordList.join("|") + ")\\b", "ig").exec(siteContentText)) {
                    bsKeyword.push(bsKey);
                }
            }
        }

        if (bsKeyword.length > 0) {
            googletag.pubads().setTargeting("bsKeyword", bsKeyword);
            /*Temporary preserve the previous brand safety targeting*/
            googletag.pubads().setTargeting("brandsafety", isViolateBrandSafety);
        }
      
        googletag.pubads().setTargeting("isMatcont", (typeof pageKlyObj !== 'undefined' && typeof pageKlyObj.article !== 'undefined' && pageKlyObj.article.isAdultContent === true) ? "1" : isMatcont);
    },
    onMessageReceivedGPTUpdateCreativeStyle: function() {
        this.onMessageReceivedGetStyle = function(e) {
            /** filter only correct origin and setStyle command */
            if (!(e.origin.match(/safeframe.googlesyndication.com/ig)) ||
                typeof e.data !== 'object' ||
                typeof e.data.id !== 'string' ||
                e.data.cmd !== 'setStyle' ||
                typeof e.data.params !== 'object'
            ) {
                return;
            }

            /* remove # character from id, we don't use jquery*/
            var elementId = e.data.id.replace(/#/, "");

            var wrapperEl = document.getElementById(elementId);
            if (wrapperEl === null) {
                return;
            }

            var elements = [wrapperEl];
            /*target on KLY authorized element child ( div and iframe ) */
            if (typeof e.data.query === 'string' && e.data.query) {
                let el = null;
                if (el = e.data.query.match(/(div|iframe)/ig)) {
                    elements = wrapperEl.querySelectorAll(el.join(", "));
                }
            }

            /** target on KLY authorized attribute ( display, heigth, width ) */
            elements.forEach(function(element) {
                Object.keys(e.data.params).forEach(function(param) {
                    let allowedAttr = ['display', 'height', 'width'];
                    allowedAttr.indexOf(param) > -1 ? (element.style[param] = e.data.params[param]) : '';
                });
            });

        }
        if (window.addEventListener) {
            window.addEventListener('message', this.onMessageReceivedGetStyle, false);
        } else {
            if (window.attachEvent) {
                window.attachEvent('onmessage', this.onMessageReceivedGetStyle);
            } else {
                window.onmessage = this.onMessageReceivedGetStyle;
            }
        }
    },
  	bfInjectStyle : function () {
        var btmfrm = document.querySelector("#div-gpt-ad-bola-bottomfrm-oop");
        if (!btmfrm) return;

        var btmfrmPlaceholder = document.createElement('div');
            btmfrmPlaceholder.id = 'div-gpt-ad-bottomfrm-placeholder';

        var btnMinimize = document.createElement("span");
            btnMinimize.setAttribute("id", "bottomframe-toggle");
            btnMinimize.innerHTML = `Hide Ads <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/asset/img/arrow-down-w.png" alt="icon" class="toggle-img">`;

        btnMinimize.addEventListener('click', function(event) {
            if (!btmfrmPlaceholder.classList.contains('shrink')) {
                btmfrmPlaceholder.classList.add('shrink');
                btnMinimize.innerHTML = `Show Ads <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/asset/img/arrow-up-w.png" alt="icon" class="toggle-img">`;
            } else {
                btmfrmPlaceholder.classList.remove('shrink');
                btnMinimize.innerHTML = `Hide Ads <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/asset/img/arrow-down-w.png" alt="icon" class="toggle-img">`;

            }
        });

        var style = document.createElement("style");
        style.textContent = `
            #div-gpt-ad-bottomfrm-placeholder {
                position: fixed;
                width: 100%;
                bottom: 0;
                z-index: 9999;
                transition: bottom 0.1s;
                text-align: center;
            }
            #div-gpt-ad-bottomfrm-placeholder.shrink {
                bottom: 0 !important;
            }
            #div-gpt-ad-bola-bottomfrm-oop{
                bottom: initial;
            }   
            #div-gpt-ad-bottomfrm-placeholder #div-gpt-ad-bola-bottomfrm-oop{
                margin-top: 10px;
            }
            #div-gpt-ad-bottomfrm-placeholder.shrink #div-gpt-ad-bola-bottomfrm-oop{
                max-height: 0;
                min-height: 0;
            }
            #bottomframe-toggle {
                background: #878787;
                border-radius: 30px;
                padding: 6px 10px;
                font-size: 10px;
                line-height: 15px;
                color: #fff;
                font-weight: 700;
                cursor: pointer;
            }
            .toggle-img {
                width: 10px;
            }
        `;

        btmfrm.parentNode.insertBefore(btmfrmPlaceholder, btmfrm);
        btmfrmPlaceholder.appendChild(style);
        btmfrmPlaceholder.appendChild(btnMinimize);
        btmfrmPlaceholder.appendChild(btmfrm);
    },
    createDMPTracker: function(adsCatList, dfpTracker, macro) {
        window.open(dfpTracker, '_blank');
    },
    /** ============ PREBID ============ */
    // create an array for header bidding gpt slots
    prebidHeaderBiddingSlots : [],
    set phbSlots(val) {
        this.prebidHeaderBiddingSlots.push(val);
    },
    get phbSlots() {
        return this.prebidHeaderBiddingSlots;
    },
    prebidInstantiate: function() {
        var headerBiddingSlots = this.phbSlots;
        var failsafeTimeout = 3000;
        var hbSlotsCount = 0;

        // check if headerBiddingSlots length not 0
        var hbSlotsInterval = setInterval(function() {
            if (headerBiddingSlots.length > 0) {
                googletag.cmd.push(function() {
                    pbjs.que.push(function() {
                        // example flag to prevent multiple gam calls during failsafe timeout
                        pbjs.adserverRequestSent = false;
                        
                        // dm specific pbjs.rp.requestBids function instead of pbjs.requestBids
                        pbjs.rp.requestBids({
                            callback: sendAdServerRequest,
                            gptSlotObjects: headerBiddingSlots
                        });
                    }.bind(this));
                }.bind(this));
                clearInterval(hbSlotsInterval);
            }
            if (hbSlotsCount > 10) {
                clearInterval(hbSlotsInterval);
            }
            hbSlotsCount++;
        }, 300);

        // callback function to fire once prebid bids are returned from dm
        var sendAdServerRequest = function(headerBiddingSlots) {
            googletag.cmd.push(function() {
                // example failsafe flag to exit out of function if gam request was already sent
                if (pbjs.adserverRequestSent) return;
                pbjs.adserverRequestSent = true;
                // make request to gam for header bidding slots
                googletag.pubads().refresh(headerBiddingSlots);
            });
        };
        
        // fallback function to fire callback function in the event of timeout
        setTimeout(function() {
            sendAdServerRequest(headerBiddingSlots);
        }, failsafeTimeout);
    },
    /** ============ PREBID ============ */

    /** ============ GPT EVENT LISTENER ============ */
    gamSlotRenderEnded: function(event) {
        var containerId = event.slot.getSlotElementId();
        var containerEl = document.getElementById(containerId);

        /* START LB AND BILLBOARD RENDERRING */
        if (event.slot == this.immersive) {
            if (event.isEmpty) {
                let gamBillboard = googletag.defineOutOfPageSlot(this.gamBillboard, 'div-gpt-ad-bola-billboard-oop').addService(googletag.pubads());
                let gamTopfrm = googletag.defineOutOfPageSlot(this.gamTopFrame, "div-gpt-ad-bola-topfrm-oop").addService(googletag.pubads());
                let gamBottomfrm = googletag.defineSlot(this.gamBottomFrame, [[970, 90], [728, 90], [468, 60]], 'div-gpt-ad-bola-bottomfrm-oop').addService(googletag.pubads());

                /* EXCLUDE SKINAD IN TABLET */
                if (!this.gamIsTablet) {
                    gam_skinad = googletag.defineOutOfPageSlot(this.gamSkinad, "div-gpt-ad-bola-skinad-oop").addService(googletag.pubads());
                    googletag.pubads().refresh([gamBillboard, gamTopfrm, gamBottomfrm, gam_skinad]);
                } else {
                    googletag.pubads().refresh([gamBillboard, gamTopfrm, gamBottomfrm]);
                }

                /* STICKY BOTTOM FRAME TWEAK */
                document.querySelector("#div-gpt-ad-bola-bottomfrm-oop").style = "position: sticky; bottom: 0; z-index: 9999;";
            }
        }
        /* END LB AND BILLBOARD RENDERRING */

        if (containerEl !== null) {
            var iframeEl = containerEl.querySelectorAll('iframe')[0];

            /* it's delayed by 10 milliseconds, because iframe is not yet fully rendered
            and limited to max to 10 seconds to wait*/
            var timeoutFunction = function() {
                var src = "#" + containerId;
                /* `src` attribute is null, when iframe is FriendlyIframe, and
                 when it's present, then it's SafeFrame */
                if (iframeEl) {
                    if ((iframeEl.getAttribute('src') !== null)) {
                        src = iframeEl.getAttribute('src').replace(/#.*/, "") + src;
                    } else {
                        var name = iframeEl.getAttribute('name') + "#" + containerId;
                        iframeEl.setAttribute('name', name);
                    }
                    iframeEl.setAttribute('src', src);
                }
            };
            setTimeout(timeoutFunction, 10);
        }
    },
    /** ============ GPT EVENT LISTENER ============ */
    /** ============ TOOLS ============ */
    /** 
     * `showConsole` Logger for debuging
     * cookie key : gamlibLogger
     * cookie value : `true` ( display all gamlib console log ), `false` ( turn off all gamlib console log )
     * */
    pageLogger: {},
    set consoleToggle(stat) {
        document.cookie = `gamlibLogger=${stat}`;
    },
    /* Set console format msg : { text: Text, variable: Array } */
    set showConsole(msg) {
        this.pageLogger = msg;
    },
    /* Get console */
    get showConsole() {
        var getLog = document.cookie.split("gamlibLogger")[1] ? document.cookie.split("gamlibLogger")[1] : ';';
        var loggerCookies = getLog.split(';')[0].match(/(true)/ig) !== null ? true : false;
        if (loggerCookies) {
            console.log(this.pageLogger.text, this.pageLogger.variable);
        }
    },
    consoleLog: function(msg) {
        /* CONSOLE BLOCK */
        this.showConsole = msg;
        this.showConsole;
        /* CONSOLE BLOCK */
    },
    /** ============ TOOLS ============ */
    HeavyAdsResolver: class {
        constructor() {
            this.checkCount = 0;
            this.checkInterval = null;
            this.player = null;
            this.volumeButton = null;
            this.playButton = null;
            this.init();
        }

        init() {
            this.checkInterval = setInterval(() => this.checkForVideo(), 100);
        }

        checkForVideo() {
            this.checkCount++;
            const videoWrapper = document.querySelector("div[id^='kly-masthead-video-ouststream-'], div[id^='kly-masthead-desktop-video-ouststream-']");
            const videoFrame =  videoWrapper && videoWrapper.querySelector("iframe");
            if (videoWrapper && videoFrame) {
                this.setupPlayer(videoWrapper);
                clearInterval(this.checkInterval);
            } else if (this.checkCount > 500) {
                clearInterval(this.checkInterval);
            }
        }

        setupPlayer(videoWrapper) {
            const container = videoWrapper.querySelector("#video-wrapper");
            const uniqId = videoWrapper.id;
            const currentVideo = container.querySelector("iframe");
            const videoType = container.dataset.videoType;
            const videoId = container.dataset.videoId;


            switch (videoType) {
                case "youtube":
                    currentVideo.remove();
                    const playerDiv = document.createElement("div");
                    playerDiv.id = "youtube-player";
                    container.appendChild(playerDiv);
                    if (!window.YT || !YT.Player) {
                        const tag = document.createElement("script");
                        tag.src = "https://www.youtube.com/iframe_api";
                        document.body.appendChild(tag);
                    }

                    window.onYouTubeIframeAPIReady = () => {
                        this.player = new YT.Player("youtube-player", {
                            width: "320",
                            height: "180",
                            videoId: videoId,
                            playerVars: {
                                autoplay: 1,
                                mute: 1,
                                controls: 0,
                                playsinline: 1,
                                enablejsapi: 1,
                            },
                            events: {
                                onReady: (event) => this.onPlayerReady(event),
                            },
                        });
                    };
                    break;
                case "vidiocom":
                    const cloneIframe = currentVideo.cloneNode(true);
                    Object.entries({
                        src: videoId,
                        scrolling: 'no',
                        frameborder: '0',
                        width: '320',
                        height: '180',
                        id: 'embed-' + uniqId,
                        class: 'embed-vidiocom',
                        name: 'embed-' + uniqId
                    }).forEach(([k, v]) => cloneIframe.setAttribute(k, v));
                    currentVideo.remove();
                    container.querySelector("#player-wrapper").remove();
                    this.player = cloneIframe;
                    container.appendChild(cloneIframe);
                    break;
            }

        }

        onPlayerReady(event) {
            this.volumeButton = parent.document.querySelector("div#player-wrapper div#btn-volume");
            this.playButton = parent.document.querySelector("div#player-wrapper div#btn-play");

            this.volumeButton.addEventListener("click", () => this.volumeAction());
            this.playButton.addEventListener("click", () => this.playAction());
        }

        volumeAction(state) {
            const currentState = typeof state === "string" ?
                state :
                this.volumeButton.classList.contains("mute") ? "mute" : "unmute";

            if (currentState === "mute") {
                this.player.unMute();
                this.volumeButton.setAttribute("class", "unmute");
            } else {
                this.player.mute();
                this.volumeButton.setAttribute("class", "mute");
            }
        }

        playAction(state) {
            const currentState = typeof state === "string" ?
                state :
                this.playButton.classList.contains("play") ? "play" : "pause";

            if (currentState === "pause") {
                this.player.pauseVideo();
                this.playButton.setAttribute("class", "play");
            } else {
                this.player.playVideo();
                this.playButton.setAttribute("class", "pause");
            }
        }
    },
}

var elImmersiveContainer = document.createElement('div');
elImmersiveContainer.setAttribute('id', 'div-gpt-ad-bola-immersive-oop');
if (document.body.appendChild(elImmersiveContainer)) {
    googletag.cmd.push(function() {
        /*SET NEW BRAND SAFETY LOGIC*/
        GAMLibrary.pageBrandSafetyChecker();

        /* DEFINE IMMERSIVE TAG - DO NOT CHANGE THE SLOT ORDER, IMMERSIVE ALWAYS ON THE 1st POSITION - */
        window.GAMLibrary.immersive = googletag.defineOutOfPageSlot(GAMLibrary.gamImmersive, 'div-gpt-ad-bola-immersive-oop').addService(googletag.pubads());
        
        // Don. - Rollback to old GAM
        window.GAMLibrary.phbSlots = googletag.defineSlot(GAMLibrary.gamHalfpage1, [[300, 600], [300, 250], [160, 600]], 'div-gpt-ad-bola-sc1').addService(googletag.pubads());
        window.GAMLibrary.phbSlots = googletag.defineSlot(GAMLibrary.gamShowcase, [[300, 250], [250, 250]], 'div-gpt-ad-bola-sc2').addService(googletag.pubads());
        window.GAMLibrary.phbSlots = googletag.defineSlot(GAMLibrary.gamLeaderboard, [[970, 90], [728, 90], [970, 250]], 'div-gpt-ad-bola-lb').addService(googletag.pubads());
        
        window.GAMLibrary.balloon = googletag.defineOutOfPageSlot(GAMLibrary.gamBalloon, "div-gpt-ad-bola-lFloating-oop").addService(googletag.pubads());
        window.GAMLibrary.newstag1 = googletag.defineOutOfPageSlot(GAMLibrary.gamNewsTag1, "div-gpt-ad-bola-newsTag1-oop").addService(googletag.pubads());
        window.GAMLibrary.newstag2 = googletag.defineOutOfPageSlot(GAMLibrary.gamNewsTag2, "div-gpt-ad-bola-newsTag2-oop").addService(googletag.pubads());
        window.GAMLibrary.organicFeedCRM1 = googletag.defineOutOfPageSlot(GAMLibrary.gamOrganicFeedCRM1, 'div-gpt-ad-bola-crm1-oop').addService(googletag.pubads());
        window.GAMLibrary.organicFeedCRM2 = googletag.defineOutOfPageSlot(GAMLibrary.gamOrganicFeedCRM2, 'div-gpt-ad-bola-crm2-oop').addService(googletag.pubads());
        window.GAMLibrary.organicFeedCRM3 = googletag.defineOutOfPageSlot(GAMLibrary.gamOrganicFeedCRM3, 'div-gpt-ad-bola-crm3-oop').addService(googletag.pubads());

        window.GAMLibrary.pictureFirst = googletag.defineOutOfPageSlot(GAMLibrary.gamPictureFirst, 'div-gpt-ad-bola-picturefirst').addService(googletag.pubads());
      	window.GAMLibrary.widget = googletag.defineOutOfPageSlot(GAMLibrary.gamWidget, 'div-gpt-ad-bola-widget').addService(googletag.pubads());
      	/* INTERSTITIAL ADS */
        // window.GAMLibrary.interstitial = googletag.defineOutOfPageSlot(GAMLibrary.gamInterstitial, googletag.enums.OutOfPageFormat.INTERSTITIAL);
        // window.GAMLibrary.interstitial ? window.GAMLibrary.interstitial.addService(googletag.pubads()) : '';
        /* INTERSTITIAL ADS */

        if (kly.pageType !== "ReadPage") {
            window.GAMLibrary.headlineCRM = googletag.defineOutOfPageSlot(GAMLibrary.gamHeadlineCRM, 'div-gpt-ad-bola-crm-headline-oop').addService(googletag.pubads());
        } else {
            window.GAMLibrary.inreadnative = googletag.defineOutOfPageSlot(GAMLibrary.gamInreadNative, 'div-gpt-ad-bola-in-read-native').addService(googletag.pubads());
            window.GAMLibrary.slideup = googletag.defineSlot(GAMLibrary.gamSlideUp, [1, 1], 'div-gpt-ad-bola-mgid-inarticle').addService(googletag.pubads());
            window.GAMLibrary.insertion = googletag.defineSlot(GAMLibrary.gamInsertion, [1, 1], 'div-gpt-ad-bola-mgid-underarticle').addService(googletag.pubads());
            // window.GAMLibrary.insertion = googletag.defineOutOfPageSlot(GAMLibrary.gamInsertion, 'div-gpt-ad-bola-insertion-oop').addService(googletag.pubads());
        }

        if (kly.pageType === "ChannelPage" && kly.gtm.subCategory === "root") {
            window.GAMLibrary.advertHL1 = googletag.defineOutOfPageSlot(GAMLibrary.gamAdvertorialHL1, 'div-gpt-ad-bola-advertorial-headline1').addService(googletag.pubads());
            window.GAMLibrary.advertHL2 = googletag.defineOutOfPageSlot(GAMLibrary.gamAdvertorialHL2, 'div-gpt-ad-bola-advertorial-headline2').addService(googletag.pubads());
        }

        googletag.pubads().addEventListener('slotRenderEnded', GAMLibrary.gamSlotRenderEnded.bind(GAMLibrary));

        /*  START TARGETING BLOCK   */
        googletag.pubads().setTargeting("tags", GAMLibrary.pageTags);
        googletag.pubads().setTargeting("articleTitle", kly.gtm.articleTitle);
		googletag.pubads().setTargeting("articlePath", window.location.pathname);
        googletag.pubads().setTargeting("platform", kly.platform);
        googletag.pubads().setTargeting("type", kly.gtm.type);
        googletag.pubads().setTargeting("pageType", kly.pageType);
        googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
        googletag.pubads().setTargeting("audience", kly.gtm.audience ? kly.gtm.audience.split("|") : "false");
        googletag.pubads().setTargeting("isAdvertorial", typeof(isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" : isAdvertorial);
        googletag.pubads().setTargeting("isMultipage", typeof(isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage);
        googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
        googletag.pubads().setTargeting("pagingNum", typeof(pageParam = kly.gtm.pageParam && kly.gtm.pageParam.toString()) === "undefined" ? "false" : pageParam);
        googletag.pubads().setTargeting("site", kly.site);
        googletag.pubads().setTargeting("age", typeof(age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
        googletag.pubads().setTargeting("gender", typeof(gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
        googletag.pubads().setTargeting("subcategory", kly.gtm.subCategory);
        /*  END TARGETING BLOCK   */
        googletag.pubads().setCentering(true);
        googletag.pubads().enableSingleRequest();
        googletag.pubads().disableInitialLoad();
        googletag.enableServices();

        googletag.pubads().refresh([/*window.GAMLibrary.interstitial, */window.GAMLibrary.immersive,window.GAMLibrary.balloon, window.GAMLibrary.newstag1, window.GAMLibrary.newstag2, window.GAMLibrary.organicFeedCRM1, window.GAMLibrary.organicFeedCRM2, window.GAMLibrary.organicFeedCRM3, window.GAMLibrary.pictureFirst, window.GAMLibrary.widget]);

        if (kly.pageType !== "ReadPage") {
            googletag.pubads().refresh([window.GAMLibrary.headlineCRM]);
        } else {
            googletag.pubads().refresh([window.GAMLibrary.inreadnative, window.GAMLibrary.insertion, window.GAMLibrary.slideup]);
        }

        if (kly.pageType === "ChannelPage" && kly.gtm.subCategory === "root") {
            googletag.pubads().refresh([window.GAMLibrary.advertHL1, window.GAMLibrary.advertHL2]);
        }
      
        GAMLibrary.bfInjectStyle();
    });
    // /* INITIATE PREBID */ Don. - remove
    GAMLibrary.prebidInstantiate();
}

/** GET MESSAGE FROM SAFEFRAME CONTAINER */
GAMLibrary.onMessageReceivedGPTUpdateCreativeStyle();
/** GET MESSAGE FROM SAFEFRAME CONTAINER */

var HeavyAdsResolver = new GAMLibrary.HeavyAdsResolver();
