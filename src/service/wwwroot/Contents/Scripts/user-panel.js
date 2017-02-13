(function() {

    var usernameLabel = document.getElementById('userpanel');
    
    usernameLabel.onclick = function() {
        console.log(arguments);
        var usermenu = document.getElementById('usermenu');
        var existClasses = usermenu.getAttribute('class');
        var hasOpenedClass = false;
        var otherClasses = [];
        if (existClasses !== null) {
            var classes = existClasses.split(' ') || [];
            for (var i = 0; i < classes.length; i++) {
                var cssClass = classes[i];
                if (cssClass === 'opened') {
                    hasOpenedClass = true;
                } else {
                    otherClasses.push(cssClass);
                }
            }
        }

        if (hasOpenedClass) {
            // remove opened class
            var classString = otherClasses.join(' ');
            usermenu.setAttribute('class', classString);
        } else {
            // add opened class
            otherClasses.push('opened');
            var classString = otherClasses.join(' ');
            usermenu.setAttribute('class', classString);
        }
    };

})();
