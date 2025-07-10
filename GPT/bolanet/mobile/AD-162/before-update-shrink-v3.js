[%REMOVE_ADSENSE%]
/** 
 * GAM KLY V6 - m.bola.net
 * Prefix Detail :
 * fp : Floating Pin
 * sc : Showcase
 * exp : Exposer
 * hl : Headline
 * bf : Bottomframe
 * tf : Topframe
 * gfn : Global Function
 * prebid : Prebid - remove
 * Copyright 2025
 * Author: Ads Tech KLY
 * All Rights Reserved.
 */

var googletag = googletag || {};
var pbjs = pbjs || {};
var pageKlyObj = typeof window.kly !== 'undefined' ? window.kly : window.kmklabs;
pbjs.que = pbjs.que || [];
googletag.cmd = googletag.cmd || [];

window.GAMLibrary = {};
window.GAMLibrary = {
    gamHeadline: '/36504930/KLY/MOBILE/BOLA.NET/HEADLINE',
    gamBottomframe: '/36504930/KLY/MOBILE/BOLA.NET/BOTTOM_FRAME',
    gamFloatingPin: '/36504930/KLY/MOBILE/BOLA.NET/FLOATING_PIN',
    gamTopframe: '/36504930/KLY/MOBILE/BOLA.NET/MASTHEAD',
    gamExposer1: '/36504930/KLY/MOBILE/BOLA.NET/EXPOSER',
    gamShowcase: '/36504930/KLY/MOBILE/BOLA.NET/SHOWCASE',
    gamInterstitial: '/36504930/KLY/MOBILE/BOLA.NET/INTERSTITIAL',
    pageIsReadPage: (pageKlyObj.pageType && pageKlyObj.pageType.search(/(readpage)/ig)) > -1,
    pageTags: [""],
    pageArticleType: {
        "TextTypeArticle": {
            'scroll': 50
        },
        "VideoGallery": {
            'scroll': 50
        },
        "PhotoGallery": {
            'scroll': 0
        },
        "default": {
            'scroll': 50
        },
    },
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
    gfnOnDomContentLoaded: function() {
        this.tfInitSticky();
        this.insertPictureFirst();
        this.expInterscrollerStyle();
        visualViewport.addEventListener('resize', () => {
            this.tfSetDeviceOrientation = visualViewport.height > visualViewport.width ? true : false;
        });
        this.scFlyingCarpetStyle();
        this.feedboardAdsInject();
    },
    generatedScrollBF: 0, // Flags for balancing between headline, bottomframe 
    generatedScrollFP: 0,
    pageBrandSafetyChecker: function() {
        var articlePages = pageKlyObj && pageKlyObj.article,
            isMatcont = "0",
            isViolateBrandSafety = "0",
            /** POPULATE META DATA */
            bsKeyword = [],
            pageTitle = articlePages && this.gfnFilterString(articlePages.title, ' '),
            pageTitles = (typeof pageTitle !== 'undefined') ? pageTitle : '',
            pageKeyword = this.pageDocumentMeta("keywords"),
            pageDesc = this.pageDocumentMeta("description"),
            pageTag = pageKlyObj.gtm.tag || pageKlyObj.tag && pageKlyObj.tag.name;

        this.pageTags = typeof pageTag === 'undefined' ? [] : this.gfnFilterString(pageTag.replace(/[^A-Za-z0-9|\- ]/ig, ""), "|");

        const BS_KEYWORD_LIST = {
            [%brandSafetyKeyword%]
        };

        /*change this acording to the site page layout*/
        var siteContentObject = document.getElementsByClassName("detail-body");
        var siteContentText = "";

        if (siteContentObject.length) {
            siteContentText = siteContentObject[0].innerText;

            /*removing BACA JUGA box since it unrelated with main content*/
            /*change this acording to the site page layout*/
            var bacaJugaElements = siteContentObject[0].getElementsByClassName("detail__terkait");
            for (var i in bacaJugaElements) {
                bacajuga = bacaJugaElements[i].innerText;
                siteContentText = siteContentText.replace(bacajuga, '');
            }
        }
        siteContentText = pageKeyword.concat(pageTitles, ' ', pageDesc, ' ', this.pageTags, ' ', siteContentText);

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
            /** filter only correct origin and setStyle or setHlStickyActive command */
            if (!(e.origin.match(/safeframe.googlesyndication.com/ig)) || typeof e.data !== 'object' || typeof e.data.id !== 'string' || typeof e.data.params !== 'object') {
                if (e.data.cmd !== 'setStyle' && e.data.cmd !== 'setHlStickyActive') {
                    return;
                }
            }

            /** execute actions based on the command type */
            if (e.data.cmd === 'setStyle' && typeof e.data.params === 'object') {
                /* remove # character from id, we don't use jquery */
                var elementId = e.data.id.replace(/#/, "");

                var wrapperEl = document.getElementById(elementId);
                if (wrapperEl === null) {
                    return;
                }

                var elements = [wrapperEl];
                /* target on KLY authorized element child (div and iframe) */
                if (typeof e.data.query === 'string' && e.data.query) {
                    let el = null;
                    if (el = e.data.query.match(/(div|iframe)/ig)) {
                        elements = wrapperEl.querySelectorAll(el.join(", "));
                    }
                }

                /** target on KLY authorized attribute (display, height, width) */
                elements.forEach(function(element) {
                    Object.keys(e.data.params).forEach(function(param) {
                        let allowedAttr = ['display', 'height', 'width'];
                        allowedAttr.indexOf(param) > -1 ? (element.style[param] = e.data.params[param]) : '';
                    });
                });
            } else if (e.data.cmd === 'setHlStickyActive') {
                /** set hlStickyActive parameter in GAMLibrary to true */
                if (typeof GAMLibrary !== 'undefined') {
                    GAMLibrary.hlStickyActive = true;
                    window.addEventListener("scroll", GAMLibrary.hlBindScrollEvent);
                }
            }
        }
        ;

        /** add event listener to receive messages */
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
    insertPictureFirst: function() {
        const hcPictureFirstElement = document.querySelector("#div-gpt-ad-bola-picturefirst");
        hcPictureFirstElement && hcPictureFirstElement.remove();
        
        var pictureFirstElement = document.createElement("div")
        pictureFirstElement.setAttribute("id", "div-gpt-ad-bola-picturefirst")
        pictureFirstElement.setAttribute("data-info", "ad")

        var pictureFirstScriptElement = document.createElement("script")
        pictureFirstScriptElement.textContent = `googletag.cmd.push(function() { googletag.display('div-gpt-ad-bola-picturefirst'); });`
        pictureFirstElement.appendChild(pictureFirstScriptElement)

        var boxtag = document.querySelector(".box-tag"),
            footer = document.querySelector("div.footer"),
            tbox = document.querySelector("div.trending-box"),
            pictureFirstTargetElement = (kly.pageType.toLowerCase() != 'readpage') ? ( tbox ? tbox : footer ) : boxtag;
        if (pictureFirstTargetElement) {
            if("footer" !== pictureFirstTargetElement.className){
                pictureFirstTargetElement.parentElement.insertBefore(pictureFirstElement, pictureFirstTargetElement.nextElementSibling)
            }else{
                pictureFirstTargetElement.insertAdjacentElement("beforebegin",pictureFirstElement);
            }
            
        };

        this.consoleLog({
            'text': 'insertPictureFirst IN this.gfnOnDomContentLoaded',
            'variable': []
        });
    },
    createDMPTracker: function(adsCatList, dfpTracker, macro) {
        window.open(dfpTracker, '_blank');
    },
    /** ============ PREBID ============ */
    prebidInstantiate: function(params) {
        // create an array for header bidding gpt slots
        this.prebidHeaderBiddingSlots = [];
        var headerBiddingSlots = this.prebidHeaderBiddingSlots;
        var failsafeTimeout = 3000;
        var hbSlotsCount = 0;

        if (params !== undefined) {
            this.prebidHeaderBiddingSlots.push(params);
        }

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

    /** ============ BOTTOM FRAME ============ */
    bfDefinedAdunit: null,
    set definedBf(definedAdunit) {
        this.bfDefinedAdunit = definedAdunit;
    },
    get definedBf() {
        return this.bfDefinedAdunit;
    },
    bfSetInterval: function(active = true, intervalTime = 60000) {
        if (!active) {
            clearInterval(this.gamBFInterval);
            return;
        }
        if (this.gamBFInterval) {
            clearInterval(this.gamBFInterval);
        }
        this.gamBFInterval = setInterval(function() {
            document.querySelector("#dfp-bframe-cont").style.display = "block";
            document.querySelector("#dfp-spinads") && document.querySelector("#dfp-spinads").parentElement.remove();
            // googletag.pubads().refresh([this.refreshSlot]);
            /** Init prebid  */
            this.prebidInstantiate(this.refreshSlot);
            typeof SPAFreezeBody == 'function' ? SPAFreezeBody(false) : '';
        }.bind(this), intervalTime);
    },
    bfSetButtonClose: function() {
        let buttonCloseBframeClick = document.createElement("a");
        buttonCloseBframeClick.setAttribute("href", "#");
        buttonCloseBframeClick.setAttribute("id", "dfp-bframe-close");
        buttonCloseBframeClick.setAttribute("onclick", "document.getElementById('dfp-bframe-cont').style.display='none'; return false;");
        buttonCloseBframeClick.setAttribute("style", "width: 20px; position: absolute; margin-left: 150px; top: -22px; z-index: 999999;");
        let buttonCloseBframeImg = document.createElement("img");
        buttonCloseBframeImg.setAttribute("src", "https://cdns.klimg.com/d.kapanlaginetwork.com/banner/preview/2019/08/20/close.png");
        buttonCloseBframeImg.setAttribute("style", "width: 20px; border: none;");
        buttonCloseBframeClick.appendChild(buttonCloseBframeImg);
        let checkBframeContainer = setInterval(function() {
            if (document.querySelector("#dfp-bframe-cont") !== null) {
                document.querySelector("#dfp-bframe-cont").style.textAlign = "center";
                document.querySelector("#dfp-bframe-cont").insertAdjacentElement("afterBegin", buttonCloseBframeClick);
                clearInterval(checkBframeContainer);
            }
        }, 500);
    },
    bfOnScroll: function() {
        this.scroll = function() {
            var scrollNode = document.scrollingElement || document.documentElement;
            var scrollTop = scrollNode.scrollTop;
            var pageType = pageKlyObj.gtm.type == '' ? 'default' : pageKlyObj.gtm.type;

            if (scrollTop >= this.pageArticleType[pageType].scroll) {
                if (!this.definedBf) {
                    this.definedBf = googletag.defineSlot(this.gamBottomframe, [
                        [320, 50],
                        [320, 100]
                    ], 'div-gpt-ad-bola-bottomfrm').addService(googletag.pubads());

                    // googletag.pubads().refresh([this.definedBf]);
                    /** Init prebid  */
                    this.prebidInstantiate(this.definedBf);

                    this.refreshSlot = this.definedBf;
                    this.bfSetInterval();
                    this.bfSetButtonClose();
                } else {
                    window.removeEventListener("scroll", this.scrollHandler);
                }
            }
        };
        this.scrollHandler = this.scroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler);
    },
    /* Balancing between masthead, bottomframe and floating pin */
    intervalBalancingAds: function() {
        const renderBF = function() {
                if (!this.definedBf) {
                    this.definedBf = googletag.defineSlot(this.gamBottomframe, [
                        [320, 50],
                        [320, 100]
                    ], 'div-gpt-ad-bola-bottomfrm').addService(googletag.pubads());

                    // googletag.pubads().refresh([this.definedBf]);
                    /** Init prebid  */
                    this.prebidInstantiate(this.definedBf);

                    this.refreshSlot = this.definedBf;
                    this.bfSetInterval();
                    this.bfSetButtonClose();
                    clearInterval(bfInterval);
                }
            }
            .bind(this);
        const isElementCoveredBy50Percent = function(target, samples = 25) {
            const rect = target.getBoundingClientRect();
            const stepX = rect.width / Math.sqrt(samples);
            const stepY = rect.height / Math.sqrt(samples);
    
            let covered = 0,
                total = 0;
    
            for (let y = rect.top + stepY / 2; y < rect.bottom; y += stepY) {
                for (let x = rect.left + stepX / 2; x < rect.right; x += stepX) {
                    total++;
                    const el = document.elementFromPoint(x, y);
                    if (el && el !== target && !target.contains(el)) {
                        covered++;
                    }
                }
            }
    
            return covered / total >= 0.5;
        }
        const bfInterval = setInterval(function() {
                const tfIframe = document.querySelector('#div-gpt-ad-topfrm-parallax-wrapper iframe');
                const mastheadContainer = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper div[data-google-query-id], .gpt-ads.masthead div[data-google-query-id]");
                const noMastheadReq = mastheadContainer && mastheadContainer.style.display === 'none';
    
                // If no Masthead Request
                if (noMastheadReq) {
                    renderBF();
                    this.fpOnScroll();
                    return;
                }
    
                // if using regular masthead
                if (!this.tfSticky) {
                    if (tfIframe && isElementCoveredBy50Percent(tfIframe)) {
                        renderBF();
                        this.fpOnScroll();
                    }
                    return;
                }
    
                // if using shrinking masthead in the end of sticky
                if (this.tfStickyIsEnd) {
                    renderBF();
                    this.fpOnScroll();
                }
    
            }
            .bind(this), 100);
    },
    /** ============ BOTTOM FRAME ============ */

    /** ============ FLOATING PIN ============ */
    fpDefinedAdunit: null, // Floating Pin Defined Object
    fpOnScroll: function() {
        this.scroll = function() {
            var scrollNode = document.scrollingElement || document.documentElement;
            var scrollTop = scrollNode.scrollTop;
            var pageType = kly.gtm.type == '' ? 'default' : kly.gtm.type;
            // if (scrollTop >= this.pageArticleType[pageType].scroll) {
            if (scrollTop >= 1000) {
                if (!this.fpDefinedAdunit) {
                    // this.fpDefinedAdunit = googletag.defineSlot(this.gamFloatingPin, [[1, 1], ['fluid']], 'div-gpt-ad-bola-floating-pin').addService(googletag.pubads());
                    this.fpDefinedAdunit = googletag.defineOutOfPageSlot(this.gamFloatingPin, 'div-gpt-ad-bola-floating-pin').addService(googletag.pubads());
                    googletag.pubads().refresh([this.fpDefinedAdunit]);
                } else {
                    window.removeEventListener("scroll", this.scrollHandler);
                }
            }
        };
        this.scrollHandler = this.scroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler);
    },
    /** ============ FLOATING PIN ============ */

    /** ============ SHOWCASE ============ */
    scDefinedAdunit: null,
    set definedSc(definedAdunit) {
        this.scDefinedAdunit = definedAdunit;
    },
    get definedSc() {
        return this.scDefinedAdunit;
    },
    scInPaging: function() {
        var countFinder = 0;
        var findPlaceholder = setInterval(function() {
            var placeholderElement = document.querySelectorAll("#div-gpt-ad-sc-paging-placeholder");

            if (placeholderElement) {
                const OPTIONS = {
                    rootMargin: '50px 0px 55%'
                };
                placeholderElement.forEach((placeholder, index) => {
                    let containerID = "div-gpt-ad-bola-sc-" + (index + 1);
                    let containerSCArticle = document.createElement('div');
                    containerSCArticle.setAttribute("id", containerID);
                    containerSCArticle.setAttribute('class', 'article-ad');
                    placeholder.insertAdjacentElement("beforeEnd", containerSCArticle);
                })
                const OBSERVER = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        const intersecting = entry.isIntersecting;
                        if (entry.isIntersecting) {
                            if (this.definedSc = googletag.defineSlot('/36504930/KLY/MOBILE/BOLA.NET/SHOWCASE', [
                                    [300, 600],
                                    [300, 250],
                                    [250, 250],
                                    [200, 200]
                                ], entry.target.id)) {
                                this.definedSc.addService(googletag.pubads());
                                /** Init prebid  */
                                this.prebidInstantiate(this.definedSc);
                                // googletag.pubads().refresh([this.definedSc]);
                            }

                            OBSERVER.unobserve(entry.target)
                        }
                    })
                }, OPTIONS)
                document.querySelectorAll("div[id^='div-gpt-ad-bola-sc-']").forEach(function(el, idx) {
                    OBSERVER.observe(el);
                });

                clearInterval(findPlaceholder);
            }
            if (countFinder > 10) {
                clearInterval(findPlaceholder);
            }
            countFinder++;
        }.bind(this), 300);
    },
    scFlyingCarpetEffect: function(event) {
        var _domId_ = event.slot.getSlotId().getDomId();

        var _domTarget_ = document.getElementById(_domId_)
        var _is300x600_ = JSON.stringify(event.size) == '[300,600]'
        if (_is300x600_ && _domId_.includes("sc")) {
            _domTarget_.classList.add("flying-carpet")
            _domTarget_.querySelector("div").classList.add("ad-content")
        }
    },
    scFlyingCarpetStyle: function() {
        var flyingCarpetStyle = document.createElement("style");
        flyingCarpetStyle.textContent = `.advertisement-placeholder div[id*="bola-sc"].flying-carpet{ position: relative; clear: both; overflow: hidden; clip-path: polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%) !important; min-height: 270px; width: 100%; display: flex; justify-content: center; } .advertisement-placeholder div[id*="bola-sc"].flying-carpet .ad-content { top: 50%; transform: translateY(-50%); position: fixed; z-index: 2; } div#div-gpt-ad-sc-placeholder { min-width: 320px; }`;
        document.querySelector("body").appendChild(flyingCarpetStyle);

        this.consoleLog({
            'text': 'scFlyingCarpetStyle IN this.gfnOnDomContentLoaded',
            'variable': []
        });
    },
    /** ============ SHOWCASE ============ */

    /** ============ EXPOSER ============ */
    expInterscroller: function(event) {
        var _domId_ = event.slot.getSlotId().getDomId();
        var _domTarget_ = document.getElementById(_domId_)
        var _is300x250_ = JSON.stringify(event.size) == '[300,250]'
        if (_is300x250_ && _domId_.includes("exposer")) {
            _domTarget_.classList.add("interscroller");

            if (_domTarget_.parentElement.id.includes("placeholder")) {
                _domTarget_.parentElement.classList.add("interscroller-wrapper");
            }
        }
    },
    expInterscrollerStyle: function() {
        var interscrollerStyle = document.createElement("style");
        interscrollerStyle.textContent = "body{overflow: unset;} .interscroller-wrapper{display: block !important;} .interscroller{position: sticky !important; top: 160px;}";
        document.head.appendChild(interscrollerStyle);
        document.querySelector("body").appendChild(interscrollerStyle);
        this.consoleLog({
            'text': 'expInterscrollerStyle IN this.gfnOnDomContentLoaded',
            'variable': []
        });
    },
    /** ============ EXPOSER ============ */

    /** ============ HEADLINE ============ */
    hlStickyActive: false,
    hlDefinedAdunit: null,
    hlIsSticky: false,
    hlStickyIsPaused: false,
    hlStickyCounterStatus: false,
    hlStickyInterval: 7,
    get hlDecreamentStickyInterval() {
        this.hlStickyInterval--;
    },
    set hlSetStickyInterval(intr) {
        this.hlStickyInterval = intr;
    },
    get hlGetStickyInterval() {
        return this.hlStickyInterval;
    },
    hlInitiate: function() {
        let isTFShrinking = null;
        let catchHLContainer = 0;
        let hlStickyStyle = document.createElement("style");

        /** Set Sticky Headline Style */
        hlStickyStyle.textContent = "\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 5px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t.headline_ad__box {display: flex;justify-content: center;align-items: center;}\n\t\t#div-gpt-ad-bola-hl iframe {max-width: 100vw;}";
        document.head.appendChild(hlStickyStyle)

        /** Check If Headline container already exists */
        let hlContainerCheck = setInterval(function() {
            catchHLContainer += 1;
            if (document.getElementById("div-gpt-ad-bola-hl") !== null) {
                isTFShrinking = setInterval(function() {
                    /** inject headline after receive after sticky end  */
                    if (this.tfStickyIsEnd) {
                        this.hlInjectElement();
                        clearInterval(isTFShrinking);
                    }
                }.bind(this), 10);
                clearInterval(hlContainerCheck);
            } else {
                if (catchHLContainer === 30) { // stop searching if it's reach 30
                    clearInterval(hlContainerCheck);
                }
            }
        }.bind(this), 10);
    },
    hlInjectElement: function() {
        let hlStickyStyle = document.createElement("style");
        this.hlBindScrollEvent = this.hlStickyScrollEvent.bind(this);

        /** Set Sticky Headline Style */
        hlStickyStyle.textContent = "\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 5px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t.headline_ad__box {display: flex;justify-content: center;align-items: center;}\n\t\t#div-gpt-ad-bola-hl iframe {max-width: 100vw;}";
        document.head.appendChild(hlStickyStyle)

        /** Set headline element sticky on event scroll */
        window.addEventListener("scroll", this.hlBindScrollEvent)
        this.hlRender;
    },
    get hlRender() {
        if (!this.hlDefinedAdunit) {
            this.hlDefinedAdunit = googletag.defineSlot(GAMLibrary.gamHeadline, [320, 100], 'div-gpt-ad-bola-hl').addService(googletag.pubads());
            // googletag.pubads().refresh([this.hlDefinedAdunit]);
            /** Init prebid  */
            this.prebidInstantiate(this.hlDefinedAdunit);
        }
        return this.hlDefinedAdunit;
    },
    hlStickyScrollEvent: function() {
        var hlFirstChild = document.getElementById("div-gpt-ad-bola-hl").firstElementChild,
            hlContainerTop = document.getElementById("div-gpt-ad-bola-hl").getBoundingClientRect().top;

        this.hlRender
      
        if (!GAMLibrary.hlStickyActive) {
            window.removeEventListener("scroll", this.hlBindScrollEvent);
            return;
        }

        if (this.hlIsSticky) {
            if (0 >= hlContainerTop) {
                hlFirstChild.classList.add("hl-navbar-hanging")
                this.hlStickyIsPaused = false
            } else {
                hlFirstChild.classList.remove("hl-active-sticky")
                hlFirstChild.classList.remove("hl-navbar-hanging")
                this.hlStickyIsPaused = true
                this.hlIsSticky = false
            }
        } else {
            if (0 >= hlContainerTop) {
                if (hlFirstChild !== null) {
                    hlFirstChild.classList.add("hl-active-sticky");
                    if (!this.hlStickyCounterStatus) {
                        this.hlStickyCounterStatus = true;
                        this.hlUnsetSticky(hlFirstChild, false);
                    }
                    this.hlIsSticky = true
                }
            }
        }

        this.consoleLog({
            'text': 'this.hlIsSticky | hlStickyCounterStatus | this.hlGetStickyInterval | hlContainerTop | hlFirstChild',
            'variable': [this.hlIsSticky, this.hlStickyCounterStatus, this.hlGetStickyInterval, hlContainerTop, hlFirstChild],
        });

    },
    hlUnsetSticky: function(hlChild, hlForceClose) {
        let interval = 7;
        let urlParams = new URLSearchParams(window.location.search);
        this.hlSetStickyInterval = (interval = JSON.parse(urlParams.get('interval'))) == null ? 7 : interval;
        var stickyInterval = setInterval(function() {
            if (!this.hlStickyIsPaused) {
                if (0 >= this.hlGetStickyInterval) {
                    hlChild.classList.remove("hl-active-sticky");
                    hlChild.classList.remove("hl-navbar-hanging");
                    hlChild.style.margin = "10px 0";
                    window.removeEventListener("scroll", this.hlBindScrollEvent)
                    clearInterval(stickyInterval);

                } else {
                    this.hlDecreamentStickyInterval;
                }
            }
        }.bind(this), 1e3);

        if (!this.hlStickyIsPaused && hlForceClose) {
            clearInterval(stickyInterval);
            hlChild.classList.remove("hl-active-sticky");
            hlChild.classList.remove("hl-navbar-hanging");
        }
    },
    /** ============ HEADLINE ============ */

    /* ============ IN-IMAGE ============ */
    inImageAdsInject: function() {
        let inImageArticleItems = document.querySelectorAll(".detail-body .infinite-box");
        let inImageTargetWrapper, inImageTargetTitle, inImageTargetImage;

        for (let i = 0; i < inImageArticleItems.length; i++) {
            inImageTargetWrapper = inImageArticleItems[i];
            inImageTargetTitle = inImageTargetWrapper?.querySelector("h2");
            inImageTargetImage = inImageTargetWrapper?.querySelector("img.lazy_loaded");
            if (inImageTargetImage) {
                break;
            }
        }

        let checks = [inImageTargetWrapper, inImageTargetTitle, inImageTargetImage];
        if (checks.some(check => check == null)) return;

        let inImageElement = document.createElement("div")
        let inImageStyle = document.createElement("style")
        inImageElement.setAttribute("id", "in-image-ads")
        inImageElement.innerHTML = `
        <div class="banner-wrapper-in-image">
            <div class="in-image-ads-close">
                <img src="https://cdns.klimg.com/d.kapanlaginetwork.com/banner/preview/2019/08/20/close.png">
            </div>
            <div id='div-gpt-ad-bola-inimage' style='height:auto; width:320px;' data-info='ad'></div>
        </div>
        `

        inImageStyle.textContent = `div#in-image-ads { position: absolute; width: 100%; height: auto; top: 0px; background: transparent; transition: all .5s ease; overflow: hidden; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: 10; } div#in-image-ads.in-image { overflow: hidden; } div#in-image-ads::after { content: ""; width: 100%; height: auto; position: absolute; aspect-ratio: ${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}; z-index: -1; bottom: 0; opacity: 0; background: linear-gradient(0deg, black, transparent); transition: all .5s ease 2.2s; } div#in-image-ads.active::after {opacity: 1;} div#in-image-ads.lr div#div-gpt-ad-bola-inimage { transform: scale(${(inImageTargetImage.clientHeight / 280 > 1) ? 1 : inImageTargetImage.clientHeight / 280}); transform-origin: bottom; width: 100% !important;} div#in-image-ads.active { animation: dimOverlay 2.5s ease forwards; } @keyframes dimOverlay { 0% { background: transparent; } 70% { background: #00000099; } 100% { background: transparent; } } .banner-wrapper-in-image { width: 100%; height: auto; position: absolute; bottom: -150%; transition: all 2s ease; display: flex; justify-content: center; } div#in-image-ads.active .banner-wrapper-in-image { bottom: 0px; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close img { width: 100%; } div#in-image-ads.active .banner-wrapper-in-image .in-image-ads-close { opacity: 1; } div#in-image-ads .banner-wrapper-in-image .in-image-ads-close { opacity: 0; position: absolute; left: 50%; top: -25px; width: 25px; height: 25px; transform: translateX(147.5px); } div#in-image-ads.lr .in-image-ads-close { display: none; }`
        inImageTargetImage.parentElement.appendChild(inImageElement)
        inImageTargetImage.parentElement.appendChild(inImageStyle)
        inImageTargetImage.parentElement.style.position = 'relative';

        this.inImageAdsActive();
    },
    inImageAdsActive: function() {
        this.inImageAds = googletag.defineSlot('/36504930/KLY/MOBILE/BOLA.NET/IN-IMAGE', [[320, 50], [320, 100], [1, 1]], 'div-gpt-ad-bola-inimage').addService(googletag.pubads());
        window.addEventListener('scroll', this.inImageAdsScrollevent)
    },
    inImageAdsScrollevent: function() {
        let inImageAds = document.querySelector("#in-image-ads")
        let inImageAdsClose = document.querySelector("#in-image-ads .in-image-ads-close");

        let isInViewport = GAMLibrary.inImageElementOnviewPort(inImageAds)
        if (isInViewport) {
            googletag.pubads().refresh([GAMLibrary.inImageAds]);
            window.removeEventListener('scroll', GAMLibrary.inImageAdsScrollevent)
            setTimeout(function() {
                inImageAds.classList.add("active")
            }, 500)
        }

        inImageAdsClose.addEventListener("click", function() {
            inImageAds.classList.remove("active")
        })
    },
    inImageElementOnviewPort: function(el) {
        let rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight / 3 * 2 || document.documentElement.clientHeight / 3 * 2));
    },
    /* ============ IN-IMAGE ============ */

    /** ============= MASTHEAD ============= */
    tfIsFixedSized: 1, // Topframe Flags between OOP and Fixed size 
    tfAdsVisible: {
        "topframe": false,
        "topframeClassTweak": false,
        "topframeScrollBackToTop": false,
    },
    tfParentBodyTarget: null,
    tfParentWrapper: null,
    tfWrapper: null,
    tfSticky: false,
    tfStickyIsEnd: false,
    tfStickyLastScroll: 0,
    tfStickyLastScrollEnd: 0,
    tfStickyScrollSpeed: 10,
    tfStickyCountDownV2: 0,
    tfStickyTimer: 10,
    tfStickyIsReady: false,
    tfStickyAdunitTarget: "#div-gpt-ad-bola-topfrm-oop",
    tfStickyType: null,
    tfIsTurnOff: false,
    tfDeviceOrientation: window.matchMedia("(orientation: portrait)").matches,
    tfStickyCustomStyleElement: document.createElement("style"),
    /* TOPFRAME SHIRNKING */
    tfChildElement: [],
    tfPageNavbar: null,
    tfPageMain: null,
    /**
     * @param {boolean} ori
     */
    set tfSetDeviceOrientation(ori) {
        this.tfDeviceOrientation = ori;
    },
    get tfGetDeviceOrientation() {
        return this.tfDeviceOrientation;
    },
    get tfDecreamentStickyTimer() {
        this.tfStickyTimer--;
    },
    get tfIncreamentStickyCountDownV2() {
        this.tfStickyCountDownV2++;
    },
    get tfIsSticky() {
        return this.tfSticky;
    },
    set tfIsSticky(value) {
        this.tfSticky = value;
    },
    /*To get all method and property inside GAMLibrary always bind 'this' object to all events*/
    tfInitSticky: function() {
        this.tfGetTargets();
        this.tfParentWrapper = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
        this.tfWrapper = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
        this.tfParentBodyTarget.style = '';
        this.tfBindStickyScroll = this.tfStickyScroll.bind(this);
        document.addEventListener("scroll", this.tfBindStickyScroll);
        window.addEventListener("orientationchange", this.tfOrientationChange.bind(this));
        this.tfStickyIsReady = true;
        this.consoleLog({
            'text': 'tfInitSticky IN this.gfnOnDomContentLoaded',
            'variable': []
        });

    },
    tfOrientationChange: function() {
        if (!this.tfGetDeviceOrientation) {
            return;
        }
        this.tfIsTurnOff = true;
        this.tfUnsetSticky();
    },
    tfGetTargets: function() {
        let parentType1 = document.querySelector(".a2");
        let parentType2 = document.querySelector(".main");
        let childs = document.querySelectorAll(".rm01");
        let customContainer = document.createElement('div');

        childs && childs.forEach(el => {
            if (el.parentElement.tagName == 'BODY') {
                this.tfChildElement.push(el);
                if (el.nextElementSibling.classList.length == 0) {
                    this.tfChildElement.push(el.nextElementSibling);
                }
            }
        });
        if (parentType1) {
            this.tfPageNavbar = document.querySelector("#main_top");
            if (this.tfPageNavbar) {
                customContainer.classList.add('ads-container');
                this.tfPageNavbar.insertAdjacentElement('beforebegin', customContainer);
                this.tfPageMain = parentType1;
            }
        } else if (parentType2) {
            this.tfPageNavbar = document.querySelector(".header");
            if (this.tfPageNavbar) {
                customContainer.classList.add('a2');
                this.tfPageNavbar.insertAdjacentElement('beforebegin', customContainer);
            }
        } else {
            this.tfPageNavbar = document.querySelector("#main_top");
            if (this.tfPageNavbar) {
                customContainer.classList.add('a2');
                this.tfPageNavbar.insertAdjacentElement('beforebegin', customContainer);
            }
        }
        this.tfParentBodyTarget = customContainer;
    },
    tfStickyScroll: function() {
        var scrollTop = document.documentElement.scrollTop;
        if (scrollTop >= 0 && "v7" == this.tfStickyType) {
            if (this.tfIsSticky) {
                this.tfStickyTweak();
                this.tfStickyStyle();

                this.tfIsSticky = false;
                this.tfParentWrapper.classList.add("sticky");
                this.tfWrapper.classList.add("sticky");

                this.tfStickyCountDown();
                /* tfBindStickyScroll is bind method from tfStickyScroll */
                document.removeEventListener("scroll", this.tfBindStickyScroll);
                this.tfParentBodyTarget.classList.add("topframe_is_sticky");
            }
        }

        if (!this.tfStickyIsEnd) {
            this.tfStickyLastScrollEnd = this.tfStickyLastScroll + (scrollTop / (this.tfStickyScrollSpeed / 4));
            document.querySelector('.topframe_is_sticky') && (document.querySelector('.topframe_is_sticky').style.transform = 'translateY(' + -(this.tfStickyLastScrollEnd) + 'px)');
        }
    },
    tfUnsetSticky: function() {

        document.removeEventListener("scroll", this.tfBindStickyScroll);

        this.tfStickyIsEnd = true;
        this.tfStickyCustomStyleElement.remove();
        if (this.tfParentWrapper !== null) {
            this.tfParentWrapper.classList.remove("sticky");
        }
        if (this.tfWrapper !== null) {
            this.tfWrapper.classList.remove("sticky");
        }

        this.tfParentBodyTarget.classList.remove("topframe_is_sticky");

        setTimeout(function() {
            document.querySelector("body").style = '';
            this.tfParentBodyTarget.style = '';
            if (this.tfParentWrapper !== null) {
                this.tfParentWrapper.style = '';
            }
            /*document.documentElement.scrollTo(0, this.tfStickyLastScrollEnd);*/
        }.bind(this), 200);
    },
    tfStickyCountDown: function() {
        this.tfStickyLastScroll = document.documentElement.scrollTop;
        var tfStickyCounter = document.querySelector(".topframe-sticky-counter");
        var countdown = setInterval(function() {

            tfStickyCounter.textContent = 'Penawaran sponsor berakhir setelah ( ' + this.tfStickyTimer + ' )';
            if (this.tfStickyTimer <= 0 || this.tfIsTurnOff) {
                this.tfParentWrapper.style.top = '-100vh';
                this.tfParentWrapper.style.transition = 'top .5s ease';

                setTimeout(function() {
                    this.tfUnsetSticky();
                }.bind(this), 700);
                clearInterval(countdown);
                tfStickyCounter.remove();
            }
            this.tfDecreamentStickyTimer;
        }.bind(this), 1000);
    },
    tfStickyStyle: function() {
        var parElement = document.createElement("p");
        parElement.classList.add("topframe-sticky-counter");
        parElement.textContent = "Penawaran sponsor berakhir setelah (7)";
        this.tfParentWrapper.appendChild(parElement)
        var bodyClientHeight = document.querySelector("body").clientHeight;
        this.tfStickyCustomStyleElement.textContent = `
   body {
   height: ${(bodyClientHeight * 20)}px;
   scroll-behavior: smooth;
   width: 100vw
   }
   
   .topframe_is_sticky::before {
   content: "";
   position: relative;
   height: 110.41666666666667vw !important;
   display: block;
   }
   
   .topframe_is_sticky {
   position: fixed;
   top: 0px;
   left: 0px;
   transition: all 1s ease;
   width: 100vw;
   }
   
   .layout__ads {
   transition: all 1s ease;
   }
   
   .topframe-sticky-counter {
   display: none;
   }
   
   .layout__ads.sticky {
   position: fixed;
   z-index: 99;
   height: calc(100vw *(267 / 414) + 25px);
   }
   
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::after,
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::before {
   position: absolute;
   height: 25px;
   width: 100vw;
   left: 0;
   }
   
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::after {
   content: "";
   top: calc(100vw *(267 / 414));
   background: #0072FF;
   z-index: 100;
   animation: progress-bar 7s forwards linear;
   }
   
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::before {
   content: "";
   top: calc(100vw *(267 / 414));
   background: #212121;
   z-index: 99;
   }
   
   .sticky .topframe-sticky-counter {
   display: block;
   top: calc((100vw *(267 / 414)) + 8px);
   color: #fff;
   line-height: 14px;
   z-index: 101;
   -webkit-animation: webkit-progress-count 7s forwards linear;
   animation: progress-count 7s forwards linear;
   width: 100%;
   margin: 0px;
   position: absolute;
   text-align: center;
   font-family: sans-serif;
   }
   
   div#div-gpt-ad-topfrm-parallax-wrapper,
   div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-bola-topfrm-oop iframe {
   transition: all .3s ease;
   }
   
   div#div-gpt-ad-topfrm-parallax-wrapper.sticky {
   height: calc(100vw *(267 / 414)) !important;
   position: fixed !important;
   top: 0px;
   z-index: 9;
   }
   
   div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-bola-topfrm-oop iframe {
   transform: scale(.55);
   top: calc((-110.41666666666667vw * .42) / 2) !important;
   }
   
   @keyframes progress-bar {
   from {
     width: 0px;
   }
   to {
     width: 100vw;
   }
   }body {
   height: ' + (bodyClientHeight * 20) + 'px;
   scroll-behavior: smooth;
   width: 100vw
   }
   
   .topframe_is_sticky::before {
   content: "";
   position: relative;
   height: 110.41666666666667vw !important;
   display: block;
   }
   
   .topframe_is_sticky {
   position: fixed;
   top: 0px;
   left: 0px;
   transition: all 1s ease;
   width: 100vw;
   }
   
   .layout__ads {
   transition: all 1s ease;
   }
   
   .topframe-sticky-counter {
   display: none;
   }
   
   .layout__ads.sticky {
   position: fixed;
   z-index: 99;
   height: calc(100vw *(267 / 414) + 25px);
   }
   
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::after,
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::before {
   position: absolute;
   height: 25px;
   width: 100vw;
   left: 0;
   }
   
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::after {
   content: "";
   top: calc(100vw *(267 / 414));
   background: #0072FF;
   z-index: 100;
   animation: progress-bar 7s forwards linear;
   }
   
   #div-gpt-ad-topfrm-parallax-wrapper.sticky::before {
   content: "";
   top: calc(100vw *(267 / 414));
   background: #212121;
   z-index: 99;
   }
   
   .sticky .topframe-sticky-counter {
   display: block;
   top: calc((100vw *(267 / 414)) + 8px);
   color: #fff;
   line-height: 14px;
   z-index: 101;
   -webkit-animation: webkit-progress-count 7s forwards linear;
   animation: progress-count 7s forwards linear;
   width: 100%;
   margin: 0px;
   position: absolute;
   text-align: center;
   font-family: sans-serif;
   }
   
   div#div-gpt-ad-topfrm-parallax-wrapper,
   div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-bola-topfrm-oop iframe {
   transition: all .3s ease;
   }
   
   div#div-gpt-ad-topfrm-parallax-wrapper.sticky {
   height: calc(100vw *(267 / 414)) !important;
   position: fixed !important;
   top: 0px;
   z-index: 9;
   }
   
   div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-bola-topfrm-oop iframe {
   transform: scale(.55);
   top: calc((-110.41666666666667vw * .42) / 2) !important;
   }
   
   @keyframes progress-bar {
   from {
     width: 0px;
   }
   to {
     width: 100vw;
   }
   }
   `;
        this.tfParentBodyTarget.appendChild(this.tfStickyCustomStyleElement);
    },
    tfStickyTweak: function() {
        this.tfPageMain && this.tfParentBodyTarget.insertAdjacentElement('afterbegin', this.tfPageMain);
        this.tfParentBodyTarget.insertAdjacentElement('afterbegin', this.tfPageNavbar);
        if (this.tfChildElement.length > 0) {
            this.tfChildElement.forEach(el => {
                this.tfParentBodyTarget.lastChild.insertAdjacentElement('afterend', el);
            })
        }
        setTimeout(() => {
            googletag.pubads().refresh([window.GAMLibrary.headline, window.GAMLibrary.showcase, window.GAMLibrary.exposer1]);
        }, 500);
    },
    /** START SHRINKING V8 */
    tfSetStickyV2Scroll: function() {
        if (this.tfStickyType != "v8") {
            window.removeEventListener("scroll", this.tfBindSetStickyV2Scroll)
            return
        }
        var scrollTop = window.document.scrollingElement.scrollTop || window.document.documentElement.scrollTop
        if (scrollTop == 0 && this.tfAdsVisible.topframeClassTweak) {
            this.tfAdsVisible.topframeScrollBackToTop = true
        }

        if ((document.documentElement.scrollTop > (document.querySelector(this.tfStickyAdunitTarget).clientHeight / 3)) && !this.tfAdsVisible.topframeClassTweak && this.tfIsSticky && !this.tfStickyIsEnd) {
            this.tfSetStickyStyleV2()
            this.tfAdsVisible.topframeClassTweak = true;
            this.tfSetSticky()
        }

    },
    tfSetSticky: function() {
        if (document.querySelector(".topframe-sticky-counter")) {
            document.querySelector(".topframe-sticky-counter").remove()
        }

        document.querySelector(this.tfStickyAdunitTarget).classList.add("puller")
        document.querySelector(this.tfStickyAdunitTarget).style = "position : fixed !important;top : -60px !important;"

        if (this.tfStickyIsEnd) {
            document.querySelector(this.tfStickyAdunitTarget).style.opacity = 0;
            return;
        }

        var tfStickyCountDownInt = setInterval(function() {
            if (this.tfStickyCountDownV2 >= 75 || this.tfAdsVisible.topframeScrollBackToTop && !this.tfStickyIsEnd) {
                clearInterval(tfStickyCountDownInt)
                this.tfAdsVisible.topframe = true
                this.tfStickyIsEnd = true
                this.tfStickyUnsetV2()
            }
            this.tfIncreamentStickyCountDownV2;
        }.bind(this), 100);

    },
    tfStickyUnsetV2: function() {
        document.querySelector(this.tfStickyAdunitTarget).classList.remove("puller")
        document.querySelector(this.tfStickyAdunitTarget).style.setProperty("position", "relative", "important");
        document.querySelector(this.tfStickyAdunitTarget).style.setProperty("top", "");
        document.querySelector(this.tfStickyAdunitTarget).style.opacity = 1;
        window.removeEventListener("scroll", this.tfSetStickyV2Scroll.bind(this))
    },
    tfSetStickyStyleV2: function() {
        this.tfStickyCustomStyleElement.textContent = `div${this.tfStickyAdunitTarget}.puller { position: fixed !important; z-index: 999; transform: scale(.55) translateX(38%); border-radius: 20px; overflow: hidden; } div${this.tfStickyAdunitTarget}.puller::after { content: ""; position: absolute; height: 5px; width: 100%; background: yellow; left: 0; animation: tf-puller-loading 7s forwards; } @keyframes tf-puller-loading { 0% { width: 0px } 100% { width: 100% } }`
        document.querySelector(this.tfStickyAdunitTarget).appendChild(this.tfStickyCustomStyleElement)
    },
    /** END SHRINKING V8 */
    /** ============= MASTHEAD ============= */
  
    /* ============ FEEDBOARD ============ */
    feedboardAdsInject: function() {
        const targetElement = document.getElementById('div-gpt-ad-bola-feedboard');
        if (targetElement) {
            if ('IntersectionObserver'in window) {
                const observer = new IntersectionObserver( (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.feedboardAds = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/FEEDBOARD', 'div-gpt-ad-bola-feedboard').addService(googletag.pubads());
                            googletag.pubads().refresh([this.feedboardAds]);
                            observer.unobserve(targetElement);
                        }
                    }
                    );
                }
                ,{
                    rootMargin: '200px 0px',
                    threshold: 0.1
                });
                observer.observe(targetElement);
            }
        }
    },
    /* ============ FEEDBOARD ============ */

    /** ============ GPT EVENT LISTENER ============ */
    gamSlotVisibilityChange: function(event) {
        let slot = event.slot,
            vrslotName = slot.getSlotElementId();

        // topframe shirnking tweak
        if (vrslotName.includes("topfrm") && event.inViewPercentage >= 70) {
            if (this.tfStickyTimer > 2 && !this.tfAdsVisible.topframe && document.querySelector(".topframe-sticky-counter")) {
                this.tfStickyTimer = 4
                this.tfAdsVisible.topframe = true
            }
        }
        // topframe shirnking tweak

        if (slot === this.hlDefinedAdunit) {
            if (event.inViewPercentage > 80 && !this.generatedScrollBF) {
                /*Floating Pin Scrolling*/
                // this.fpOnScroll();

                this.generatedScrollBF = 1;
            }
        }
    },
    gamSlotRenderEnded: function(event) {
        this.expInterscroller(event);
        this.scFlyingCarpetEffect(event);
        /*Bottom Frame Scrolling*/
        // this.bfOnScroll(); Dok. 08072025
        
        var containerId = event.slot.getSlotElementId();
        var containerEl = document.getElementById(containerId);

        if(this.gamTopframe  == event.slot.getAdUnitPath()){
            if(!event.isEmpty){
                const mastheadWrapper = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
                mastheadWrapper.style.display = "block";
            }
        }
      
        if (containerId.includes("topfrm")) {
            if ([[336,280], [300,250], [320,480]].some(size => JSON.stringify(event.size) === JSON.stringify(size))) {
                var parallaxEl = document.getElementById("div-gpt-ad-topfrm-parallax-wrapper");
                var topfrmEl = document.getElementById("div-gpt-ad-bola-topfrm-oop");
                if (parallaxEl && topfrmEl) {
                    parallaxEl.style.display = "flex";
                    parallaxEl.style.alignItems = "center";
                    topfrmEl.style.position = "absolute";
                  
                    if (JSON.stringify(event.size) == '[320,480]') {
                        topfrmEl.style.transform = 'scale(' + (parallaxEl.clientHeight - 20) / topfrmEl.clientHeight + ')';
                    }
                }
            }
        }

        // TOPFRAME SHRINKING V8
        if (containerId.includes("topfrm") && !this.tfAdsVisible.topframe) {
            this.tfBindSetStickyV2Scroll = this.tfSetStickyV2Scroll.bind(this);
            window.addEventListener("scroll", this.tfBindSetStickyV2Scroll)
            setTimeout(function() {
                if (!this.tfIsSticky) {
                    window.removeEventListener("scroll", this.tfBindSetStickyV2Scroll)
                    this.tfStickyIsEnd = true
                }
            }.bind(this), 2000);
        }
        // END TOPFRAME SHRINKING V8

        // AUTO CLOSE IN IMAGE 336 X 280
        if(containerId == "div-gpt-ad-bola-inimage"){
            var inImageTargetImage = document.querySelectorAll(".detail-body .infinite-box")[1].querySelector("img.lazy_loaded");
            var scale = Math.min(1, inImageTargetImage.clientHeight / 280);

            document.querySelector("#in-image-ads").style.aspectRatio = `${inImageTargetImage.clientWidth} / ${inImageTargetImage.clientHeight}`;

            if(JSON.stringify(event.size) == '[336,280]'){
                document.querySelector("#in-image-ads").classList.add("lr")
                document.querySelector("#in-image-ads #div-gpt-ad-bola-inimage").style.transform = `scale(${scale})`;

                setTimeout(function () {
                    document.querySelector("#in-image-ads").classList.remove("active")
                }, 10000)
            }
        }
        // AUTO CLOSE IN IMAGE 336 X 280
      
        if (containerId.includes("exposer")) {
            Array.prototype.forEach.call(document.querySelectorAll(".rm01 iframe"), (v, i) => {
                v.id.match(/exposer/ig) ? v.style.setProperty("width", "unset", "important") : '';
            });
        }
      
        if (containerEl === null) return;

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

        // if (!this.generatedScrollFP) {  Dok. 08072025
        //     /*Floating Pin Scrolling*/
        //     this.fpOnScroll();
        //     this.generatedScrollFP = 1;
        // }
        
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
    setGamBFInterval: function(active, intervalTime) {
        this.bfSetInterval(active, intervalTime);
        return;
    },
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

googletag.cmd.push(function() {
    var documentURL = document.URL;
    var _IS_IOS_ = window.navigator.platform.match(/iPhone|iPod|iPad/);
    /*SET NEW BRAND SAFETY LOGIC*/
    GAMLibrary.pageBrandSafetyChecker();

    /*OUT OF PAGE SLOTS*/
    if (GAMLibrary.tfIsFixedSized) {
        window.GAMLibrary.topframe = googletag.defineSlot(GAMLibrary.gamTopframe, [1, 1], 'div-gpt-ad-bola-topfrm-oop').addService(googletag.pubads());
    } else {
        window.GAMLibrary.topframe = googletag.defineOutOfPageSlot(GAMLibrary.gamTopframe, 'div-gpt-ad-bola-topfrm-oop').addService(googletag.pubads());
    }

    /** INITIATE HEADLINE STICKY */
    GAMLibrary.hlInjectElement();
    /** INITIATE HEADLINE STICKY */

    /** INITIATE BF AND FLOATINGPIN BALANCING */
    GAMLibrary.intervalBalancingAds();

    GAMLibrary.inImageAdsInject();

    window.GAMLibrary.crmHeadline = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/HEADLINE_CRM', 'div-gpt-ad-bola-crm-headline-oop').addService(googletag.pubads());
    window.GAMLibrary.crmOrganic1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/ORGANIC_FEED_CRM_1', 'div-gpt-ad-bola-crm1-oop').addService(googletag.pubads());
    window.GAMLibrary.crmOrganic2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/ORGANIC_FEED_CRM_2', 'div-gpt-ad-bola-crm2-oop').addService(googletag.pubads());
    window.GAMLibrary.crmOrganic3 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/ORGANIC_FEED_CRM_3', 'div-gpt-ad-bola-crm3-oop').addService(googletag.pubads());
    window.GAMLibrary.pictureFirst = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/CONTENT_CAROUSEL', 'div-gpt-ad-bola-picturefirst').addService(googletag.pubads());
    window.GAMLibrary.widget = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/WIDGET', 'div-gpt-ad-bola-widget').addService(googletag.pubads());
    // window.GAMLibrary.showcase = googletag.defineSlot(GAMLibrary.gamShowcase, [[300, 600], [300, 250], [250, 250], [200, 200]], 'div-gpt-ad-bola-sc').addService(googletag.pubads());
    // window.GAMLibrary.exposer = googletag.defineSlot(GAMLibrary.gamExposer1, [[1, 1],[300, 250], [300, 600], [320, 480], [160, 600], [250, 250]], 'div-gpt-ad-bola-dfp-exposer-slot1-oop').addService(googletag.pubads());
    if(document.querySelector("#div-gpt-ad-bola-mgid-inarticle")) // Don. - Add
        window.GAMLibrary.slideup = googletag.defineSlot('/36504930/KLY/MOBILE/BOLA.NET/SLIDE_UP', [1, 1], 'div-gpt-ad-bola-mgid-inarticle').addService(googletag.pubads());
    
    // window.GAMLibrary.slideup = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/SLIDE_UP', 'div-gpt-ad-bola-slide-up-oop').addService(googletag.pubads());
    /* INTERSTITIAL ADS */
    if(!_IS_IOS_){
      // window.GAMLibrary.interstitial = googletag.defineOutOfPageSlot(GAMLibrary.gamInterstitial, googletag.enums.OutOfPageFormat.INTERSTITIAL);
      // window.GAMLibrary.interstitial ? window.GAMLibrary.interstitial.addService(googletag.pubads()) : '';
    }
    /* INTERSTITIAL ADS */

    window.GAMLibrary.prebidHeaderBiddingSlots.push(googletag.defineSlot(GAMLibrary.gamShowcase, [[300, 600], [300, 250], [250, 250], [200, 200]], 'div-gpt-ad-bola-sc').addService(googletag.pubads()));
    window.GAMLibrary.prebidHeaderBiddingSlots.push(googletag.defineSlot(GAMLibrary.gamExposer1, [[300, 250], [300, 600], [320, 480], [160, 600]], 'div-gpt-ad-bola-dfp-exposer-slot1-oop').addService(googletag.pubads()));

    if (GAMLibrary.pageIsReadPage) {
        window.GAMLibrary.insertion = googletag.defineSlot('/36504930/KLY/MOBILE/BOLA.NET/INSERTION', [1, 1], 'div-gpt-ad-bola-mgid-underarticle').addService(googletag.pubads());
        // window.GAMLibrary.insertion = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/INSERTION', 'div-gpt-ad-bola-insertion-oop').addService(googletag.pubads());
      
        window.GAMLibrary.inreadnative = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/IN-READ_NATIVE', 'div-gpt-ad-bola-in-read-native').addService(googletag.pubads());
    } else if (pageKlyObj.pageType === "ChannelPage" && pageKlyObj.gtm.subCategory === "root") {
        window.GAMLibrary.advHeadline1 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/ADVERTORIAL_HEADLINE_1', 'div-gpt-ad-bola-advertorial-headline1').addService(googletag.pubads());
        window.GAMLibrary.advHeadline2 = googletag.defineOutOfPageSlot('/36504930/KLY/MOBILE/BOLA.NET/ADVERTORIAL_HEADLINE_2', 'div-gpt-ad-bola-advertorial-headline2').addService(googletag.pubads());
    }

    googletag.pubads().addEventListener('slotVisibilityChanged', GAMLibrary.gamSlotVisibilityChange.bind(GAMLibrary));
    googletag.pubads().addEventListener('slotRenderEnded', GAMLibrary.gamSlotRenderEnded.bind(GAMLibrary));

    /*  START TARGETING BLOCK   */
    googletag.pubads().setTargeting("tags", GAMLibrary.pageTags);
    googletag.pubads().setTargeting("articleTitle", kly.gtm.articleTitle);
    googletag.pubads().setTargeting("articlePath", window.location.pathname);
    googletag.pubads().setTargeting("platform", kly.platform);
    googletag.pubads().setTargeting("type", kly.gtm.type);
    googletag.pubads().setTargeting("pageType", kly.pageType);
    googletag.pubads().setTargeting("channel", kly.gtm.subCategory);
    googletag.pubads().setTargeting("audience", typeof(audience = kly.gtm.audience && kly.gtm.audience.split("|")) === "undefined" ? "false" : audience);
    googletag.pubads().setTargeting("isAdvertorial", typeof(isAdvertorial = kly.article && kly.article.isAdvertorial.toString()) === "undefined" ? "false" : isAdvertorial);
    googletag.pubads().setTargeting("isMultipage", typeof(isMultipage = kly.article && kly.article.isMultipage.toString()) === "undefined" ? "false" : isMultipage);
    googletag.pubads().setTargeting("articleId", kly.gtm.articleId.toString());
    googletag.pubads().setTargeting("newExp", typeof(newExp = kly.gtm.new_exp) === "undefined" ? "false" : kly.gtm.new_exp.toString());
    googletag.pubads().setTargeting("pagingNum", typeof(pageParam = kly.gtm.pageParam && kly.gtm.pageParam.toString()) === "undefined" ? "false" : pageParam);
    googletag.pubads().setTargeting("site", kly.site);
    googletag.pubads().setTargeting("age", typeof(age = kly.gtm.age) === "undefined" ? "false" : kly.gtm.age.toString());
    googletag.pubads().setTargeting("gender", typeof(gender = kly.gtm.gender) === "undefined" ? "false" : kly.gtm.gender.toString());
    googletag.pubads().setTargeting("subcategory", kly.gtm.subCategory);
    /*  END TARGETING BLOCK   */
    googletag.pubads().setCentering(true);
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.pubads().disableInitialLoad();
    googletag.enableServices();

    /* REFRESH ON DEMAND */
    googletag.pubads().refresh([window.GAMLibrary.topframe, window.GAMLibrary.crmHeadline, window.GAMLibrary.crmOrganic1, window.GAMLibrary.crmOrganic2, window.GAMLibrary.crmOrganic3, window.GAMLibrary.pictureFirst, window.GAMLibrary.slideup, window.GAMLibrary.widget]);

    if (GAMLibrary.pageIsReadPage) {
        googletag.pubads().refresh([window.GAMLibrary.insertion, window.GAMLibrary.inreadnative]);
    } else if (pageKlyObj.pageType === "ChannelPage" && pageKlyObj.gtm.subCategory === "root") {
        googletag.pubads().refresh([window.GAMLibrary.advHeadline1, window.GAMLibrary.advHeadline2]);
    }

    /*INITIATE SHOWCASE IN PAGING */
    if (GAMLibrary.pageIsReadPage) {
        GAMLibrary.scInPaging()
    };
});

/* INITIATE PREBID */
GAMLibrary.prebidInstantiate();

/** GET MESSAGE FROM SAFEFRAME CONTAINER */
GAMLibrary.onMessageReceivedGPTUpdateCreativeStyle();
/** GET MESSAGE FROM SAFEFRAME CONTAINER */

var HeavyAdsResolver = new GAMLibrary.HeavyAdsResolver();

document.addEventListener("DOMContentLoaded", GAMLibrary.gfnOnDomContentLoaded.bind(GAMLibrary));
window.addEventListener("orientationchange", GAMLibrary.tfOrientationChange.bind(GAMLibrary));
Array.prototype.forEach.call(document.querySelectorAll(".rm01 iframe"),(v,i)=>{
    v.id.match(/exposer/ig) ? v.style.setProperty("width","unset","important"): '';
});

// added before content loaded
requestAnimationFrame(() => {
    /* TWEAK HEADLINE PLACEHOLDER*/
    var gptMBolanetStyle = document.createElement('style');
    gptMBolanetStyle.textContent = 'div#div-gpt-ad-hl-placeholder{min-height:135px!important;}';        
    document.head.appendChild(gptMBolanetStyle);
});
