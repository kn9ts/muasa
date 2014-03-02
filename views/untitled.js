/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function() {
    var initializing = false,
        fnTest = /xyz/.test(function() {
            xyz;
        }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {};

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        // The dummy class constructor

        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init) this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

/**
 * Animations
 *
 * @see http://codepen.io/ericmatthys/pen/FfcEL [!]
 * @see http://codepen.io/dmacdnld/pen/ClcIk
 * @see http://codepen.io/codefendant/pen/bjFgq
 * @see http://codepen.io/EightArmsHQ/pen/JBjlf
 * @see http://codepen.io/SLembas/pen/kotcg
 * @see http://codepen.io/restlessdesign/pen/Kxhsy
 */

/**
 * (closure)
 *
 */
(function() {

    /**
     * Sai.Embed
     *
     * Instantiable
     *
     * @extends Class
     */
    Sai.Embed = Class.extend({

        /**
         * _animationDuration
         *
         * @private
         * @var     Number (default: 500)
         */
        _animationDuration: 500,

        /**
         * _elements
         *
         * @private
         * @var     Object (default: {})
         */
        _elements: {},

        /**
         * _embedIsShowing
         *
         * @private
         * @var     Boolean (default: false)
         */
        _embedIsShowing: false,

        /**
         * _host
         *
         * @private
         * @var     String
         */
        _host: "shareasimage.com",

        /**
         * _iFrameCallbackDelay
         *
         * @private
         * @var     Number (default: 500)
         */
        _iFrameCallbackDelay: 500,

        /**
         * _namespace
         *
         * @private
         * @var     String (default: 'sai')
         */
        _namespace: 'sai',

        /**
         * init
         *
         * @public
         * @return void
         */
        init: function() {
            this._draw();
        },

        /**
         * _draw
         *
         * @private
         * @return  void
         */
        _draw: function() {

            // Ensure no passive references
            this._elements = {};

            // Create nodes (except for the iframe)
            this._drawWrapperElement();
            this._drawContentsElement();
            this._drawOverlayElement();
            this._drawCloseButtonElement();
            this._drawPlaceholderElement();

            // Build
            this._elements.wrapper.appendChild(this._elements.contents);
            this._elements.wrapper.appendChild(this._elements.placeholder);
            this._elements.wrapper.appendChild(this._elements.overlay);
            // this._elements.contents.appendChild(this._elements.iFrame);
            this._elements.contents.appendChild(this._elements.closeButton);

            // Insert into the page
            document.getElementsByTagName('body')[0].appendChild(
                this._elements.wrapper);
        },

        /**
         * _drawCloseButtonElement
         *
         * @private
         * @return  void
         */
        _drawCloseButtonElement: function() {
            var _this = this,
                element = document.createElement('a');
            element.setAttribute('class', (this._namespace) + '-closeButton');
            element.setAttribute('href', '#');
            element.onclick = function() {
                _this.hideApp();
                return false;
            };
            this._elements.closeButton = element;
        },

        /**
         * _drawContentsElement
         *
         * @private
         * @return  void
         */
        _drawContentsElement: function() {
            var element = document.createElement('div');
            element.setAttribute('class', (this._namespace) + '-contents');
            this._elements.contents = element;
        },

        /**
         * _drawIFrameElement
         *
         * @private
         * @return  void
         */
        _drawIFrameElement: function() {
            var element = document.createElement('iframe');
            element.setAttribute('class', (this._namespace) + '-iFrame');
            element.setAttribute('scrolling', 'no');
            element.setAttribute('frameborder', '0');
            element.setAttribute('allowtransparency', 'true');
            element.setAttribute('width', '876');
            element.setAttribute('height', '548');
            this._elements.iFrame = element;
        },

        /**
         * _drawOverlayElement
         *
         * @private
         * @return  void
         */
        _drawOverlayElement: function() {
            var element = document.createElement('div');
            element.setAttribute('class', (this._namespace) + '-overlay');
            this._elements.overlay = element;
        },

        /**
         * _drawPlaceholderElement
         *
         * @private
         * @return  void
         */
        _drawPlaceholderElement: function() {

            // Wrapper
            var element = document.createElement('div');
            // element.innerHTML = 'Loading...';
            element.setAttribute('class', (this._namespace) + '-placeholder');
            this._elements.placeholder = element;

            // Box
            var box = document.createElement('div');
            box.setAttribute('class', (this._namespace) + '-placeholderBox');

            // Dots
            var dot1 = document.createElement('div'),
                dot2 = document.createElement('div'),
                dot3 = document.createElement('div'),
                dot4 = document.createElement('div');
            dot1.setAttribute('class', (this._namespace) + '-placeholderBoxDot');
            dot2.setAttribute('class', (this._namespace) + '-placeholderBoxDot');
            dot3.setAttribute('class', (this._namespace) + '-placeholderBoxDot');
            dot4.setAttribute('class', (this._namespace) + '-placeholderBoxDot');

            // Build
            box.appendChild(dot1);
            box.appendChild(dot2);
            box.appendChild(dot3);
            box.appendChild(dot4);
            element.appendChild(box);
        },

        /**
         * _drawWrapperElement
         *
         * @private
         * @return  void
         */
        _drawWrapperElement: function() {
            var element = document.createElement('div');
            element.setAttribute('class', (this._namespace) + '-wrapper');
            this._elements.wrapper = element;
        },

        /**
         * getElements
         *
         * @public
         * @return Object
         */
        getElements: function() {
            return this._elements;
        },

        /**
         * getIFrameElement
         *
         * @public
         * @return HTMLIFrameElement
         */
        getIFrameElement: function() {
            return this._elements.iFrame;
        },

        /**
         * getIFramePath
         *
         * @public
         * @return String
         */
        getIFramePath: function() {
            if (this._elements.iFrame) {
                var iFrameSrc = this._elements.iFrame.getAttribute('src');
                if (iFrameSrc === null) {
                    return null;
                }
                var piece = iFrameSrc.split('.com/embed?');
                return '/embed?' + (piece.pop());
            }
            return null;
        },

        /**
         * hideApp
         *
         * @public
         * @return void
         */
        hideApp: function() {
            var _this = this;
            this._elements.overlay.style.opacity = '0';
            this._elements.contents.style.top = '-552px';
            setTimeout(

                function() {
                    _this._elements.wrapper.style.visibility = 'hidden';
                    _this._embedIsShowing = false;
                },
                this._animationDuration);
        },

        /**
         * hidePlaceholder
         *
         * @public
         * @return void
         */
        hidePlaceholder: function() {
            var _this = this;
            this._elements.placeholder.style.opacity = '0';
            // this._elements.placeholder.style.top = '300px';
        },

        /**
         * setIFrame
         *
         * @see    http://bugs.jquery.com/ticket/13936
         * @see    http://stackoverflow.com/questions/4334520/load-event-for-iframe-not-fired-in-ie
         * @see    http://stackoverflow.com/a/18280339/115025
         * @see    http://stackoverflow.com/questions/9241495/ie-dynamically-created-iframes-onload-function-never-called
         * @public
         * @param  String path
         * @param  HTMLElement parentElement
         * @param  Function callback
         * @return void
         */
        setIFrame: function(path, parentElement, callback) {

            // Draw it (or re-draw it, everytime)
            if (this._elements.iFrame) {
                this._elements.iFrame.parentNode.removeChild(this._elements.iFrame);
            }
            this._drawIFrameElement();

            // Events
            var _this = this;
            callback = callback || function() {};
            this._elements.iFrame.onload = function() {
                setTimeout(
                    callback,
                    _this._iFrameCallbackDelay);
            };

            // Path
            path = 'https://' + (this._host) + (path);
            this._elements.iFrame.setAttribute('src', path);

            // Tree
            parentElement.appendChild(this._elements.iFrame);
        },

        /**
         * showContents
         *
         * @public
         * @return void
         */
        showContents: function() {
            var _this = this;
            _this._elements.contents.style.top = '0px';
            _this._embedIsShowing = true;
        },

        /**
         * showOverlay
         *
         * @public
         * @return void
         */
        showOverlay: function() {
            var _this = this;
            _this._elements.wrapper.style.visibility = 'visible';
            _this._elements.overlay.style.opacity = '0.25';
        },

        /**
         * showPlaceholder
         *
         * @public
         * @return void
         */
        showPlaceholder: function() {
            this._elements.placeholder.style.opacity = '1';
        }
    });
})();

/**
 * (closure)
 *
 * @note   Encoding
 * @see    http://betterexplained.com/articles/how-to-make-a-bookmarklet-for-your-web-application/
 * @see    https://github.com/chriszarate/bookmarkleter
 * @see    http://daringfireball.net/2007/03/javascript_bookmarklet_builder
 * @see    http://mrcoles.com/bookmarklet/
 * @see    https://news.ycombinator.com/item?id=2643118
 *
 * @note   Needs to be set on window to ensure proper scope
 * @see    http://msdn.microsoft.com/en-us/hh563496.aspx
 * @see    http://developer.chrome.com/extensions/contentSecurityPolicy.html
 * @see    https://getsatisfaction.com/crossrider/topics/facebook_with_chrome_error_refused_to_connect_to_loading_script
 * @see    http://stackoverflow.com/questions/12129077/content-security-policy-cannot-load-google-api-in-chrome-extension
 * @see    http://pandawhale.com/post/10629/facebook-growing-increasingly-paranoid-now-preventing-users-from-extracting-own-data-with-javascript-tools
 */
(function() {

    /**
     * Sai.bookmarklet.App
     *
     * Singelton
     *
     * @public
     * @var    Object
     */
    Sai.bookmarklet.App = (function() {

        /**
         * _embed
         *
         * @private
         * @var     Sai.Embed (default: null)
         */
        var _embed = null;

        /**
         * _maxCharacters
         *
         * @private
         * @var     Number (default: 2000)
         */
        var _maxCharacters = 2000;

        /**
         * _staticCdn
         *
         * @private
         * @var     String
         */
        var _staticCdn = "d1nq99tbk0qfjm.cloudfront.net";

        /**
         * _cleanText
         *
         * @todo    Implement excessive whitespace control
         * @see     http://stackoverflow.com/questions/6163169/removing-whitespace-from-string-in-javascript
         * @private
         * @param   String str
         * @return  String
         */
        var _cleanText = function(str) {

            // Trim it
            var cleaned = _trimString(str);

            // Get rid of excessive whitespace (in IE)
            // There is a bug with this, in that it doesn't take proper account of break tags (see docs)
            if (document.selection) {
                cleaned = cleaned.replace(/\n[\s]+/g, '\n');
            }

            // Truncate
            return cleaned.substring(0, _maxCharacters);
        };

        /**
         * _getHighlightedText
         *
         * @see     http://stackoverflow.com/questions/14553534/how-to-get-selected-text-with-javascript
         * @see     http://jsfiddle.net/L9bvU/1/
         * @see     http://stackoverflow.com/questions/6251937/how-to-get-selecteduser-highlighted-text-in-contenteditable-element-and-replac
         * @private
         * @return  String
         */
        var _getHighlightedText = function() {
            if (window.getSelection) {
                return window.getSelection().toString();
            }
            return document.selection.createRange().text;
        };

        /**
         * _getPath
         *
         * @private
         * @return  String
         */
        var _getPath = function() {

            // Pass along text (if any)
            var path = '/embed?embedType=modal&flow=bookmarklet&',
                hightlightedText = _getHighlightedText(),
                sourceUrl = false,
                imageUrl = false;
            if (hightlightedText !== '') {

                // Clean and pass along the text
                var text = _cleanText(hightlightedText);
                path += 'text=' + encodeURIComponent(text) + '&';

                // Pass along source
                sourceUrl = location.href;
            }

            /**
             * Pinterest
             *
             */

            // On a photo page
            if (location.href.match('pinterest.com/pin/[0-9]+/')) {

                // Check inline
                if ($ && $('.pinImage').length > 0 && $('.pingImage').attr) {
                    imageUrl = $('.pinImage').attr('src');
                    sourceUrl = location.href;
                }
            }

            /**
             * Instagram
             *
             */

            // On a photo page
            if (location.href.match('instagram.com/p/')) {

                // Check inline
                if ($('.Image.Frame').length > 0) {
                    var backgroundImageStyle = $('.Image.Frame').css('background-image'),
                        matches = backgroundImageStyle.match('url\\(([^\)]+)');
                    if (matches && matches[1]) {
                        imageUrl = matches[1];
                        imageUrl = imageUrl.replace(/^"/, '');
                        imageUrl = imageUrl.replace(/"$/, '');
                        sourceUrl = location.href;
                    }
                }

                // Check open graph
                if (imageUrl === false) {
                    var headElement = document.getElementsByTagName('head')[0];
                    if (headElement) {
                        var matches = headElement.innerHTML.match('<meta property="og:image" content="([^"]+)');
                        if (matches && matches[1]) {
                            imageUrl = matches[1];
                            sourceUrl = location.href;
                        }
                    }
                }
            }

            /**
             * Facebook
             *
             */

            // On a photo page
            if (location.href.match('facebook.com/photo.php?')) {

                // Check inline
                if (
                    document.getElementsByClassName && document.getElementsByClassName('spotlight').length > 0) {
                    var $img = document.getElementsByClassName('spotlight')[0];
                    imageUrl = $img.src;
                    sourceUrl = location.href;
                }

                // The photo page has been directly accessed
                if (imageUrl === false) {
                    var bodyElement = document.getElementsByTagName('body')[0];
                    if (bodyElement) {
                        var matches = bodyElement.innerHTML.match(' id="fbPhotoImage" src="([^"]+)');
                        if (matches && matches[1]) {
                            imageUrl = matches[1];
                            sourceUrl = location.href;
                        }
                    }
                }
            }

            /**
             * Tab is an image
             *
             */

            // If on a presumed image page (extension based)
            if (
                location.href.match(/png$/i) || location.href.match(/jpeg$/i) || location.href.match(/jpg$/i)) {
                imageUrl = location.href;
                sourceUrl = false;
            } else {

                // Inline image detection
                if (document && document.body) {
                    var innerHTML = document.body.innerHTML;

                    /**
                     * Webkit check
                     *
                     * Webkit inserts an <img> tag as the first child of the
                     * <body> element. Here, I check if the that's the case
                     */
                    if (innerHTML.search('<img style="-webkit-user-select: none" src="') === 0) {
                        var matches = innerHTML.match('src="([^"]+)');
                        if (matches && matches[1]) {
                            imageUrl = matches[1];
                            sourceUrl = false;
                        }
                    }
                    /**
                     * Firefox check
                     *
                     * Firefox does the same, but has different attributes and
                     * ordering
                     */
                    else if (innerHTML.search('<img class="decoded" alt="') === 0) {
                        var matches = innerHTML.match('src="([^"]+)');
                        if (matches && matches[1]) {
                            imageUrl = matches[1];
                            sourceUrl = false;
                        }
                    }
                }
            }

            // Set source url
            if (sourceUrl !== false) {
                path += 'sourceUrl=' + encodeURIComponent(sourceUrl) + '&';
            }

            // Set image url
            if (imageUrl !== false) {
                path += 'imageUrl=' + encodeURIComponent(imageUrl) + '&';
            }

            // Done
            return path;
        };

        /**
         * _insertStyleSheet
         *
         * @public
         * @return void
         */
        var _insertStyleSheet = function() {
            var url = 'https://' + (_staticCdn) + '/static/app/css/bookmarklet.css',
                le = document.createElement('link');
            le.setAttribute('rel', 'stylesheet');
            le.setAttribute('type', 'text/css');
            le.setAttribute('href', url);
            var lse = document.getElementsByTagName('script')[0];
            lse.parentNode.insertBefore(le, lse);
        };

        /**
         * _trimString
         *
         * @private
         * @param   String str
         * @return  String
         */
        var _trimString = function(str) {
            return str.replace(/^\s+|\s+$/g, '');
        };

        // Public
        return {

            /**
             * hide
             *
             * Used when the bookmarklet is clicked when the app is already open
             *
             * @public
             * @return void
             */
            hide: function() {
                _embed.hideApp();
            },

            /**
             * init
             *
             * @public
             * @return void
             */
            init: function() {
                _insertStyleSheet();
                _embed = (new Sai.Embed());
                Sai.bookmarklet.App.show();
            },

            /**
             * show
             *
             * @public
             * @return void
             */
            show: function() {

                // Get the path (based on the highlighted text)
                var path = _getPath();
                _embed.showOverlay();

                // If the path is different, show placeholder and redraw iframe
                if (path !== _embed.getIFramePath()) {
                    _embed.showPlaceholder();
                    _embed.setIFrame(
                        path,
                        _embed.getElements().contents,

                        function() {
                            _embed.hidePlaceholder();
                            _embed.showContents();
                        });
                }
                // Otherwise show it right away
                else {
                    _embed.showContents();
                }
            },

            /**
             * toggle
             *
             * @public
             * @return void
             */
            toggle: function() {
                if (_embed._embedIsShowing === true) {
                    Sai.bookmarklet.App.hide();
                } else {
                    Sai.bookmarklet.App.show();
                }
            }
        };
    })();

    // Let's do this!
    Sai.bookmarklet.App.init();
})();